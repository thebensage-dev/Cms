import type { Field, GroupField } from "payload";

/**
 * Where a link goes. Addresses that differ per environment (the apps' URLs, authentik's
 * request-access page, the main site) are never typed in: the sites work them out at request time
 * from their own settings, so one CMS works for local, staging and production.
 */
export const LINK_TYPES = [
  { value: "page", label: "A page in the CMS" },
  { value: "url", label: "A URL or path (https://…, /path, /#section)" },
  { value: "email", label: "The site's contact email (mailto)" },
  { value: "project", label: "A project (its page here, its live app, docs or source)" },
  { value: "requestAccess", label: "authentik's Request access page" },
  { value: "apiSpec", label: "The API's OpenAPI document (hidden while the API is down)" },
  { value: "status", label: "The public Live status page (hidden when not set up)" },
  { value: "mainSite", label: "A path on the main site (User Directory only)" },
] as const;

export type LinkType = (typeof LINK_TYPES)[number]["value"];

export const PROJECT_TARGETS = [
  { value: "default", label: "Its page on this site, or else the live app" },
  { value: "app", label: "The live app" },
  { value: "docs", label: "The live app's /docs/ (the API's interactive docs)" },
  { value: "source", label: "Its source code" },
] as const;

const is =
  (...types: LinkType[]) =>
  (_: unknown, sibling: { type?: string }) =>
    types.includes(sibling?.type as LinkType);

/**
 * Required only for the link types that use it. (A plain `required` would make the column
 * NOT NULL in Postgres, which fails for every link of another type.)
 */
const neededFor =
  (...types: LinkType[]) =>
  (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
    !types.includes(siblingData?.type as LinkType) ||
    (value !== null && value !== undefined && value !== "") ||
    "This field is required.";

/** The fields of a link, without a label: put them in a group (see `linkGroup`). */
export function linkFields(): Field[] {
  return [
    {
      type: "row",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "page",
          options: [...LINK_TYPES],
          admin: { width: "50%" },
        },
        {
          name: "newTab",
          label: "Open in a new tab",
          type: "checkbox",
          admin: { width: "50%", style: { alignSelf: "flex-end" } },
        },
      ],
    },
    {
      name: "page",
      type: "relationship",
      relationTo: "pages",
      validate: neededFor("page"),
      admin: { condition: is("page") },
    },
    {
      name: "url",
      label: "URL or path",
      type: "text",
      validate: neededFor("url", "mainSite"),
      admin: { condition: is("url", "mainSite") },
    },
    {
      type: "row",
      admin: { condition: is("project") },
      fields: [
        {
          name: "project",
          type: "relationship",
          relationTo: "projects",
          validate: neededFor("project"),
          admin: { width: "50%" },
        },
        {
          name: "projectTarget",
          label: "Goes to",
          type: "select",
          dbName: "target",
          defaultValue: "default",
          options: [...PROJECT_TARGETS],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "requestApp",
      label: "Ticks",
      type: "select",
      dbName: "app",
      options: [
        { value: "portfolio", label: "Portfolio" },
        { value: "user-directory", label: "User Directory" },
        { value: "api", label: "API" },
        { value: "cms", label: "CMS (read-only)" },
      ],
      admin: {
        condition: is("requestAccess"),
        description: "The app ticked on the Request access page. Empty: this site.",
      },
    },
    {
      name: "anchor",
      label: "Section on the page (optional)",
      type: "text",
      admin: {
        condition: is("page"),
        description: "An id on that page, such as flow-title, added after #.",
      },
    },
    {
      name: "download",
      label: "Download as (optional)",
      type: "text",
      admin: {
        condition: is("url"),
        description: "A file name: the browser downloads the file instead of opening it.",
      },
    },
  ];
}

/** A link in a named group, such as `link` or `componentsLink`. */
export function linkGroup(name = "link", label?: string, dbName?: string): GroupField {
  return { name, label, type: "group", ...(dbName && { dbName }), fields: linkFields() };
}

/** A text label plus a link: a nav item, a footer link, a card's link. */
export function labelledLink(): Field[] {
  return [{ name: "label", type: "text", required: true }, linkGroup()];
}
