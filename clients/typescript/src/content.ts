import type { Media, Page, Project, Site as SiteRecord } from "./types.ts";

/** The front ends the CMS holds content for: each is a site record (its `slug`), which its pages
 *  belong to. */
export type Site = SiteRecord["slug"];

/** `T` with the keys `K` present and not null. */
type Filled<T, K extends keyof T> = T & { [P in K]-?: NonNullable<T[P]> };
type Directory = NonNullable<SiteRecord["directory"]>;

/**
 * A site's settings: its site record (name, header, footer, the words every page shares), with
 * the fields the CMS requires for that kind of site typed as present.
 */
export type SettingsFor<S extends Site> = S extends "portfolio"
  ? Filled<SiteRecord, "role" | "email" | "headline" | "githubUrl"> & { slug: "portfolio" }
  : Filled<SiteRecord, "description"> & {
      slug: "user-directory";
      directory: Filled<Directory, "contactEmail">;
    };

/** One block of a page's layout. */
export type LayoutBlock = NonNullable<Page["layout"]>[number];
/** The block with that `blockType`, such as `Block<"cardGrid">`. */
export type Block<T extends LayoutBlock["blockType"]> = Extract<LayoutBlock, { blockType: T }>;

/** Everything one site shows, fetched in one go: its published pages, the projects and its settings. */
export type SiteContent<S extends Site = Site> = {
  site: S;
  pages: Page[];
  projects: Project[];
  settings: SettingsFor<S>;
  /** The uploaded images (all of them: there are few). */
  media?: Media[];
  /** When this copy was fetched from the CMS (ISO time). */
  fetchedAt: string;
};

/** Where `content()` got its answer: the CMS just now, a copy from earlier, the snapshot, or
 *  unpublished drafts (preview). */
export type ContentSource = "live" | "cache" | "snapshot" | "draft";

type Ref<T> = number | T | null | undefined;
const idOf = <T extends { id: number }>(ref: Ref<T>) =>
  typeof ref === "number" ? ref : (ref?.id ?? undefined);

/** A page found for an address, with the values of its [name] segments. */
export type PageMatch = { page: Page; params: Record<string, string> };

const segments = (path: string) => path.split("/").filter(Boolean);

/** The values of `pattern`'s [name] segments in `path`, or null when it doesn't match. */
function matchPath(pattern: string, path: string): Record<string, string> | null {
  const want = segments(pattern);
  const have = segments(path);
  if (want.length !== have.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < want.length; i++) {
    const param = /^\[([a-z]+)\]$/.exec(want[i]!);
    if (param) params[param[1]!] = decodeURIComponent(have[i]!);
    else if (want[i] !== have[i]) return null;
  }
  return params;
}

/**
 * The page for an address: the page with exactly that path, else a page whose path has [name]
 * segments matching it (such as /users/[id] for /users/7). Trailing slashes are ignored.
 */
export function matchPage(content: Pick<SiteContent, "pages">, path: string): PageMatch | null {
  const wanted = path === "/" ? "/" : path.replace(/\/+$/, "");
  const exact = content.pages.find((page) => page.path === wanted);
  if (exact) return { page: exact, params: {} };
  for (const page of content.pages) {
    if (!page.path.includes("[")) continue;
    const params = matchPath(page.path, wanted);
    if (params) return { page, params };
  }
  return null;
}

/** The page for an address (see `matchPage`), or null. */
export function findPage(content: Pick<SiteContent, "pages">, path: string): Page | null {
  return matchPage(content, path)?.page ?? null;
}

/** A template's {name} placeholders filled in from `values`; unknown ones are left as they are. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (all, key: string) =>
    key in values ? String(values[key]) : all,
  );
}

/** A related page (an id at depth 0, or the page itself) from the site's content. */
export function pageById(content: Pick<SiteContent, "pages">, ref: Ref<Page>): Page | undefined {
  const id = idOf(ref);
  return id === undefined ? undefined : content.pages.find((page) => page.id === id);
}

/** A related project from the site's content. */
export function projectById(
  content: Pick<SiteContent, "projects">,
  ref: Ref<Project>,
): Project | undefined {
  const id = idOf(ref);
  return id === undefined ? undefined : content.projects.find((project) => project.id === id);
}

/** One step of a page's breadcrumb trail. */
export type Crumb = { label: string; path: string };

/** A page's breadcrumb trail: the homepage, then its parents and itself (the CMS's nested pages). */
export function crumbsFor(content: Pick<SiteContent, "pages">, page: Page): Crumb[] {
  const home = content.pages.find((candidate) => candidate.path === "/");
  const trail = (page.breadcrumbs ?? [])
    .map((crumb) => ({ label: crumb.label ?? "", path: crumb.url ?? "" }))
    .filter((crumb) => crumb.path && crumb.path !== "/");
  return [{ label: home?.navLabel ?? "", path: "/" }, ...trail];
}

const longDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** A CMS date as "25 November 2026" (the legal pages' "Last updated"). */
export const longDate = (iso: string) => longDateFormat.format(new Date(iso));

/** An uploaded image, ready for an `<img>`: its address in the browser, alt text and size. */
export type MediaImage = {
  src: string;
  alt: string;
  width?: number | null;
  height?: number | null;
};

/**
 * An image field's upload (its id, or the image itself) as an `<img>`'s values, with the file's
 * address on the CMS's public URL (`cmsPublicUrl`, which the browser can reach). Null when
 * it's missing (deleted, or not in a snapshot taken before it was uploaded).
 */
export function mediaImage(
  content: Pick<SiteContent, "media">,
  ref: number | Media | null | undefined,
  cmsPublicUrl: string,
): MediaImage | null {
  const id = idOf(ref);
  const media =
    typeof ref === "object" && ref ? ref : content.media?.find((item) => item.id === id);
  if (!media?.url) return null;
  // Always on the public address given: a stored absolute URL may be another environment's
  // (such as a snapshot taken locally).
  const path = /^https?:/.test(media.url) ? new URL(media.url).pathname : media.url;
  const src = cmsPublicUrl.replace(/\/$/, "") + path;
  return { src, alt: media.alt, width: media.width, height: media.height };
}
