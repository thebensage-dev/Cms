import path from "node:path";

/**
 * The images the seed uploads (from `seed-media/` at the repo root, copied into the image):
 * screenshots of this CMS and of Storybook for the main site's CMS and Shared UI pages. Refer to one with `media(name)`.
 */
export const seedMedia = [
  {
    name: "cms-dashboard",
    file: "cms-dashboard.webp",
    alt: "The CMS dashboard: the Portfolio and User Directory sites, each with its list of pages and a link to its settings.",
  },
  {
    name: "cms-live-preview",
    file: "cms-live-preview.webp",
    alt: "Editing the CMS page in the CMS: its blocks listed on the left, and the page itself on the right in Live Preview.",
  },
  {
    name: "cms-site-settings",
    file: "cms-site-settings.webp",
    alt: "The Portfolio site's settings in the CMS, with tabs for general details, header, footer, interface wording, preview and the page-not-found message.",
  },
  {
    name: "storybook-component",
    file: "storybook-component.webp",
    alt: "Storybook's page for the PageIntro component: the component list on the left, a live example and the table of its props.",
  },
  {
    name: "storybook-colours",
    file: "storybook-colours.webp",
    alt: "Storybook's colour palette: each role, such as background, surface and primary, with its light and dark value and what it's for.",
  },
] as const;

export type MediaName = (typeof seedMedia)[number]["name"];
export type MediaRef = { $media: MediaName };

export const media = (name: MediaName): MediaRef => ({ $media: name });

/** Where the seed's image files are (the working directory is the app's root, also in Docker). */
export const seedMediaPath = (file: string) => path.resolve(process.cwd(), "seed-media", file);
