import { AccessDenied, createAuth, inGroup } from "@thebensage-dev/auth";
import { getPayload } from "payload";
import config from "@payload-config";

// Admin sign-in through authentik (@thebensage-dev/auth, from the Infrastructure repo), the same
// flow as Portfolio and the User Directory. Payload's own password login is switched off;
// `strategy.ts` reads this session instead. authentik only lets the CMS's groups through (the
// "cms" app's group rules), and the groups are checked again here: cms-editors and authentik
// Admins may edit, cms-viewers may only look. The person is kept as a Payload user (matched by
// authentik's `sub`), so versions show who made each change.

/** Who may change content: the CMS editors and authentik's admins (the `groups` claim). */
export const EDITOR_GROUPS = ["cms-editors", "authentik Admins"];
/** Who may look round the admin panel, drafts included, without changing anything. */
export const VIEWER_GROUPS = ["cms-viewers"];

/** What someone may do in the CMS, from their authentik groups; null = not let in. */
export type Role = "editor" | "viewer";

export const isEditor = (groups: readonly string[]) => inGroup(groups, EDITOR_GROUPS);

export function roleFor(groups: readonly string[]): Role | null {
  if (isEditor(groups)) return "editor";
  if (inGroup(groups, VIEWER_GROUPS)) return "viewer";
  return null;
}

/** Only paths in the admin panel, so the login can't be used to redirect somewhere else. */
export const isAdminPath = (path: string) => /^\/admin(\/|$|\?)/.test(path);

export const auth = createAuth({
  app: "cms",
  cookiePrefix: "cms",
  name: "the CMS",
  home: "/admin",
  loginPage: "/admin/login",
  allowReturn: isAdminPath,
  silentSignOn: "off",
  async onSignIn({ sub, name, email, groups }) {
    const role = roleFor(groups);
    if (!role) throw new AccessDenied("This account has no access to the CMS.");
    await upsertUser({ sub, name, email, role });
  },
});

/** Keeps the Payload user in step with authentik (matched by `sub`), creating it the first time. */
async function upsertUser(data: { sub: string; name: string; email: string; role: Role }) {
  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "users",
    where: { sub: { equals: data.sub } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const user = existing.docs[0];
  if (!user) {
    await payload.create({ collection: "users", data, overrideAccess: true });
  } else if (user.name !== data.name || user.email !== data.email || user.role !== data.role) {
    const { name, email, role } = data;
    await payload.update({
      collection: "users",
      id: user.id,
      data: { name, email, role },
      overrideAccess: true,
    });
  }
}
