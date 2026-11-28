import type { AuthStrategy } from "payload";
import { auth, roleFor } from "@/auth/session";

/**
 * Payload's only way in: every admin and API request is authenticated from the authentik session
 * cookie (set by /auth/callback), never a Payload password. The groups are checked again here (so
 * the role is the one from this sign-in), and the person must have a Payload user, which the
 * callback creates.
 */
export const authentikStrategy: AuthStrategy = {
  name: "authentik",
  async authenticate({ headers, payload }) {
    const session = await auth.sessionFromHeaders(headers);
    const role = session && roleFor(session.groups);
    if (!session || !role) return { user: null };
    const found = await payload.find({
      collection: "users",
      where: { sub: { equals: session.sub } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const user = found.docs[0];
    return { user: user ? { ...user, role, collection: "users", _strategy: "authentik" } : null };
  },
};
