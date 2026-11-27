import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { beginLogin } from "@/auth/oidc";

// GET /auth/login?returnTo=/admin/... sends the browser to authentik (the admin's Sign in button).
export async function GET(request: NextRequest) {
  let url: URL;
  try {
    url = await beginLogin(request.nextUrl.searchParams.get("returnTo") ?? "/admin");
  } catch (err) {
    console.error("Couldn't reach authentik:", err);
    redirect("/admin/login?signin=failed");
  }
  redirect(url.href);
}
