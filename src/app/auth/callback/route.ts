import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { completeLogin, NotAllowedError } from "@/auth/oidc";

// authentik redirects here after sign-in.
export async function GET(request: NextRequest) {
  let next: string;
  try {
    next = await completeLogin(request.nextUrl.search);
  } catch (err) {
    if (err instanceof NotAllowedError) redirect("/admin/login?signin=denied");
    console.error("Sign-in failed:", err);
    redirect("/admin/login?signin=failed");
  }
  redirect(next);
}
