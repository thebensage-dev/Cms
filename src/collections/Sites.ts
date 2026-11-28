import type { CollectionConfig, Condition, Field, Tab } from "payload";
import { anyone, editor } from "@/access";
import { wordingGroup } from "@/fields/common";
import { iconField } from "@/fields/icon";
import { linkGroup } from "@/fields/link";
import { COOKIES, FOOTER, HEADER_EXTRA } from "@/wording/interface";
import { ACCESS, DELETE, ERROR_PAGE, FORM, REFUSALS, REQUEST_SENT } from "@/wording/userDirectory";

/**
 * Every site is the same kind of record and can use every shared block. A block set adds blocks
 * that need an app of their own in the site's front end: the User Directory's directory and
 * profiles (they read and change users through the API). A new site is a record here, with a
 * front end that reads it by its id.
 */
export const BLOCK_SETS = [{ value: "user-directory", label: "User Directory app" }] as const;
export type BlockSet = (typeof BLOCK_SETS)[number]["value"];

/**
 * Where a site is published: its subdomain on SITES_URL (the main domain's address, such as
 * https://thebensage.com, or http://localhost:8080 in the local stack). Only the subdomain is
 * stored, so the same content works in every environment.
 */
export function siteAddress(
  site: { subdomain?: string | null } | null | undefined,
): string | undefined {
  const base = process.env.SITES_URL?.replace(/\/+$/, "");
  if (!base || !site) return undefined;
  if (!site.subdomain) return base;
  const url = new URL(base);
  url.hostname = `${site.subdomain}.${url.hostname}`;
  return url.origin;
}

const uses = (data: unknown, set: BlockSet) =>
  Array.isArray((data as { blockSets?: unknown })?.blockSets) &&
  (data as { blockSets: string[] }).blockSets.includes(set);

/** Shown only on a site that uses that block set. */
const onlyWith = (set: BlockSet): { condition: Condition } => ({
  condition: (data) => uses(data, set),
});

/** Required only on a site that uses that block set (a conditional field can't be NOT NULL). */
const requiredWith =
  (set: BlockSet) =>
  (value: unknown, { data }: { data: unknown }) =>
    !uses(data, set) || (value !== undefined && value !== null && value !== "") || "Required.";

const rowLabel = { components: { RowLabel: "@/components/admin/RowLabel" } } as const;

const navItems: Field = {
  name: "nav",
  label: "Links",
  type: "array",
  admin: { initCollapsed: true, ...rowLabel },
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", required: true, admin: { width: "50%" } },
        iconField({ admin: { width: "50%", description: "Shown in the phone menu." } }),
      ],
    },
    linkGroup(),
    {
      name: "wideOnly",
      label: "Only on wide screens",
      type: "checkbox",
      admin: { description: "Left out of the phone menu." },
    },
  ],
};

const footerLink: Field[] = [
  {
    type: "row",
    fields: [
      { name: "label", type: "text", required: true, admin: { width: "50%" } },
      iconField({ admin: { width: "50%" } }),
    ],
  },
  linkGroup(),
];

const headerLabels: Field = {
  name: "labels",
  label: "Sign-in labels",
  type: "group",
  admin: { description: "Leave empty for the shared header's defaults." },
  fields: [
    {
      type: "row",
      fields: [
        { name: "signIn", type: "text", admin: { width: "25%" } },
        { name: "signOut", type: "text", admin: { width: "25%" } },
        { name: "account", type: "text", admin: { width: "25%" } },
        { name: "theme", type: "text", admin: { width: "25%" } },
      ],
    },
  ],
};

const generalTab: Tab = {
  label: "General",
  fields: [
    {
      name: "label",
      label: "Name in the CMS",
      type: "text",
      required: true,
      admin: { description: "How the site switcher and lists name it, such as Portfolio." },
    },
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: { width: "50%", description: "The site's name, in its header and page titles." },
        },
        {
          name: "blockSets",
          label: "Extra blocks",
          type: "select",
          hasMany: true,
          options: [...BLOCK_SETS],
          admin: {
            width: "50%",
            description:
              "The general blocks are always there. Add a set only if the site's front end draws it.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "slug",
          label: "Site id",
          type: "text",
          required: true,
          unique: true,
          validate: (value: unknown) =>
            (typeof value === "string" && /^[a-z][a-z0-9-]*$/.test(value)) ||
            "Lowercase letters, digits and dashes, such as my-site.",
          admin: {
            width: "50%",
            description: "Its front end reads the site's pages with this id. Set once.",
          },
          access: { update: () => false },
        },
        {
          name: "subdomain",
          type: "text",
          validate: (value: unknown) =>
            !value ||
            (typeof value === "string" && /^[a-z0-9-]+$/.test(value)) ||
            "Lowercase letters, digits and dashes, such as users.",
          admin: { width: "50%", description: "Empty for the main domain itself." },
        },
      ],
    },
    {
      name: "address",
      type: "text",
      virtual: true,
      admin: {
        readOnly: true,
        description: "Where this site is published: its subdomain on this environment's domain.",
      },
      hooks: { afterRead: [({ data }) => siteAddress(data) ?? "Not set here (SITES_URL)"] },
    },
    {
      name: "headline",
      label: "Description",
      type: "textarea",
      required: true,
      admin: { description: "The default meta description and the link preview's text." },
    },
    {
      type: "row",
      fields: [
        {
          name: "role",
          type: "text",
          admin: { width: "33%", description: "Optional: on the link preview image." },
        },
        {
          name: "email",
          label: "Contact email",
          type: "email",
          admin: { width: "33%", description: "Optional: for contact links." },
        },
        {
          name: "githubUrl",
          label: "GitHub",
          type: "text",
          admin: { width: "34%", description: "Optional: the source code's home." },
        },
      ],
    },
  ],
};

