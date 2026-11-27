import { createHmac, timingSafeEqual } from "node:crypto";

// Draft preview, shared by the CMS and the sites (all server-side). The CMS's Preview button opens
// `<site>/preview?path=…&expires=…&token=…`; the site checks the token with `verifyPreviewToken`,
// turns on its draft mode and then reads drafts with the same secret (`previewSecret` in the
// client, sent as this header). The token only says "this path, until then": the secret never
// leaves the servers.

/** The header a site sends, with the shared secret, to read drafts. */
export const PREVIEW_HEADER = "x-cms-preview";

/** How long a Preview link works. */
export const PREVIEW_MINUTES = 30;

const sign = (secret: string, path: string, expires: number) =>
  createHmac("sha256", secret).update(`${path}\n${expires}`).digest("base64url");

/** The query string of a preview link for `path` (such as `/platform`). */
export function previewQuery(secret: string, path: string, now = Date.now()): string {
  const expires = Math.floor(now / 1000) + PREVIEW_MINUTES * 60;
  const params = new URLSearchParams({
    path,
    expires: String(expires),
    token: sign(secret, path, expires),
  });
  return params.toString();
}

/**
 * The path a preview link opens, when its token is right and hasn't expired; null otherwise.
 * Only paths on the site itself (`/…`), so the link can't redirect anywhere else.
 */
export function verifyPreviewToken(
  secret: string,
  params: URLSearchParams,
  now = Date.now(),
): string | null {
  const path = params.get("path");
  const expires = Number(params.get("expires"));
  const token = params.get("token");
  if (!path || !token || !Number.isFinite(expires)) return null;
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return null;
  if (expires * 1000 < now) return null;
  const expected = Buffer.from(sign(secret, path, expires));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given) ? path : null;
}

/** The cookie Next.js sets while draft mode is on (the sites' preview). */
export const DRAFT_COOKIE = "__prerender_bypass";

/**
 * The sites' Content-Security-Policy. Pages may never be framed, except while previewing, when
 * the CMS's admin (`cmsUrl`, its public address) shows them beside the editor (Live Preview).
 */
export function securityPolicy(options: { previewing: boolean; cmsUrl?: string }): string {
  let ancestors = "'none'";
  if (options.previewing && options.cmsUrl) {
    try {
      ancestors = `'self' ${new URL(options.cmsUrl).origin}`;
    } catch {
      // A malformed address keeps framing off.
    }
  }
  return `frame-ancestors ${ancestors}; base-uri 'self'; object-src 'none'; form-action 'self'`;
}
