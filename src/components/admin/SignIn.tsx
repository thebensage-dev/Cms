"use client";

import { Button } from "@payloadcms/ui";
import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, string> = {
  denied:
    "Your account has no access to the CMS. Ask for the cms-editors (or cms-viewers) group in authentik, then sign in again.",
  failed: "Signing in didn't work. Please try again.",
};

/**
 * On the login page in place of Payload's email and password form (switched off): sign in with
 * the platform's authentik account. /auth/login sends the browser there and back.
 */
export default function SignIn() {
  const params = useSearchParams();
  const message = MESSAGES[params.get("signin") ?? ""];
  const redirect = params.get("redirect");
  const returnTo = redirect?.startsWith("/admin") ? redirect : "/admin";

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {message && (
        <p role="alert" style={{ color: "var(--theme-error-500)", margin: 0 }}>
          {message}
        </p>
      )}
      <Button el="anchor" url={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`} size="large">
        Sign in with your TheBensage account
      </Button>
      <p style={{ margin: 0, color: "var(--theme-elevation-500)" }}>
        Sign-in goes through authentik, with the same account as every other app. Members of
        cms-editors (and authentik Admins) can edit; cms-viewers can look round without changing
        anything.
      </p>
    </div>
  );
}
