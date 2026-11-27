import { pageById, projectById, type SiteContent } from "./content.ts";
import type { Page, Project } from "./types.ts";

/** A link as the CMS stores it (its link field). */
export type CmsLink = {
  type?: string | null;
  newTab?: boolean | null;
  page?: number | Page | null;
  url?: string | null;
  project?: number | Project | null;
  projectTarget?: string | null;
  /** A Request access link: the app it ticks (this site when empty). */
  requestApp?: string | null;
  anchor?: string | null;
  download?: string | null;
};

export type ResolvedLink = {
  href: string;
  /** Opens in a new tab (another site). */
  external: boolean;
  /** A path on this site (a framework link, such as next/link, can take it). */
  internal: boolean;
  /** Download the file under this name instead of opening it. */
  download?: string;
};

/**
 * The addresses only the site knows, because they depend on where it runs (its env vars). A link
 * type without one here can't go anywhere on this site, so it's left out.
 */
export type LinkResolvers = {
  /** A project's live app (its address env var, or the local fallback). */
  projectUrl?: (project: Project) => string | undefined;
  /** authentik's Request access page with `app` ticked (this site when it's not given). */
  requestAccess?: (app?: string) => string | null | undefined;
  /** The OpenAPI document, when the page loaded it. */
  apiSpec?: () => string | null | undefined;
  /** The public Live status page. */
  status?: () => string | null | undefined;
  /** The main site's address (for links to its pages from another site). */
  mainSite?: () => string | null | undefined;
};

const trimSlash = (url: string) => url.replace(/\/+$/, "");

/** The address of a link from the CMS, or null when it can't go anywhere right now (an unset env
 *  var, a deleted page, the API down). `email` uses the site settings' `email`. */
export function resolveLink(
  content: SiteContent,
  link: CmsLink | null | undefined,
  resolvers: LinkResolvers = {},
): ResolvedLink | null {
  if (!link) return null;
  const href = hrefOf(content, link, resolvers);
  if (!href) return null;
  const external = Boolean(link.newTab);
  return {
    href,
    external,
    internal: href.startsWith("/") && !external,
    ...(link.type === "url" && link.download ? { download: link.download } : {}),
  };
}

function hrefOf(content: SiteContent, link: CmsLink, resolvers: LinkResolvers) {
  switch (link.type) {
    case "page": {
      const path = pageById(content, link.page)?.path;
      return path && (link.anchor ? `${path}#${link.anchor}` : path);
    }
    case "url":
      return link.url;
    case "email": {
      const email = (content.settings as { email?: string | null }).email;
      return email ? `mailto:${email}` : null;
    }
    case "project": {
      const project = projectById(content, link.project);
      if (!project) return null;
      if (link.projectTarget === "source") return project.source;
      const app = resolvers.projectUrl?.(project);
      if (link.projectTarget === "app") return app;
      if (link.projectTarget === "docs") return app && `${trimSlash(app)}/docs/`;
      return pageById(content, project.page)?.path ?? app;
    }
    case "requestAccess":
      return resolvers.requestAccess?.(link.requestApp ?? undefined);
    case "apiSpec":
      return resolvers.apiSpec?.();
    case "status":
      return resolvers.status?.();
    case "mainSite": {
      const main = resolvers.mainSite?.();
      return main && link.url ? trimSlash(main) + link.url : null;
    }
    default:
      return null;
  }
}
