import type { CollectionConfig } from "payload";
import { editor, signedIn } from "@/access";
import { authentikStrategy } from "@/auth/strategy";

/**
 * Everyone who has signed in. Nobody is added here by hand: signing in through authentik creates
 * or updates the person's user, matched by authentik's `sub`, with their role from their groups
 * (cms-editors or authentik Admins: editor; cms-viewers: viewer). There are no Payload passwords;
 * to remove someone, take them out of the group in authentik.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Account", plural: "Accounts" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "updatedAt"],
    group: "Settings",
    description:
      "Created on first sign-in through authentik. Manage access with the cms-editors and cms-viewers groups.",
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [authentikStrategy],
  },
  access: {
    read: signedIn,
    create: () => false,
    update: () => false,
    delete: editor,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "viewer",
      options: [
        { value: "editor", label: "Editor (cms-editors or authentik Admins)" },
        { value: "viewer", label: "Viewer (cms-viewers): can look, not change" },
      ],
      admin: { readOnly: true, description: "From their authentik groups at each sign-in." },
    },
    {
      name: "sub",
      label: "authentik id",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
  ],
};
