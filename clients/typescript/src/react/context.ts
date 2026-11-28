import type { Block, LayoutBlock, SiteContent } from "../content.ts";
import type { CmsLink, ResolvedLink } from "../links.ts";
import type { ComponentType } from "react";
import type { Colours, Theme } from "@thebensage-dev/ui";
import type { Page, Project } from "../types.ts";
import type { ApiSpec } from "./apiSpec.ts";

/** What every block gets besides its own fields. A site passes this, plus anything its own
 *  blocks need (`BlockContext & { … }`). */
export type BlockContext = {
  /** The site's content (pages, projects, settings, media). */
  content: SiteContent;
  /** The page being drawn. */
  page: Page;
  /** A CMS link's address on this site, or null when it can't go anywhere right now. */
  resolveLink: (link: CmsLink | null | undefined) => ResolvedLink | null;
  /** Where the browser loads the CMS's images from (its public URL). */
  mediaUrl: string;
  /** This site's public URL, for structured data (breadcrumbs). */
  siteUrl?: string;
  /** The page's own path (sign-in links back to a section). */
  path?: string;
  /** A project's live app on this site (its address setting), for project cards. */
  projectUrl?: (project: Project) => string | undefined;
  /** An address this site knows by its setting's name (the platform map's apps). */
  envUrl?: (name: string) => string | undefined;
  /** For blocks that offer sign-in or access ("Try it" on a timeline, the theme demo). */
  access?: {
    signedIn: boolean;
    /** Signed in with this site's extras (Portfolio: portfolio-members). */
    member?: boolean;
    signInHref?: string;
    /** Sign in, then come back to `returnTo` (a path with an anchor, say). */
    signInHrefFor?: (returnTo: string) => string;
    requestAccessHref?: string;
  };
  /** The visitor's light/dark choice and colours, for the theme demo. */
  theme?: { theme: Theme; colours: Colours; cookieDomain?: string };
  /** The OpenAPI document of a page with an API reference block (null while the API is down). */
  apiSpec?: ApiSpec | null;
  /** Draws that document interactively (Portfolio: Scalar). Without it, the block shows its
   *  summary only. */
  apiViewer?: ComponentType<{ content: string; loading: string }>;
};

/** The props of the component that draws one block type. */
export type BlockProps<
  T extends LayoutBlock["blockType"],
  C extends BlockContext = BlockContext,
> = {
  block: Block<T>;
  ctx: C;
};

/** Empty CMS text as "not set". */
export const opt = (value: string | null | undefined) => value || undefined;
