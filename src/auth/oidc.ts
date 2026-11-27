import "server-only";
import { cookies } from "next/headers";
import * as oidc from "openid-client";
import { getPayload } from "payload";
import config from "@payload-config";
import { readAuthEnv, type AuthEnv } from "@/auth/env";
import { safeReturnTo } from "@/auth/returnTo";
import {
  LOGIN_COOKIE,
  readSession,
  roleFor,
  seal,
  SESSION_COOKIE,
  SESSION_HOURS,
  unseal,
} from "@/auth/session";

// Server-only: admin sign-in through authentik (OpenID Connect, authorization code + PKCE), the
// same flow as Portfolio and the User Directory. authentik only lets the CMS's groups through
// (the "cms" app's group rules), and this app checks the token's `groups` claim again: cms-editors
// and authentik Admins may edit, cms-viewers may only look. The person is kept as a Payload user
// (matched by authentik's `sub`), so versions show who made each change.

let configPromise: Promise<oidc.Configuration> | undefined;

/**
 * Discovers authentik once per process. With OIDC_INTERNAL_URL (the local Docker stack),
 * server-to-server calls go to that origin, with the public host as X-Forwarded-Host so
 * authentik's issuer still matches. The browser always uses the public URL.
 */
function getConfig(env: AuthEnv): Promise<oidc.Configuration> {
  configPromise ??= (async () => {
    const publicUrl = new URL(env.issuer);
    const fetchVia: oidc.CustomFetch = (url, options) => {
      const init = options as RequestInit;
      const target = new URL(url);
      if (!env.internalUrl || target.origin !== publicUrl.origin) return fetch(url, init);
      const internal = new URL(env.internalUrl);
      target.protocol = internal.protocol;
      target.host = internal.host;
      const headers = new Headers(init.headers);
      headers.set("X-Forwarded-Host", publicUrl.host);
      headers.set("X-Forwarded-Proto", publicUrl.protocol.replace(":", ""));
      return fetch(target, { ...init, headers });
    };
    const insecure = env.issuer.startsWith("http://") ? [oidc.allowInsecureRequests] : [];
    const discovered = await oidc.discovery(
      new URL(env.issuer),
      env.clientId,
      env.clientSecret,
      undefined,
      { [oidc.customFetch]: fetchVia, execute: insecure },
    );
    discovered[oidc.customFetch] = fetchVia;
    return discovered;
  })().catch((err) => {
    configPromise = undefined;
    throw err;
  });
  return configPromise;
}

function requireEnv(): AuthEnv {
  const env = readAuthEnv();
  if (!env) throw new Error("Sign-in isn't configured (see .env.example).");
  return env;
}

const cookieOptions = (env: AuthEnv, maxAgeSeconds?: number) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: env.appUrl.startsWith("https://"),
  path: "/",
  maxAge: maxAgeSeconds,
});

/** Starts a sign-in: remembers state and the PKCE verifier, returns authentik's URL. */
export async function beginLogin(returnTo: string): Promise<URL> {
  const env = requireEnv();
  const discovered = await getConfig(env);
  const verifier = oidc.randomPKCECodeVerifier();
  const state = oidc.randomState();
  (await cookies()).set(
    LOGIN_COOKIE,
    await seal({ verifier, state, returnTo: safeReturnTo(returnTo) }, "15m", env.secret),
    cookieOptions(env, 15 * 60),
  );
  return oidc.buildAuthorizationUrl(discovered, {
    redirect_uri: `${env.appUrl}/auth/callback`,
    scope: "openid profile email",
    code_challenge: await oidc.calculatePKCECodeChallenge(verifier),
    code_challenge_method: "S256",
    state,
  });
}

/** Signed in at authentik, but in none of the CMS's groups. */
export class NotAllowedError extends Error {
  constructor() {
    super("This account has no access to the CMS.");
  }
}

/** Finishes a sign-in from authentik's redirect. Returns where to send the person next. */
export async function completeLogin(search: string): Promise<string> {
  const env = requireEnv();
  const jar = await cookies();
  const pending = await unseal(jar.get(LOGIN_COOKIE)?.value, env.secret);
  jar.delete(LOGIN_COOKIE);
  if (typeof pending?.verifier !== "string" || typeof pending.state !== "string") {
    throw new Error("The sign-in expired. Please try again.");
  }

  const discovered = await getConfig(env);
  // Rebuilt from APP_URL: behind the proxy, the request's own URL is the container's.
  const tokens = await oidc.authorizationCodeGrant(
    discovered,
    new URL(`${env.appUrl}/auth/callback${search}`),
    { pkceCodeVerifier: pending.verifier, expectedState: pending.state },
  );
  const claims = tokens.claims();
  if (!claims) throw new Error("authentik didn't return an ID token.");

  const groups = Array.isArray(claims.groups) ? claims.groups.map(String) : [];
  const role = roleFor(groups);
  if (!role) throw new NotAllowedError();

  const name = String(claims.name ?? claims.preferred_username ?? claims.email ?? "Editor");
  const email = String(claims.email ?? "");
  await upsertUser({ sub: claims.sub, name, email, role });

  jar.set(
    SESSION_COOKIE,
    await seal(
      {
        sub: claims.sub,
        name,
        email,
        groups,
        sid: typeof claims.sid === "string" ? claims.sid : undefined,
      },
      `${SESSION_HOURS}h`,
      env.secret,
    ),
    cookieOptions(env, SESSION_HOURS * 3600),
  );
  return safeReturnTo(typeof pending.returnTo === "string" ? pending.returnTo : null);
}

/** Keeps the Payload user in step with authentik (matched by `sub`), creating it the first time. */
async function upsertUser({
  sub,
  name,
  email,
  role,
}: {
  sub: string;
  name: string;
  email: string;
  role: "editor" | "viewer";
}) {
  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "users",
    where: { sub: { equals: sub } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const user = existing.docs[0];
  if (!user) {
    await payload.create({
      collection: "users",
      data: { sub, name, email, role },
      overrideAccess: true,
    });
  } else if (user.name !== name || user.email !== email || user.role !== role) {
    await payload.update({
      collection: "users",
      id: user.id,
      data: { name, email, role },
      overrideAccess: true,
    });
  }
}

/**
 * Signs out everywhere (single logout): drops this app's session and returns authentik's
 * "Sign out" page (flow `sign-out`), which ends the authentik session, signs the other apps out
 * through their front-channel logout and sends the person back here.
 */
export async function signOut(): Promise<string> {
  (await cookies()).delete(SESSION_COOKIE);
  const env = readAuthEnv();
  return env ? new URL("/if/flow/sign-out/?app=cms", env.issuer).href : "/admin/login";
}

/**
 * Front-channel logout: authentik's "Sign out" page loads this in a hidden frame after ending the
 * authentik session. Only for this app's issuer, and only the session from that authentik
 * session (sid) when both know it. Returns false for a request that isn't for this app.
 */
export async function frontchannelLogout(iss: string | null, sid: string | null): Promise<boolean> {
  const env = readAuthEnv();
  if (!env || iss !== env.issuer) return false;
  const jar = await cookies();
  const session = await readSession(jar.get(SESSION_COOKIE)?.value, env.secret);
  if (session?.sid && sid && session.sid !== sid) return true;
  jar.delete(SESSION_COOKIE);
  return true;
}

/** The origin allowed to frame the front-channel logout page (authentik's). */
export function issuerOrigin(): string | null {
  const env = readAuthEnv();
  return env ? new URL(env.issuer).origin : null;
}
