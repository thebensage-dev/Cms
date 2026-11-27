// The User Directory's site settings and pages (its landing page, directory and profile) as first
// published.

import { wordingDefaults } from "@/fields/common";
import { to } from "@/seed/refs";
import { COOKIES, FOOTER, HEADER_EXTRA } from "@/wording/interface";
import * as W from "@/wording/userDirectory";
import type { SeedPage } from "@/seed/types";

const OWNER = "TheBensage";

export const userDirectorySettings = {
  label: "User Directory",
  name: "User Directory",
  description:
    "A searchable user directory built with Next.js and React, on a .NET API with PostgreSQL.",
  interface: {
    header: wordingDefaults(HEADER_EXTRA),
    footer: wordingDefaults(FOOTER),
    cookies: wordingDefaults(COOKIES),
  },
  directory: {
    contactEmail: "hello@thebensage.com",
    contactSubject: "User Directory access",
    commonCountries: ["GB", "US", "CA", "IE", "AU", "DE", "FR", "IN"],
    form: wordingDefaults(W.FORM),
    delete: wordingDefaults(W.DELETE),
    refusals: wordingDefaults(W.REFUSALS),
    access: wordingDefaults(W.ACCESS),
    requestSent: wordingDefaults(W.REQUEST_SENT),
    errorPage: wordingDefaults(W.ERROR_PAGE),
  },
  preview: {
    label: "You're previewing unpublished changes.",
    exit: "Back to the published site",
  },
  notFound: {
    title: "Not found",
    body: "That user may have been deleted, or the link is wrong.",
    back: "Back to all users",
  },
  header: {
    nav: [{ label: "Directory", icon: "Users", link: to.url("/users") }],
    labels: { account: "Your account: name, email and password" },
  },
  footer: {
    tagline: `A demo of server-rendered search, filtering and editing, part of ${OWNER}'s portfolio.`,
    owner: OWNER,
    groups: [
      {
        title: "Directory",
        links: [
          { label: "Overview", link: to.url("/") },
          { label: "Browse users", link: to.url("/users") },
        ],
      },
      {
        title: `More from ${OWNER}`,
        links: [
          { label: "Portfolio", link: to.mainSite("/") },
          {
            label: "Source code",
            link: to.external("https://github.com/thebensage-dev/UserDirectory"),
          },
        ],
      },
    ],
    legal: [
      { label: "Privacy", link: to.mainSite("/privacy") },
      { label: "Cookies", link: to.mainSite("/privacy#cookies") },
      { label: "Terms", link: to.mainSite("/terms") },
    ],
  },
};

const openDirectory = {
  label: "Open the directory",
  style: "primary",
  size: "lg",
  icon: "ArrowRight",
  iconPosition: "end",
  link: to.url("/users"),
};

export const userDirectoryPages: SeedPage[] = [
  {
    path: "/",
    pageType: "home",
    backdrop: "dotGrid",
    title: "User Directory",
    navLabel: "Overview",
    inSitemap: false,
    layout: [
      {
        blockType: "directoryHero",
        tag: "Next.js 16 demo",
        tagIcon: "Database",
        headline: "A fast, searchable user directory",
        highlight: "searchable",
        intro:
          "Search, filter and edit records in an accessible app, rendered on the server from a .NET API on PostgreSQL, with every change validated in the browser and on the server.",
        actions: [
          openDirectory,
          {
            label: "How it works",
            style: "secondary",
            size: "lg",
            link: to.url("#how"),
          },
        ],
        summary: { show: true, users: "users", countries: "countries", interests: "interests" },
        preview: {
          query: "siobhan",
          rows: [
            { name: "Amara Okafor", job: "Frontend developer", country: "GB" },
            { name: "Siobhán Murphy", job: "Marine biologist", country: "IE", match: true },
            { name: "Yuki Tanaka", job: "Illustrator", country: "JP" },
            { name: "Lukas Becker", job: "Product designer", country: "DE" },
          ],
        },
      },
      {
        blockType: "cardGrid",
        anchor: "features",
        title: "Features",
        columns: "3",
        items: [
          {
            icon: "Search",
            title: "Flexible search",
            description:
              "Multi-word, accent-insensitive search across names, jobs, cities and interests, ranked by best match.",
          },
          {
            icon: "Filter",
            title: "Combined filters",
            description:
              "Filter by country, age range and interests, with removable chips and live counts.",
          },
          {
            icon: "Link2",
            title: "Shareable views",
            description:
              "Search, filters, sort and page all live in the URL, so any view can be bookmarked or shared.",
          },
          {
            icon: "ShieldCheck",
            title: "Shared validation",
            description:
              "One schema checks the form as you type and again on the server, with errors beside each field.",
          },
          {
            icon: "Zap",
            title: "Server-rendered",
            description:
              "Pages arrive fully rendered from the API, and changes update the page without a reload.",
          },
          {
            icon: "MoonStar",
            title: "Light and dark themes",
            description:
              "Follows the system setting or your choice, applied on the server so there is no flash.",
          },
        ],
      },
      {
        blockType: "timeline",
        anchor: "how",
        title: "How it works",
        showCount: false,
        aside: "none",
        steps: [
          {
            title: "Server Components read the data",
            description:
              "Pages call the API, a .NET service on PostgreSQL, and stream ready-made HTML.",
          },
          {
            title: "The URL drives the list",
            description:
              "nuqs keeps search and filters in the address bar; the API searches and pages in SQL.",
          },
          {
            title: "Server Actions make the changes",
            description:
              "Validated actions send your signed-in token to the API, then revalidate the page.",
          },
        ],
        tags: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          ".NET API + PostgreSQL",
          "Tailwind CSS v4",
          "zod",
          "nuqs",
          "Vitest",
        ],
      },
      {
        blockType: "callToAction",
        title: "Explore the directory",
        body: "Search, filter, or sign in to add and edit records.",
        actions: [{ ...openDirectory, icon: "ArrowRight" }],
      },
    ],
  },
  {
    path: "/users",
    title: "Users",
    navLabel: "Directory",
    inSitemap: false,
    meta: { title: "Directory" },
    layout: [
      {
        blockType: "userDirectory",
        heading: wordingDefaults(W.LIST_HEADING),
        stats: wordingDefaults(W.LIST_STATS),
        toolbar: wordingDefaults(W.LIST_TOOLBAR),
        sorts: wordingDefaults(W.LIST_SORTS),
        filters: wordingDefaults(W.LIST_FILTERS),
        results: wordingDefaults(W.LIST_RESULTS),
        empty: wordingDefaults(W.LIST_EMPTY),
        pagination: wordingDefaults(W.LIST_PAGINATION),
      },
    ],
  },
  {
    path: "/users/[id]",
    parent: "/users",
    width: "narrow",
    title: "User",
    navLabel: "User",
    inSitemap: false,
    layout: [{ blockType: "userProfile", labels: wordingDefaults(W.PROFILE) }],
  },
];
