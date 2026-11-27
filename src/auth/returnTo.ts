/** Only paths in the admin panel, so the login can't be used to redirect somewhere else. */
export function safeReturnTo(value: string | null | undefined): string {
  return value && /^\/admin(\/|$|\?)/.test(value) && !value.includes("\\") ? value : "/admin";
}