const headerTab: Tab = { label: "Header", name: "header", fields: [navItems, headerLabels] };

const footerTab: Tab = {
  label: "Footer",
  name: "footer",
  fields: [
    { name: "tagline", type: "textarea", required: true },
    {
      name: "owner",
      type: "text",
      admin: { description: 'Optional: "© <owner>" in place of the site name.' },
    },
    {
      name: "groups",
      label: "Columns",
      type: "array",
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          admin: { initCollapsed: true, ...rowLabel },
          fields: footerLink,
        },
      ],
    },
    {
      name: "legal",
      label: "Legal links",
      type: "array",
      admin: { initCollapsed: true, ...rowLabel },
      fields: [{ name: "label", type: "text", required: true }, linkGroup()],
    },
  ],
};

/** The words inside the shared header, footer and cookie notice. */
const interfaceTab: Tab = {
  label: "Interface",
  name: "interface",
  description: "Words inside the header, footer and cookie notice that every page shows.",
  fields: [
    wordingGroup("header", "Header", HEADER_EXTRA),
    wordingGroup("footer", "Footer", FOOTER),
    wordingGroup("cookies", "Cookie notice", COOKIES),
  ],
};

/** The User Directory's form, dialogs and access messages, shared by its directory and profiles. */
const directoryTab: Tab = {
  label: "Directory",
  name: "directory",
  description:
    "The add/edit form, the delete dialog and the access messages, shared by the directory and the profile pages.",
  admin: onlyWith("user-directory"),
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "contactEmail",
          label: "Access requests by email",
          type: "email",
          validate: requiredWith("user-directory"),
          admin: { width: "50%", description: "Where the “email me” links go." },
        },
        {
          name: "contactSubject",
          label: "Their subject",
          type: "text",
          required: true,
          defaultValue: "User Directory access",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "commonCountries",
      label: "Countries listed first in the form",
      type: "text",
      hasMany: true,
      admin: { description: "Two-letter codes, in order." },
    },
    wordingGroup("form", "Add and edit form", FORM),
    wordingGroup("delete", "Delete dialog", DELETE),
    wordingGroup("refusals", "When a change is refused", REFUSALS),
    wordingGroup("access", "Access messages", ACCESS),
    wordingGroup("requestSent", "After a request for access", REQUEST_SENT),
    wordingGroup("errorPage", "When a page can't load", ERROR_PAGE),
  ],
};

const previewTab: Tab = {
  label: "Preview",
  name: "preview",
  description: "The bar at the top of the site while you preview unpublished changes.",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          defaultValue: "You're previewing unpublished changes.",
          admin: { width: "60%" },
        },
        {
          name: "exit",
          label: "Exit link",
          type: "text",
          required: true,
          defaultValue: "Back to the published site",
          admin: { width: "40%" },
        },
      ],
    },
  ],
};

const notFoundTab: Tab = {
  label: "Page not found",
  name: "notFound",
  fields: [
    {
      type: "row",
      fields: [
        { name: "eyebrow", type: "text", admin: { width: "20%" } },
        { name: "title", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "back",
          label: "Back button",
          type: "text",
          required: true,
          admin: { width: "30%" },
        },
      ],
    },
    { name: "body", type: "textarea" },
  ],
};

/**
 * The sites (Payload's multi-tenant plugin calls them tenants): each one's name, front end and
 * settings (header, footer, the words every page shares). Pages belong to a site; the admin's
 * site switcher picks which site the page list and new pages are for.
 */
export const Sites: CollectionConfig = {
  slug: "sites",
  labels: { singular: "Site", plural: "Sites" },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "name", "address", "updatedAt"],
    group: "Settings",
    description:
      "Each site and its settings: header, footer and the words every page shares. Its pages are under Pages.",
  },
  versions: { maxPerDoc: 25 },
  access: { read: anyone, create: editor, update: editor, delete: () => false },
  fields: [
    {
      type: "tabs",
      tabs: [generalTab, headerTab, footerTab, interfaceTab, directoryTab, previewTab, notFoundTab],
    },
  ],
};
