import type { PageRef } from "@/seed/refs";

/** A page in the seed data; references are resolved once every page and project exists. */
export type SeedPage = {
  path: string;
  /** The parent page's path (breadcrumbs). */
  parent?: string;
  /**
   * How the seed lays the page out: an inner page gets a wide column with a page header block
   * from `intro`, legal text a narrow one with a legal header block, a homepage only its blocks.
   */
  pageType?: "home" | "standard" | "legal";
  backdrop?: "none" | "dotGrid";
  /** Overrides the width the page type gives. */
  width?: "wide" | "narrow" | "full";
  title: string;
  navLabel: string;
  cardLabel?: string;
  icon?: string;
  summary?: string;
  inSitemap?: boolean;
  meta?: { title?: string; description?: string };
  intro?: {
    eyebrow?: string;
    updated?: string;
    text: string;
    actions?: Record<string, unknown>[];
  };
  layout: Record<string, unknown>[];
};

export type SeedProject = {
  title: string;
  description: string;
  tags: string[];
  address: "USER_DIRECTORY_URL" | "API_URL" | "STORYBOOK_URL" | "CMS_PUBLIC_URL";
  fallbackUrl: string;
  cta?: string;
  source: string;
  page?: PageRef;
};
