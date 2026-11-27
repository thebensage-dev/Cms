import { createHash } from "node:crypto";
import { EncryptJWT, jwtDecrypt } from "jose";

// The CMS session: an encrypted cookie (no session table) holding the authentik account and its
// groups, the same as Portfolio's and the User Directory's. Payload's own login (email and
// password) is switched off; `strategy.ts` reads this cookie instead.

export const SESSION_COOKIE = "cms_session";
export const LOGIN_COOKIE = "cms_login";
export const SESSION_HOURS = 8;

/** Who may change content: the CMS editors and authentik's admins (the `groups` claim). */
export const EDITOR_GROUPS = ["cms-editors", "authentik Admins"];
/** Who may look round the admin panel, drafts included, without changing anything. */
export const VIEWER_GROUPS = ["cms-viewers"];

/** What someone may do in the CMS, from their authentik groups; null = not let in. */
export type Role = "editor" | "viewer";

export type Session = {
  sub: string;
  name: string;
  email: string;
  groups: string[];
  /** authentik's session id, matched by front-channel logout. */
  sid?: string;
};

export const isEditor = (groups: readonly string[]) =>
  groups.some((group) => EDITOR_GROUPS.includes(group));

export function roleFor(groups: readonly string[]): Role | null {
  if (isEditor(groups)) return "editor";
  if (groups.some((group) => VIEWER_GROUPS.includes(group))) return "viewer";
  return null;
}

// Cookies are encrypted with a key derived from AUTH_SECRET.
const keyFor = (secret: string) => createHash("sha256").update(secret).digest();

export async function seal(payload: Record<string, unknown>, expiresIn: string, secret: string) {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .encrypt(keyFor(secret));
}

export async function unseal(token: string | undefined, secret: string) {
  if (!token) return null;
  try {
    return (await jwtDecrypt(token, keyFor(secret))).payload;
  } catch {
    return null;
  }
}

/** The session in a sealed cookie value, or null when it's missing, expired or malformed. */
export async function readSession(
  token: string | undefined,
  secret: string,
): Promise<Session | null> {
  const payload = await unseal(token, secret);
  if (typeof payload?.sub !== "string") return null;
  return {
    sub: payload.sub,
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    groups: Array.isArray(payload.groups) ? payload.groups.map(String) : [],
    sid: typeof payload.sid === "string" ? payload.sid : undefined,
  };
}

/** One cookie's value from a Cookie header. */
export function cookieFrom(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index > 0 && part.slice(0, index).trim() === name) {
      return decodeURIComponent(part.slice(index + 1).trim());
    }
  }
  return undefined;
}
