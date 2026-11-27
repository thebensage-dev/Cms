import { signOut } from "@/auth/oidc";

// POST only, from the admin's sign-out button, so a link or image can't sign someone out. Then
// authentik's "Sign out" page signs out of every app (see signOut). A tiny page that moves on by
// itself rather than a redirect, as in Portfolio: a CSP form-action would block the redirect.
export async function POST() {
  const next = await signOut();
  const href = next.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${href}"><title>Signing out</title></head><body><p>Signing out of every app… <a href="${href}">Continue</a></p></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}
