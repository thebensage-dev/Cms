import type { Block, LayoutBlock, SiteContent } from "../content.ts";
import type { CmsLink, ResolvedLink } from "../links.ts";
import type { Page } from "../types.ts";

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
  /** For blocks that offer sign-in or access ("Try it" on a timeline). */
  access?: { signedIn: boolean; signInHref?: string; requestAccessHref?: string };
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
