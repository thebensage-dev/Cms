import { LogOutIcon } from "@payloadcms/ui";

/**
 * Replaces Payload's log-out button (its own session is switched off): single sign-out through
 * authentik, which signs out of every app. A POST, so a link can't sign someone out.
 */
export default function SignOut() {
  return (
    <form action="/auth/logout" method="post" style={{ display: "contents" }}>
      <button
        type="submit"
        title="Sign out of every app"
        aria-label="Sign out of every app"
        className="nav__log-out"
        style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: "inherit" }}
      >
        <LogOutIcon />
      </button>
    </form>
  );
}
