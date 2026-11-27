import type { CollectionConfig, Condition, Field, Tab } from "payload";
import { anyone, editor } from "@/access";
import { wordingGroup } from "@/fields/common";
import { iconField } from "@/fields/icon";
import { linkGroup } from "@/fields/link";
import { COOKIES, FOOTER, HEADER_EXTRA } from "@/wording/interface";
import { ACCESS, DELETE, ERROR_PAGE, FORM, REFUSALS, REQUEST_SENT } from "@/wording/userDirectory";

/** The front ends the CMS feeds. A site record is one of them: adding another needs its app. */
export const SITE_KINDS = [
  { value: "portfolio", label: "Portfolio (the main site)" },
  { value: "user-directory", label: "User Directory" },
] as const;
export type SiteKind = (typeof SITE_KINDS)[number]["value"];

/** Where each kind of site lives (for Preview and the address shown in the admin). */
export const siteBaseUrl = (kind: unknown): string | undefined =>
  (kind === "portfolio" ? process.env.PORTFOLIO_URL : process.env.USER_DIRECTORY_URL)?.replace(
    /\/$/,
    "",
  );

/** Shown only on that kind of site's record. */
const onlyFor = (kind: SiteKind): { condition: Condition } => ({
  condition: (data) => data?.slug === kind,
});

/** Required on that kind of site only (a conditional field can't be NOT NULL in Postgres). */
const requiredFor =
  (kind: SiteKind) =>
  (value: unknown, { data }: { data: Partial<{ slug: string }> }) =>
    data?.slug !== kind || (value !== undefined && value !== null && value !== "") || "Required.";

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
          name: "slug",
          label: "Front end",
          type: "select",
          required: true,
          unique: true,
          options: [...SITE_KINDS],
          admin: { width: "50%", description: "Which app shows this site. Set once." },
          access: { update: () => false },
        },
      ],
    },
    {
      name: "address",
      type: "text",
      virtual: true,
      admin: {
        readOnly: true,
        description: "Where this site is published (from the server's settings).",
      },
      hooks: { afterRead: [({ data }) => siteBaseUrl(data?.slug) ?? "Not set here"] },
    },
    // Portfolio
    {
      type: "row",
      admin: onlyFor("portfolio"),
      fields: [
        {
          name: "role",
          type: "text",
          validate: requiredFor("portfolio"),
          admin: { width: "50%", description: "On the link preview image." },
        },
        {
          name: "email",
          label: "Contact email",
          type: "email",
          validate: requiredFor("portfolio"),
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "headline",
      type: "text",
      validate: requiredFor("portfolio"),
      admin: {
        ...onlyFor("portfolio"),
        description: "The default meta description and the link preview image's text.",
      },
    },
    {
      name: "githubUrl",
      label: "GitHub organisation",
      type: "text",
      validate: requiredFor("portfolio"),
      admin: onlyFor("portfolio"),
    },
    // User Directory
    {
      name: "description",
      label: "Meta description",
      type: "textarea",
      validate: requiredFor("user-directory"),
      admin: onlyFor("user-directory"),
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
  admin: onlyFor("user-directory"),
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "contactEmail",
          label: "Access requests by email",
          type: "email",
          validate: requiredFor("user-directory"),
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
