// Sign-in settings (authentik, client "cms"). All required: without them nobody can sign in to
// the admin panel, which is the point (Payload's own password login is switched off).
export type AuthEnv = {
  issuer: string;
  clientId: string;
  clientSecret: string;
  appUrl: string;
  secret: string;
  internalUrl?: string;
};

export function readAuthEnv(): AuthEnv | null {
  const {
    OIDC_ISSUER_URL: issuer,
    OIDC_CLIENT_ID: clientId,
    OIDC_CLIENT_SECRET: clientSecret,
    APP_URL: appUrl,
    AUTH_SECRET: secret,
    OIDC_INTERNAL_URL: internalUrl,
  } = process.env;
  if (!issuer || !clientId || !clientSecret || !appUrl || !secret) return null;
  return {
    // Exactly as given: authentik's issuer ends in a slash and must match character for character.
    issuer,
    clientId,
    clientSecret,
    appUrl: appUrl.replace(/\/$/, ""),
    secret,
    internalUrl: internalUrl?.replace(/\/$/, "") || undefined,
  };
}
