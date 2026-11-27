import type { Access, PayloadRequest } from "payload";
import { previewAllowed } from "@/auth/preview";

// Who may do what: everyone signed in (cms-editors, cms-viewers, authentik Admins; see
// src/auth/session.ts) may read everything, drafts included, and only editors may change anything.
// The sites read as visitors: published content only, unless they send the preview secret.

const role = (req: PayloadRequest) => (req.user as { role?: string } | null)?.role;

export const signedIn: Access = ({ req }) => Boolean(req.user);

/** Editors only: create, update and delete. */
export const editor: Access = ({ req }) => role(req) === "editor";

/** Anyone may read; the sites read without signing in. */
export const anyone: Access = () => true;

/** Signed-in people and the sites' draft preview see drafts; everyone else only the published version. */
export const publishedOrSignedIn: Access = ({ req }) =>
  req.user || previewAllowed(req.headers) ? true : { _status: { equals: "published" } };
