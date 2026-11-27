import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type Field } from "payload";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Projects } from "@/collections/Projects";
import { Sites } from "@/collections/Sites";
import { Users } from "@/collections/Users";
import { migrations } from "@/migrations";
import { seedIfEmpty } from "@/seed";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.APP_URL?.replace(/\/$/, "") || undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · TheBensage CMS",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
      robots: "noindex, nofollow",
    },
    components: {
      // Each site and its pages, above the collection cards.
      beforeDashboard: ["@/components/admin/SiteOverview"],
      graphics: { Logo: "@/components/admin/Logo", Icon: "@/components/admin/Icon" },
      afterLogin: ["@/components/admin/SignIn"],
      logout: { Button: "@/components/admin/SignOut" },
    },
  },
  collections: [Sites, Pages, Media, Projects, Users],
  editor: lexicalEditor(),
  // The sites read the REST API; nothing uses GraphQL, so it's off.
  graphQL: { disable: true },
  telemetry: false,
  // Written by `npm run generate` (formatted, checked in CI), not by the dev server.
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts"), autoGenerate: false },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // Schema changes are migrations in src/migrations (npm run migrate:create), applied when the
    // server starts in production. `next dev` pushes the schema straight to a dev database.
    migrationDir: path.resolve(dirname, "migrations"),
    prodMigrations: migrations,
  }),
  plugins: [
    // Each site is a tenant: pages belong to one, and the site switcher at the top of the admin
    // picks which site the page list and new pages are for. Every editor works on every site.
    multiTenantPlugin({
      tenantsSlug: "sites",
      tenantField: { name: "site", admin: { position: "sidebar" } },
      tenantSelectorLabel: "Site",
      tenantsArrayField: { includeDefaultField: false },
      userHasAccessToAllTenants: () => true,
      collections: { pages: {} },
    }),
    // Breadcrumbs from each page's parent (the sites show them above the intro).
    nestedDocsPlugin({
      collections: ["pages"],
      generateLabel: (_, doc) => String(doc.navLabel || doc.title || ""),
      generateURL: (docs) => String(docs.at(-1)?.path ?? ""),
    }),
    // An SEO tab on pages: the meta title and description.
    seoPlugin({
      collections: ["pages"],
      tabbedUI: true,
      generateTitle: ({ doc }) => String(doc?.title ?? ""),
      generateDescription: ({ doc }) => String(doc?.summary ?? ""),
      fields: ({ defaultFields }) =>
        defaultFields.map((field) =>
          "name" in field && field.name === "title"
            ? {
                ...field,
                admin: {
                  ...field.admin,
                  description:
                    'Without the site name: the site adds "· TheBensage". Leave empty on a homepage.',
                },
              }
            : field,
        ) as Field[],
    }),
  ],
  // The first start on an empty database adds the sites' current content (SEED_CONTENT=true).
  onInit: async (payload) => {
    if (process.env.SEED_CONTENT === "true") await seedIfEmpty(payload);
  },
});
