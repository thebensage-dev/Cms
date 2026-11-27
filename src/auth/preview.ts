import { timingSafeEqual } from "node:crypto";
import { PREVIEW_HEADER } from "../../clients/typescript/src/preview";

// Draft preview. The sites share PREVIEW_SECRET with the CMS: the admin's Preview button opens the
// site's /preview route with a short-lived signed link (the client package's `previewQuery`, also
// used by `previewUrl` in the Pages collection), and while previewing the site reads drafts with
// the secret in PREVIEW_HEADER, which the pages' read access checks here.

/** The secret, or undefined when preview isn't set up (then nobody can read drafts this way). */
export const previewSecret = () => process.env.PREVIEW_SECRET || undefined;

/** True when the request carries the preview secret (a site previewing drafts). */
export function previewAllowed(headers: Headers): boolean {
  const secret = previewSecret();
  const sent = headers.get(PREVIEW_HEADER);
  if (!secret || !sent) return false;
  const a = Buffer.from(sent);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}
