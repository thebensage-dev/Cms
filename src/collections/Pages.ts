import type { CollectionConfig, PayloadRequest } from "payload";
import { editor, publishedOrSignedIn } from "@/access";
import { previewSecret } from "@/auth/preview";
import { previewQuery } from "../../clients/typescript/src/preview";
import { portfolioBlocks, sharedBlocks, userDirectoryBlocks } from "@/blocks";
import { iconField } from "@/fields/icon";
import { createBreadcrumbsField } from "@payloadcms/plugin-nested-docs";
import { siteAddress, type BlockSet } from "@/collections/Sites";

type PageSite = { blockSets?: BlockSet[] | null; subdomain?: string | null };

/** The site a page belongs to (its site field holds the site's id): its block sets and subdomain. */
async function siteOf(req: PayloadRequest, site: unknown): Promise<PageSite | undefined> {
  const id = typeof site === "object" && site ? (site as { id: number }).id : site;
  if (typeof id !== "number" && typeof id !== "string") return undefined;
  const doc = await req.payload
    .findByID({
      collection: "sites",
      id,
      depth: 0,
      req,
      select: { blockSets: true, subdomain: true },
    })
    .catch(() => null);
  return doc ? { blockSets: doc.blockSets as BlockSet[], subdomain: doc.subdomain } : undefined;
}

const SET_BLOCKS: Record<BlockSet, string[]> = {
  portfolio: portfolioBlocks.map((block) => block.slug),
  "user-directory": userDirectoryBlocks.map((block) => block.slug),
};

/** The blocks a site offers: the general ones, plus its block sets', so an editor can only add
 *  blocks its front end draws. */
export const blocksFor = (sets: readonly BlockSet[] | null | undefined): string[] => [
  ...sharedBlocks.map((block) => block.slug),
  ...(sets ?? []).flatMap((set) => SET_BLOCKS[set] ?? []),
];

/**
 * The admin's Preview button: the page on its site, showing this page's latest draft. A signed
 * link to the site's /preview route, which turns on its draft mode (needs PREVIEW_SECRET here and
 * on the site); without the secret, the published page.
 */
export function previewUrl(site: PageSite | undefined, path: unknown): string | null {
  const origin = siteAddress(site);
  if (!origin || typeof path !== "string") return null;
  // A page for many addresses (/users/[id]) previews as its first one (/users/1).
  const address = path.replace(/\[[a-z]+\]/g, "1");
  const secret = previewSecret();
  return secret ? `${origin}/preview?${previewQuery(secret, address)}` : origin + address;
}

/**
 * Every page of every site. A page is a list of blocks (Layout), from its header to its last
 * section, each drawn by the matching component on the site, in a column as wide as Width says. The sites route by `path`, so a new page here is
 * a new page there. Drafts stay private until published.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    listSearchableFields: ["title", "path"],
    group: "Content",
    description:
      "The pages of the site picked at the top of the menu, each built from blocks. Published changes show on the site within a minute.",
    preview: async (doc, { req }) => previewUrl(await siteOf(req, doc.site), doc.path),
    // The page itself beside the editor, updating as you type (the site refreshes on each
    // autosave; see RefreshOnSave in the sites).
    livePreview: {
      url: async ({ data, req }) => previewUrl(await siteOf(req, data?.site), data?.path) ?? "",
      breakpoints: [
        { name: "mobile", label: "Phone", width: 390, height: 844 },
        { name: "tablet", label: "Tablet", width: 820, height: 1180 },
        { name: "desktop", label: "Desktop", width: 1440, height: 900 },
      ],
    },
  },
  defaultSort: "path",
  // Autosave keeps a draft as you type, so Live Preview (beside the editor) follows along. The
  // sites only show it once it's published.
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 50 },
  access: { read: publishedOrSignedIn, create: editor, update: editor, delete: editor },
  indexes: [{ fields: ["site", "path"], unique: true }],
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              admin: {
                description:
                  "The page's name: its heading in a page header block (unless that sets its own), and its title in lists.",
              },
            },
            {
              name: "layout",
              label: "Page content",
              labels: { singular: "Block", plural: "Blocks" },
              type: "blocks",
              blocks: [...sharedBlocks, ...portfolioBlocks, ...userDirectoryBlocks],
              // Only the blocks the page's site renders (all of them until it has a site).
              filterOptions: async ({ data, req }) => {
                const site = await siteOf(req, data?.site);
                return site ? blocksFor(site.blockSets) : true;
              },
              admin: {
                initCollapsed: true,
                description:
                  "The page from top to bottom. Open Live Preview (the eye) to see it beside you as you edit.",
              },
            },
          ],
        },
        {
          label: "Card and navigation",
          description: "How other pages show this one: breadcrumbs, page cards and links.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "navLabel",
                  label: "Short name",
                  type: "text",
                  required: true,
                  admin: { width: "50%", description: "In breadcrumbs and on cards." },
                },
                iconField({ admin: { width: "50%", description: "On cards linking here." } }),
              ],
            },
            {
              name: "cardLabel",
              label: "Name on cards (optional)",
              type: "text",
              admin: {
                description: "Only when cards should name it differently from the short name.",
              },
            },
            {
              name: "summary",
              type: "textarea",
              admin: { description: "The text on cards linking here." },
            },
          ],
        },
      ],
    },
    {
      name: "path",
      type: "text",
      required: true,
      index: true,
      validate: (value: string | null | undefined) =>
        (typeof value === "string" &&
          /^\/(([a-z0-9-]+|\[[a-z]+\])(\/([a-z0-9-]+|\[[a-z]+\]))*)?$/.test(value)) ||
        "Starts with /, lowercase letters, digits and dashes, no trailing slash (the homepage is /). A segment in brackets, such as /users/[id], matches any value there.",
      admin: {
        position: "sidebar",
        description:
          "The page's address on its site, such as /skills. [id] matches any value: /users/[id] is every user's profile.",
      },
    },
    {
      name: "width",
      type: "select",
      required: true,
      defaultValue: "wide",
      options: [
        { value: "wide", label: "Wide column (most pages)" },
        { value: "narrow", label: "Narrow column (long text, a profile)" },
        { value: "full", label: "Full width (each block sets its own, like a homepage)" },
      ],
      admin: {
        position: "sidebar",
        description: "Blocks such as the stack always span the full width.",
      },
    },
    {
      name: "backdrop",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none", label: "None" },
        { value: "dotGrid", label: "Dot grid behind the top of the page" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "inSitemap",
      label: "List in the sitemap",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    // Kept up to date from the Parent page by the nested-docs plugin; nothing to edit. (After the
    // tabs: the SEO plugin adds its tab to the first field when that is the tabs.)
    createBreadcrumbsField("pages", { admin: { hidden: true } }),
  ],
};
