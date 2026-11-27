import type { Payload } from "payload";
import { portfolioPages, portfolioSettings, projects } from "@/seed/portfolio";
import { resolveRefs } from "@/seed/refs";
import { seedMedia, seedMediaPath } from "@/seed/media";
import type { SeedPage } from "@/seed/types";
import { userDirectoryPages, userDirectorySettings } from "@/seed/userDirectory";

type Site = "portfolio" | "user-directory";

const WIDTH = { home: "full", standard: "wide", legal: "narrow" } as const;

/** The page's blocks, starting with its header block (from the seed's `intro`). */
function layoutOf(seed: SeedPage): Record<string, unknown>[] {
  const { intro } = seed;
  if (!intro || seed.pageType === "home") return seed.layout;
  const header =
    seed.pageType === "legal"
      ? {
          blockType: "legalHeader",
          updatedLabel: intro.eyebrow ?? "Last updated",
          updated: intro.updated,
          intro: intro.text,
        }
      : {
          blockType: "pageHeader",
          eyebrow: intro.eyebrow,
          intro: intro.text,
          actions: intro.actions ?? [],
          breadcrumbs: true,
          breadcrumbsLabel: "Breadcrumb",
        };
  return [header, ...seed.layout];
}

/** A site's settings without what refers to pages (the header links and footer columns),
 *  to create the site before its pages exist. */
function withoutLinks(settings: Record<string, unknown>) {
  const footer = settings.footer as Record<string, unknown> | undefined;
  return {
    ...settings,
    header: undefined,
    footer: footer && { tagline: footer.tagline, owner: footer.owner },
  };
}

/**
 * Adds the sites' content to an empty CMS: both sites with their settings, their pages, and the
 * projects, all published. Runs on start with SEED_CONTENT=true and does nothing once any page
 * exists, so it's safe to leave on.
 */
export async function seedIfEmpty(payload: Payload): Promise<void> {
  const { totalDocs } = await payload.count({ collection: "pages", overrideAccess: true });
  if (totalDocs > 0) return;
  payload.logger.info("Seeding the CMS with the sites' content…");

  const sites: [Site, SeedPage[]][] = [
    ["portfolio", portfolioPages],
    ["user-directory", userDirectoryPages],
  ];
  const settings: Record<Site, Record<string, unknown>> = {
    portfolio: portfolioSettings,
    "user-directory": userDirectorySettings,
  };
  const ids = {
    pages: new Map<string, number | string>(),
    projects: new Map<string, number | string>(),
    media: new Map<string, number | string>(),
  };
  const key = (site: Site, path: string) => `${site}:${path}`;
  const local = { overrideAccess: true, context: { seeding: true } } as const;

  // 0. The images (screenshots of this CMS), then the sites themselves (their links to pages
  //    come at the end).
  for (const image of seedMedia) {
    const doc = await payload.create({
      collection: "media",
      ...local,
      data: { alt: image.alt },
      filePath: seedMediaPath(image.file),
    });
    ids.media.set(image.name, doc.id);
  }

  const siteIds = new Map<Site, number>();
  for (const [site] of sites) {
    const doc = await payload.create({
      collection: "sites",
      ...local,
      data: { ...withoutLinks(settings[site]), slug: site } as never,
    });
    siteIds.set(site, doc.id as number);
  }

  // 1. Every page without its blocks (they refer to other pages), parents first.
  for (const [site, pages] of sites) {
    for (const seed of pages) {
      const doc = await payload.create({
        collection: "pages",
        ...local,
        draft: true,
        data: {
          site: siteIds.get(site),
          path: seed.path,
          width: seed.width ?? WIDTH[seed.pageType ?? "standard"],
          backdrop: seed.backdrop ?? "none",
          title: seed.title,
          navLabel: seed.navLabel,
          cardLabel: seed.cardLabel,
          icon: seed.icon as never,
          summary: seed.summary,
          inSitemap: seed.inSitemap ?? true,
          meta: seed.meta,
          parent: seed.parent ? (ids.pages.get(key(site, seed.parent)) as number) : undefined,
        },
      });
      ids.pages.set(key(site, seed.path), doc.id);
    }
  }

  // Seed data names pages by path only, so look them up on the right site.
  const forSite = (site: Site) => ({
    pages: new Map(
      [...ids.pages].flatMap(([k, id]) =>
        k.startsWith(`${site}:`) ? [[k.slice(site.length + 1), id] as const] : [],
      ),
    ),
    projects: ids.projects,
    media: ids.media,
  });

  // 2. The projects (one links to the API reference page).
  for (const seed of projects) {
    const doc = await payload.create({
      collection: "projects",
      ...local,
      data: resolveRefs(seed, forSite("portfolio")) as never,
    });
    ids.projects.set(seed.title, doc.id);
  }

  // 3. The blocks and buttons, now that every reference exists, and publish.
  for (const [site, pages] of sites) {
    for (const seed of pages) {
      await payload.update({
        collection: "pages",
        id: ids.pages.get(key(site, seed.path))!,
        ...local,
        data: resolveRefs(
          {
            layout: layoutOf(seed),
            _status: "published",
          },
          forSite(site),
        ) as never,
      });
    }
  }

  // 4. Each site's header and footer links, now that its pages exist.
  for (const [site] of sites) {
    await payload.update({
      collection: "sites",
      id: siteIds.get(site)!,
      ...local,
      data: resolveRefs(settings[site], forSite(site)) as never,
    });
  }

  payload.logger.info(
    `Seeded ${ids.pages.size} pages, ${ids.projects.size} projects and both sites.`,
  );
}
