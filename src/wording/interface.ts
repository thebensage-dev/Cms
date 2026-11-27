import type { Wording } from "@/fields/common";

// The words inside the shared components (SharedUI) that every page shows: the header's theme
// switch and phone menu, the footer, the cookie notice. Both sites' settings have them (Interface
// tab), with today's wording as the defaults.

export const HEADER_EXTRA: Wording[] = [
  ["menu", "Menu", "The phone menu button."],
  ["nav", "Main", "The header's links, read out."],
  ["newTab", "(opens in a new tab)", "Read out after links that open another site."],
  ["light", "Light theme"],
  ["system", "Match system theme"],
  ["dark", "Dark theme"],
];

export const FOOTER: Wording[] = [
  ["nav", "Footer", "The footer's links, read out."],
  ["newTab", "(opens in a new tab)"],
  ["rights", "All rights reserved.", "After “© <year> <owner>.”"],
];

export const COOKIES: Wording[] = [
  ["title", "Cookies"],
  [
    "body",
    "This site uses only essential cookies, to keep you signed in and remember your preferences. It does not use analytics or tracking cookies.",
  ],
  ["dismiss", "Got it"],
  ["details", "Cookie details", "The link to the privacy notice's cookies section."],
  ["region", "Cookie notice", "The notice's name, read out."],
];
