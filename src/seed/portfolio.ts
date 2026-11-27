// The main site's content as it was in Portfolio's src/content (site.ts, platform.ts, legal.ts)
// and its page files before the CMS, so the first start shows the site unchanged.

import { wordingDefaults } from "@/fields/common";
import { richText } from "@/seed/lexical";
import { COOKIES, FOOTER, HEADER_EXTRA } from "@/wording/interface";
import { AUTH_NAMES } from "@/wording/portfolio";
import { media } from "@/seed/media";
import { page, to } from "@/seed/refs";
import type { SeedPage, SeedProject } from "@/seed/types";

const GITHUB_ORG = "https://github.com/thebensage-dev";
const NAME = "TheBensage";
const EMAIL = "hello@thebensage.com";
/** The CV (in Portfolio's public/), and the name it downloads as. */
const CV_PATH = "/cv/stephen-benson-developer.pdf";
const CV_FILE = "Stephen-Benson-Developer.pdf";

export const portfolioSettings = {
  label: "Portfolio",
  name: NAME,
  role: "Full-stack developer · Next.js · .NET",
  headline: "Web applications, from database to deployment.",
  email: EMAIL,
  githubUrl: GITHUB_ORG,
  interface: {
    header: wordingDefaults(HEADER_EXTRA),
    footer: wordingDefaults(FOOTER),
    cookies: wordingDefaults(COOKIES),
  },
  preview: {
    label: "You're previewing unpublished changes.",
    exit: "Back to the published site",
  },
  notFound: { eyebrow: "404", title: "This page doesn't exist", back: "Back home" },
  header: {
    nav: [
      { label: "Projects", icon: "FolderKanban", link: to.page("/projects") },
      { label: "Skills", icon: "Compass", link: to.page("/skills") },
      { label: "Platform", icon: "Server", link: to.page("/platform") },
      { label: "Contact", icon: "Mail", link: to.email({ newTab: true }) },
      { label: "GitHub", icon: "FolderGit2", link: to.external(GITHUB_ORG) },
    ],
    labels: {
      signIn: "Sign in",
      signOut: "Sign out (of every app)",
      account: "Your account: name, email and password",
      theme: "Theme",
    },
  },
  footer: {
    tagline:
      "Full-stack web development with Next.js, React, TypeScript and .NET, self-hosted on a VPS I manage.",
    groups: [
      {
        title: "Projects",
        links: [
          { label: "All projects", link: to.page("/projects") },
          { label: "User Directory", link: to.project("User Directory") },
          { label: "API", link: to.project("API") },
          { label: "Shared UI", link: to.project("Shared UI") },
          { label: "CMS", link: to.project("CMS") },
        ],
      },
      {
        title: "Platform",
        links: [
          { label: "Overview", link: to.page("/platform") },
          { label: "Sign-in and access", link: to.page("/platform/sign-in") },
          { label: "Email", link: to.page("/platform/email") },
          { label: "How I work", link: to.page("/platform/how-i-work") },
        ],
      },
      {
        title: "About",
        links: [
          { label: "Skills", link: to.page("/skills") },
          { label: "Download CV", link: to.url(CV_PATH, { download: CV_FILE }) },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: EMAIL, icon: "Mail", link: to.email() },
          { label: "GitHub", link: to.external(GITHUB_ORG) },
          { label: "Live status", icon: "Activity", link: to.status() },
        ],
      },
    ],
    legal: [
      { label: "Privacy", link: to.page("/privacy") },
      { label: "Cookies", link: to.page("/privacy", { anchor: "cookies" }) },
      { label: "Terms", link: to.page("/terms") },
    ],
  },
};

export const projects: SeedProject[] = [
  {
    title: "User Directory",
    description:
      "Search, filter and manage a directory of users. Server Components read from the API, Server Actions send each edit with your sign-in token, and a card or table view remembers your choice.",
    tags: ["Next.js 16", "React 19", "Server Actions", "Tailwind v4"],
    address: "USER_DIRECTORY_URL",
    fallbackUrl: "http://localhost:3000",
    source: `${GITHUB_ORG}/UserDirectory`,
  },
  {
    title: "API",
    description:
      "A general-use REST API that the User Directory runs on. Its first feature is a user directory with accent-insensitive search, filters and paging in PostgreSQL, OpenAPI with interactive docs, and writes signed in through authentik and logged per change.",
    tags: [".NET", "Entity Framework Core", "PostgreSQL", "OpenAPI"],
    address: "API_URL",
    fallbackUrl: "http://localhost:3002",
    cta: "Browse the API",
    source: `${GITHUB_ORG}/Api`,
    page: page("/api-reference"),
  },
  {
    title: "Shared UI",
    description:
      "The design system behind these sites: React components, hooks and one role-based colour palette that also brands the sign-in pages and emails, published as an npm package on GitHub Packages and documented in Storybook.",
    tags: ["React 19", "Storybook 10", "Tailwind v4", "Vitest"],
    address: "STORYBOOK_URL",
    fallbackUrl: "http://localhost:6006",
    cta: "See the design system",
    source: `${GITHUB_ORG}/SharedUI`,
    page: page("/shared-ui"),
  },
  {
    title: "CMS",
    description:
      "The content behind both sites, in a self-hosted Payload CMS: pages built from blocks, Live Preview beside the editor, drafts, an image library and single sign-on, with read-only access for anyone who asks.",
    tags: ["Payload 3", "Next.js 16", "PostgreSQL", "Live Preview"],
    address: "CMS_PUBLIC_URL",
    fallbackUrl: "http://localhost:3003",
    cta: "See how it works",
    source: `${GITHUB_ORG}/Cms`,
    page: page("/platform/cms"),
  },
];

const button = (
  label: string,
  link: Record<string, unknown>,
  { style = "primary", size = "default", icon, iconPosition = "end" }: Record<string, string> = {},
) => ({ label, style, size, icon, iconPosition, link });

const skillPoints = [
  {
    icon: "Search",
    title: "The whole project",
    description:
      "I've been part of teams taking client projects from discovery through to delivery, including learning platforms and multi-tenant sites.",
    tags: ["Discovery", "Client projects"],
  },
  {
    icon: "PenTool",
    title: "Working with design and QA",
    description:
      "My degree is in Digital Media and Interaction Design, and I work closely with designers and QA, building from Adobe XD and Figma designs, and I've worked on projects that included information architecture reviews and pattern libraries.",
    tags: ["Adobe XD", "Figma", "Pattern library"],
  },
  {
    icon: "Eye",
    title: "Accessibility and performance",
    description:
      "I build accessible, WCAG-compliant interfaces, and I've worked on sites where SEO and performance were part of the build, checked with Lighthouse.",
    tags: ["WCAG", "Lighthouse", "SEO"],
  },
  {
    icon: "FlaskConical",
    title: "Testing and CI/CD",
    description:
      "Testing and CI/CD are part of how I work. I've helped bring out-of-date test suites back to passing, and worked with automated pipelines in Azure DevOps and GitHub Actions.",
    tags: ["xUnit", "Vitest", "Azure DevOps"],
  },
  {
    icon: "Repeat",
    title: "Agile delivery",
    description:
      "I've worked in Scrum teams for over five years, in small product teams and in larger client programmes, and I've helped teams improve how they plan and track sprints.",
    tags: ["Scrum", "Sprints", "DevOps"],
  },
  {
    icon: "MessagesSquare",
    title: "Code review and mentoring",
    description: "I review code and have mentored junior developers.",
    tags: ["Code review", "Mentoring"],
  },
];

const tool = (name: string, url: string, logo?: string, icon?: string) => ({
  name,
  url,
  ...(logo ? { logo } : {}),
  ...(icon ? { icon } : {}),
});

// When each legal text last changed (shown at its top).
const PRIVACY_UPDATED = "2026-11-27T12:00:00.000Z";
const TERMS_UPDATED = "2026-11-25T12:00:00.000Z";

/** The live projects and what's coming next (the homepage's "Selected work", and /projects). */
const projectsGrid = (title: string, eyebrow?: string) => ({
  blockType: "projectsGrid",
  anchor: "projects",
  eyebrow,
  title,
  labels: {
    live: "Live",
    open: "Open the app",
    source: "Source code",
    builtWith: "Built with",
    sourceOn: "of {project} on GitHub",
  },
  comingNext: {
    title: "Coming next",
    items: [
      { name: "Hangfire", detail: "Background jobs and scheduled work" },
      { name: "Email templates", detail: "Designed in-house, not just authentik's" },
      { name: "RabbitMQ", detail: "Messaging between the API and the apps" },
      { name: "Stripe", detail: "Payments" },
    ],
  },
});

export const portfolioPages: SeedPage[] = [
  // --- Home --------------------------------------------------------------------------------
  {
    path: "/",
    pageType: "home",
    title: NAME,
    navLabel: "Home",
    inSitemap: true,
    layout: [
      {
        blockType: "homeHero",
        role: "Full-stack developer · Next.js · .NET",
        headline: "Web applications, from database to deployment.",
        highlight: "from database to deployment",
        intro:
          "I build full-stack applications: Next.js, React and TypeScript on the front end, .NET APIs on PostgreSQL behind them, and the infrastructure they run on, which I manage myself. Each project below is live, and all of the code is open source on GitHub.",
        actions: [
          button("View projects", to.url("#projects"), { icon: "ArrowDown" }),
          button("Get in touch", to.email(), { style: "accent", icon: "Mail" }),
          button("How it's built", to.page("/platform"), {
            style: "secondary",
            icon: "ArrowRight",
          }),
        ],
      },
      projectsGrid("Selected work", "Projects"),
      {
        blockType: "pageTeaser",
        anchor: "skills",
        eyebrow: "Beyond the code",
        title: "More than writing code",
        intro:
          "Over five years in Scrum teams, working with design and QA, testing in CI/CD, and reviewing code and mentoring.",
        page: page("/skills"),
        linkLabel: "See how I work in a team",
      },
      {
        blockType: "platformTeaser",
        anchor: "platform",
        eyebrow: "Behind the scenes",
        title: "The platform under the projects",
        intro:
          "I run everything myself, from the server to the sign-in to the email, and each piece is set up as code in a public repo. Pick a part to see how it works.",
        highlights: [
          { value: "7", label: "apps live on one VPS" },
          { value: "1", label: "account for every app" },
          { value: "0", label: "settings typed into the server" },
        ],
        pages: [
          page("/platform"),
          page("/platform/sign-in"),
          page("/platform/email"),
          page("/platform/cms"),
        ],
        readMore: "Read more",
        linkLabel: "See the whole platform",
        linkPage: page("/platform"),
      },
      {
        blockType: "themeDemo",
        anchor: "theme",
        eyebrow: "Try the design system",
        title: "Make the brand your own",
        intro:
          "The brand has three colours, each with a job. Every component asks for a role, not a value, so changing a role here recolours everything that uses it, on this page and in the User Directory.",
        note: "Your choice is saved in a preference cookie and carries over to the User Directory. The logo keeps its own colours.",
        presetsLabel: "Presets",
        themeLabel: "Theme",
        locked: {
          title: "Sign in to try the colour palette",
          body: "Picking the brand colours is for members: one account signs you in here, in the User Directory and in the API docs. Light and dark below are open to everyone.",
          signIn: "Sign in",
          memberTitle: "Ask for the colour palette",
          memberBody:
            "You're signed in, but the palette isn't switched on for your account yet. Ask for it and I'll approve it; you'll get an email.",
          requestAccess: "Request access",
          refresh: "Already approved? Refresh your sign-in",
        },
        roles: {
          primary: { label: "Primary", hint: "Buttons, links, focus rings and selected items" },
          secondary: { label: "Secondary", hint: "Decoration: icon tiles, tags, card edges" },
          accent: { label: "Accent", hint: "Warm calls to action and search highlights" },
        },
        preview: {
          title: "Preview",
          heading: "One palette, three roles",
          primary: { button: "Save changes", link: "View details", progress: "Upload" },
          secondary: {
            tile: "Projects",
            tag: "Design",
            body: "Tiles, tags and the top edge of cards.",
          },
          accent: { button: "Get started", text: "Search matches are", match: "highlighted" },
          all: "All three together: the rule and the heading above",
          link: "Browse the components",
          componentsLink: to.project("Shared UI", "app", { newTab: true }),
        },
      },
    ],
  },

  // --- Skills --------------------------------------------------------------------------------
  {
    path: "/skills",
    title: "From discovery to delivery",
    navLabel: "Skills",
    icon: "Compass",
    summary:
      "How I work in a team: over five years in Agile teams, working with design and QA, testing in CI/CD, code review and mentoring.",
    meta: {
      title: "Skills",
      description:
        "How I work in a team: over five years in Agile teams, working with design and QA, testing in CI/CD, code review and mentoring.",
    },
    intro: {
      eyebrow: "Beyond the code",
      text: "I've worked in Agile teams for over five years, in Scrum, as a full stack developer. Alongside building features, I've been part of projects from discovery through to delivery, worked closely with design and QA, and reviewed code and mentored junior developers.",
      actions: [
        button("Get in touch", to.email(), { style: "accent", size: "sm", icon: "Mail" }),
        button("Download CV", to.url(CV_PATH, { download: CV_FILE }), {
          style: "secondary",
          size: "sm",
          icon: "Download",
        }),
      ],
    },
    layout: [
      {
        blockType: "cardGrid",
        anchor: "skills",
        title: "What I bring to a team",
        columns: "3",
        tagsLabel: "Practices",
        items: skillPoints,
      },
      {
        blockType: "timeline",
        anchor: "lifecycle",
        title: "How a project usually runs",
        intro:
          "The details change from team to team, but most of my projects have followed these steps.",
        showCount: true,
        aside: "none",
        steps: [
          {
            title: "Discover",
            description: "Understand what the client needs before the build starts.",
          },
          {
            title: "Design",
            description:
              "Work from the designs in Adobe XD or Figma, alongside the designers and QA.",
          },
          {
            title: "Build",
            description: "Deliver features in sprints, with code review along the way.",
          },
          {
            title: "Test",
            description:
              "Run the tests automatically in the CI/CD pipeline, and audit sites with Lighthouse.",
          },
          {
            title: "Release",
            description: "Release through automated pipelines in Azure DevOps or GitHub Actions.",
          },
        ],
      },
      {
        blockType: "linkCards",
        anchor: "evidence",
        title: "See it on this site",
        intro: "A few places on this site where you can see this way of working:",
        items: [
          {
            title: "A shared component library",
            body: "A React component library published as a package and documented in Storybook, used across the apps on this site.",
            linkLabel: "Browse the components",
            link: to.project("Shared UI", "app", { newTab: true }),
          },
          {
            title: "A process, mapped out",
            body: "The request-access flow laid out step by step, with who does each step and what each group unlocks.",
            linkLabel: "See the access flow",
            link: to.page("/platform/sign-in", { anchor: "flow-title" }),
          },
          {
            title: "Decisions and guides, written down",
            body: "How a change gets from an idea to production, and the house rules every repo follows.",
            linkLabel: "How I work",
            link: to.page("/platform/how-i-work"),
          },
        ],
      },
    ],
  },

  // --- Platform overview ---------------------------------------------------------------------
  {
    path: "/platform",
    title: "How the platform works",
    navLabel: "Platform",
    icon: "Server",
    summary:
      "The self-hosted platform behind every project: one VPS, Coolify, approval-gated CI/CD, single sign-on, a CMS, monitoring, logs and email, all set up as code.",
    meta: {
      title: "How the platform works",
      description:
        "The self-hosted platform behind every project: one VPS, Coolify, approval-gated CI/CD, single sign-on, a CMS, monitoring, logs and email, all set up as code.",
    },
    intro: {
      eyebrow: "The platform",
      text: "The self-hosted platform behind every project: one VPS, Coolify, approval-gated CI/CD, single sign-on, a CMS, monitoring, logs and email, all set up as code.",
      actions: [
        button("Infrastructure on GitHub", to.external(`${GITHUB_ORG}/Infrastructure`), {
          style: "secondary",
          icon: "Code",
          iconPosition: "start",
        }),
      ],
    },
    layout: [
      {
        blockType: "platformMap",
        anchor: "map",
        title: "What runs where",
        intro:
          "Every app has its own subdomain and its own Coolify app on the same VPS. Cloudflare answers DNS, and Coolify's proxy routes each name to its container with an HTTPS certificate.",
        apps: [
          { host: "thebensage.com", name: "Portfolio", detail: "This site", address: "SITE_URL" },
          {
            host: "users.",
            name: "User Directory",
            detail: "Next.js app",
            address: "USER_DIRECTORY_URL",
          },
          {
            host: "api.",
            name: "API",
            detail: ".NET and PostgreSQL",
            address: "page",
            page: page("/api-reference"),
          },
          {
            host: "ui.",
            name: "Storybook",
            detail: "The shared components",
            address: "STORYBOOK_URL",
          },
          { host: "id.", name: "authentik", detail: "Sign-in for every app", address: "none" },
          {
            host: "grafana.",
            name: "Grafana",
            detail: "Metrics, logs and alerts",
            address: "none",
          },
          { host: "cms.", name: "CMS", detail: "Payload: the sites' content", address: "none" },
        ],
      },
      {
        blockType: "pageCards",
        anchor: "deep-dives",
        title: "Take a closer look",
        pages: [
          page("/platform/sign-in"),
          page("/platform/email"),
          page("/platform/cms"),
          page("/platform/how-i-work"),
        ],
        readMore: "Read more",
      },
      {
        blockType: "stack",
        anchor: "stack",
        eyebrow: "Behind the scenes",
        title: "Every piece, and the tools behind it",
        intro:
          "Every project runs on infrastructure I set up and maintain: the server, the deployment pipeline, sign-in, monitoring, logging, email and security.",
        pipelineLabel: "From a push to your browser",
        pipeline: [
          { icon: "GitBranch", title: "Pull request", detail: "One open-source repo per project" },
          {
            icon: "Workflow",
            title: "GitHub Actions",
            detail: "Checks, tests, Docker image, approval",
          },
          { icon: "Container", title: "Coolify", detail: "Pulls the approved image and deploys" },
          { icon: "Globe", title: "Cloudflare", detail: "DNS for the domain and subdomains" },
        ],
        pieces: [
          {
            icon: "Server",
            title: "Self-hosted VPS",
            description:
              "One IONOS VPS runs everything. Coolify manages each project as its own app, with HTTPS certificates handled by its proxy.",
            tags: ["IONOS", "Coolify"],
          },
          {
            icon: "Container",
            title: "Docker builds",
            description:
              "Every app ships as a lean multi-stage Docker image, built once in CI, so the image I approve is exactly the one that goes live.",
            tags: ["Docker", "Node 26"],
          },
          {
            icon: "Rocket",
            title: "CI/CD",
            description:
              "GitHub Actions checks every pull request and push, and builds the Docker image. A green build on main deploys only after a reviewer approves it, and the pipeline sends every setting to the server, so nothing is configured by hand.",
            tags: ["GitHub Actions", "Dependabot"],
          },
          {
            icon: "Blocks",
            title: "One design system",
            description:
              "One npm package gives every site the same components, motion and brand, documented in Storybook on its own subdomain. Every colour is defined once, by role (surface, primary, danger…), in a single file: the sites, Storybook, the sign-in pages and the emails are all generated from it, so changing the palette there changes it everywhere.",
            tags: ["@thebensage-dev/ui", "Storybook", "Design tokens"],
          },
          {
            icon: "KeyRound",
            title: "Single sign-on",
            description:
              "My own authentik instance signs you in to every site over OpenID Connect: sign in once for all of them, sign out once from all of them. Passkeys and two-factor, group-based access, one “Request access” page that I approve app by app (with emails at each step) and single-use invite links for guests, all set up from a versioned blueprint.",
            tags: ["authentik", "OIDC"],
          },
          {
            icon: "Activity",
            title: "Monitoring and alerts",
            description:
              "Prometheus collects metrics from the server, each container and HTTPS checks on every site. Grafana charts them and emails me when a site goes down, slows down or a certificate is about to expire.",
            tags: ["Prometheus", "Grafana", "Blackbox exporter", "cAdvisor"],
          },
          {
            icon: "ScrollText",
            title: "Centralised logs",
            description:
              "Alloy gathers the output of every container and stores it in Loki, so errors from any app can be searched in the same Grafana, next to the metrics.",
            tags: ["Loki", "Alloy", "Grafana"],
          },
          {
            icon: "Mail",
            title: "Email",
            description:
              "Access requests, approvals and alerts go out through SMTP2GO from noreply@, on a verified domain with its DNS records in Cloudflare. The public addresses are forwarded by Cloudflare Email Routing, and every setting comes from the pipeline.",
            tags: ["SMTP2GO", "Cloudflare Email Routing"],
          },
          {
            icon: "Gauge",
            title: "Public status page",
            description:
              "A read-only Grafana dashboard anyone can open shows each site's status, uptime and response time, and the server's CPU, memory and disk, from the same checks that send the alerts. It's linked in the footer as Live status.",
            tags: ["Grafana", "Blackbox exporter"],
          },
          {
            icon: "Users",
            title: "Ready for a team",
            description:
              "Every project lives in one GitHub organization, in the open. Main is protected by a ruleset (pull requests must pass CI, no force pushes), and production secrets sit behind an approval-gated environment, so only a reviewed deploy can read them. Shared settings are set once for the whole organization, and each repo derives the rest, so a new teammate or a new project needs no secrets copied around.",
            tags: ["GitHub organization", "Protected branches", "Environments"],
          },
          {
            icon: "PenTool",
            title: "Content in a CMS",
            description:
              "Every page, menu, link and setting of these sites is edited in my own Payload CMS, as blocks that match the sites' components, with drafts, versions and a preview before anything goes live. Editors sign in through authentik, and the sites keep their last copy, so they stay up if the CMS is down.",
            tags: ["Payload", "PostgreSQL", "Next.js"],
          },
          {
            icon: "ShieldCheck",
            title: "Security by default",
            description:
              "HTTPS everywhere with HSTS and security headers, sign-in through authentik with passkeys, two-factor and group-based roles for the admin tools and for editing, and no public ports for internal services. Secrets stay out of git and out of Docker images, and image versions are pinned and updated through reviewed Dependabot PRs.",
            tags: ["HSTS", "CSP", "Passkeys", "Dependabot"],
          },
          {
            icon: "Laptop",
            title: "The whole platform, locally",
            description:
              "One Docker Compose command runs every site, sign-in, monitoring and logs on my laptop, built the same way as production, so changes are checked end to end before they ship.",
            tags: ["Docker Compose", "Caddy"],
          },
        ],
        toolsTitle: "The tools behind it",
        toolGroups: [
          {
            group: "Apps",
            tools: [
              tool("Next.js", "https://nextjs.org", "nextdotjs"),
              tool("React", "https://react.dev", "react"),
              tool("TypeScript", "https://www.typescriptlang.org", "typescript"),
              tool("Tailwind CSS", "https://tailwindcss.com", "tailwindcss"),
              tool("Node.js", "https://nodejs.org", "nodedotjs"),
              tool(".NET", "https://dotnet.microsoft.com", "dotnet"),
              tool("PostgreSQL", "https://www.postgresql.org", "postgresql"),
              tool("Storybook", "https://storybook.js.org", "storybook"),
              tool("Vitest", "https://vitest.dev", "vitest"),
              tool("Payload", "https://payloadcms.com", "payloadcms"),
            ],
          },
          {
            group: "Hosting and delivery",
            tools: [
              tool("IONOS", "https://www.ionos.com", "ionos"),
              tool("Coolify", "https://coolify.io", "coolify"),
              tool("Docker", "https://www.docker.com", "docker"),
              tool("Traefik", "https://traefik.io", "traefikproxy"),
              tool("Cloudflare", "https://www.cloudflare.com", "cloudflare"),
              tool("Let's Encrypt", "https://letsencrypt.org", "letsencrypt"),
              tool("GitHub", "https://github.com", "github"),
              tool("GitHub Actions", "https://github.com/features/actions", "githubactions"),
              tool("Dependabot", "https://github.com/dependabot", "dependabot"),
              tool("Caddy", "https://caddyserver.com", "caddy"),
            ],
          },
          {
            group: "Sign-in, monitoring and email",
            tools: [
              tool("authentik", "https://goauthentik.io", "authentik"),
              tool("Prometheus", "https://prometheus.io", "prometheus"),
              tool("Grafana", "https://grafana.com", "grafana"),
              tool("Loki", "https://grafana.com/oss/loki/", undefined, "ScrollText"),
              tool("Alloy", "https://grafana.com/oss/alloy/", undefined, "Workflow"),
              tool("SMTP2GO", "https://www.smtp2go.com", undefined, "Mail"),
            ],
          },
          {
            group: "Built with",
            tools: [
              tool("Claude Code", "https://claude.com/claude-code", "claude"),
              tool("GitHub Desktop", "https://desktop.github.com", "github"),
            ],
          },
        ],
      },
    ],
  },

  // --- Projects ------------------------------------------------------------------------------
  {
    path: "/projects",
    title: "Projects",
    navLabel: "Projects",
    icon: "FolderKanban",
    summary: "Every live project, what each is built with, and its source code.",
    meta: {
      description: `Live projects by ${NAME}: a user directory, the API behind it, a shared design system and a self-hosted CMS, all open source.`,
    },
    intro: {
      eyebrow: "Projects",
      text: "Each project is live and open source. The cards open each one's page here, or the app itself, with its source code a click away.",
    },
    layout: [projectsGrid("Live projects")],
  },

  // --- Shared UI -----------------------------------------------------------------------------
  {
    path: "/shared-ui",
    title: "One design system for every site",
    navLabel: "Shared UI",
    icon: "Palette",
    summary:
      "The components, styles and colour palette every site here is built from: a React library on GitHub Packages, documented in Storybook.",
    meta: {
      title: "Shared UI",
      description:
        "The design system behind the sites: React components, Tailwind styles and one role-based colour palette, published as a package and documented in Storybook.",
    },
    intro: {
      eyebrow: "Shared UI",
      text: "Every site here is built from one library: React components, Tailwind styles and a colour palette defined once, by role. It's published as a package, documented in Storybook, and the sign-in pages and emails use the same palette.",
      actions: [
        button("Browse the components", to.project("Shared UI", "app"), {
          icon: "ArrowUpRight",
        }),
        button("Shared UI on GitHub", to.project("Shared UI", "source"), {
          style: "secondary",
          icon: "Code",
          iconPosition: "start",
        }),
      ],
    },
    layout: [
      {
        blockType: "imageText",
        anchor: "storybook",
        image: media("storybook-component"),
        imageSide: "right",
        eyebrow: "Storybook",
        heading: "Every component, documented and live",
        body: richText([
          "Storybook lists every component with live examples, the props it takes and controls to try them. It's built from the same source the sites install, so the examples can't drift from what's in use.",
          "The sites never copy a component: a fix or a new component goes into the library, gets a release, and each site picks it up with a version bump.",
        ]),
      },
      {
        blockType: "columns",
        anchor: "inside",
        title: "What's inside",
        intro: "The parts every site shares, so they look and behave the same.",
        columns: [
          {
            heading: "Components",
            body: richText([
              "The header and footer, page intros, cards, timelines, dialogs, pagination, search, the cookie notice, the theme toggle and the colour picker, each with its own stories and tests.",
            ]),
          },
          {
            heading: "Styles and tokens",
            body: richText([
              "Tailwind styles for buttons, cards, forms and tags, spacing and heading tokens, and motion that turns itself off for people who ask for less.",
            ]),
          },
          {
            heading: "Content-ready",
            body: richText([
              "The pieces the CMS's blocks are drawn with, from rich text to images, and one icon list that the CMS's picker and both sites share.",
            ]),
          },
        ],
      },
      {
        blockType: "imageText",
        anchor: "palette",
        image: media("storybook-colours"),
        imageSide: "left",
        eyebrow: "The palette",
        heading: "One palette, defined by role",
        body: richText([
          "Colours live in one file, by what they're for: background, surface, primary, secondary, accent and their soft and ink shades, each with a light and a dark value. Components ask for a role, never a colour.",
          "The build checks every text and fill pairing for WCAG AA contrast in both themes, and the sign-in pages and emails take their colours from the same file.",
        ]),
        actions: [
          button("Try changing the colours", to.page("/", { anchor: "theme" }), {
            style: "secondary",
            icon: "Palette",
            iconPosition: "start",
          }),
        ],
      },
      {
        blockType: "content",
        anchor: "releases",
        eyebrow: "Releases",
        heading: "Released like any other package",
        body: richText([
          "A release is a version bump. CI checks it, publishes it to GitHub Packages and redeploys Storybook; Dependabot then offers the update to each site.",
        ]),
      },
    ],
  },

  // --- The CMS -------------------------------------------------------------------------------
  {
    path: "/platform/cms",
    parent: "/platform",
    title: "Every page, edited in a CMS",
    navLabel: "The CMS",
    icon: "PenTool",
    summary:
      "Every word on the sites lives in my own Payload CMS: pages built from blocks, a live preview beside the editor, drafts, and a read-only look round for anyone who asks.",
    meta: {
      title: "The CMS",
      description:
        "How the sites' content lives in a self-hosted Payload CMS: pages built from blocks, Live Preview, drafts and read-only access on request.",
    },
    intro: {
      eyebrow: "Payload CMS",
      text: "Every word on this site and the User Directory comes from my own Payload CMS. Pages are built from blocks, previewed live beside the editor, and published without a deploy. Ask for access and you can look round it yourself, read-only.",
      actions: [
        button(
          "Request access",
          { ...to.requestAccess(), requestApp: "cms" },
          {
            icon: "UserPlus",
            iconPosition: "start",
          },
        ),
        button("The CMS on GitHub", to.external(`${GITHUB_ORG}/Cms`), {
          style: "secondary",
          icon: "Code",
          iconPosition: "start",
        }),
      ],
    },
    layout: [
      {
        blockType: "imageText",
        anchor: "sites",
        image: media("cms-dashboard"),
        imageSide: "right",
        eyebrow: "Start from the page",
        heading: "Each site, and every page on it",
        body: richText([
          "The dashboard lists both sites and their pages. A site switcher at the top of the menu picks the site I'm working on, so the page list and any new page belong to it.",
          "Each site's own record holds what every page shares: the header links, the footer, the sign-in labels and the cookie notice.",
        ]),
      },
      {
        blockType: "imageText",
        anchor: "live-preview",
        image: media("cms-live-preview"),
        imageSide: "left",
        eyebrow: "Live Preview",
        heading: "The real page, beside the editor",
        body: richText([
          "Live Preview shows the site itself next to the form, at phone, tablet or desktop width. Drafts save as I type and the page redraws with each change, so what I see is what will go live.",
          "Nothing is public until I publish. The sites only ever show published pages; a draft is visible only in preview, through a short-lived signed link.",
        ]),
      },
      {
        blockType: "columns",
        anchor: "blocks",
        title: "Built from blocks",
        intro:
          "A page is a list of blocks, top to bottom. Each block is a component the site already knows how to draw, so a new page needs no code.",
        columns: [
          {
            heading: "General blocks",
            body: richText([
              "Text, images, image and text, columns and buttons, for putting a new page together.",
            ]),
          },
          {
            heading: "Site sections",
            body: richText([
              "The homepage hero, the project cards, the platform map, the stack, the flows and the API reference: the sections that make up this site.",
            ]),
          },
          {
            heading: "New components",
            body: richText([
              "A new kind of section is one block in the CMS and one component in the site. Once it's released, it's in the block picker with the rest.",
            ]),
          },
        ],
      },
      {
        blockType: "content",
        anchor: "access",
        eyebrow: "Look round it yourself",
        heading: "Read-only access, on request",
        body: richText([
          "Anyone can ask for a look. Request access opens the same page as for every other app here, with the CMS ticked: create an account (or sign in), add a line about why, and I'll approve it.",
          [
            "**Viewers** (`cms-viewers`) can open every page, its blocks and Live Preview, but can't save anything.",
            "**Editors** (`cms-editors`) can change and publish pages. That's me.",
            "**Sign-in** is the same single sign-on as the rest of the platform, through authentik.",
          ],
        ]),
        actions: [
          button(
            "Request access",
            { ...to.requestAccess(), requestApp: "cms" },
            {
              icon: "UserPlus",
              iconPosition: "start",
            },
          ),
          button("How sign-in works", to.page("/platform/sign-in"), { style: "secondary" }),
        ],
      },
      {
        blockType: "image",
        image: media("cms-site-settings"),
        caption:
          "A site's settings: its details, header links, footer, and the words every page shares.",
      },
    ],
  },

  // --- Sign-in -------------------------------------------------------------------------------
  {
    path: "/platform/sign-in",
    parent: "/platform",
    title: "One account for every app",
    navLabel: "Sign-in and access",
    icon: "KeyRound",
    summary:
      "How sign-in works across the sites: single sign-on and single sign-out through my own authentik, a request-access page approved app by app, and an email at every step.",
    meta: {
      title: "Sign-in and access",
      description:
        "How sign-in works across the sites: single sign-on and single sign-out through my own authentik, a request-access page approved app by app, and an email at every step.",
    },
    intro: {
      eyebrow: "Single sign-on",
      text: "Every site here signs in through my own authentik instance over OpenID Connect. Sign in once and you're signed in everywhere; sign out once and you're signed out everywhere. Getting access is one page, and I approve it app by app.",
      actions: [
        button("Request access", to.requestAccess(), { icon: "UserPlus", iconPosition: "start" }),
        button(
          "The blueprint on GitHub",
          to.external(
            `${GITHUB_ORG}/Infrastructure/blob/main/identity/authentik/blueprints/platform.yaml`,
          ),
          { style: "secondary", icon: "Code", iconPosition: "start" },
        ),
      ],
    },
    layout: [
      {
        blockType: "cardGrid",
        anchor: "sso",
        title: "Sign in once, use every app",
        columns: "3",
        items: [
          {
            icon: "KeyRound",
            title: "Single sign-on",
            description:
              "When you open a site signed out, it quietly asks authentik whether you're already signed in (prompt=none). If you are, you're in without seeing a form; if not, you stay on the page as a visitor, with no error. Crawlers and uptime checks skip the check.",
          },
          {
            icon: "LogOut",
            title: "Single sign-out",
            description:
              "Sign out anywhere and authentik ends its session, then loads each app's front-channel logout page in a hidden frame, so every site drops its own session too.",
          },
          {
            icon: "FingerprintPattern",
            title: "Passkeys and two-factor",
            description:
              "Sign in with a password or a passkey offered straight away by the browser, and add an authenticator app for two-factor. The sign-in pages carry the same brand as the sites.",
          },
        ],
      },
      {
        blockType: "timeline",
        anchor: "flow",
        title: "How getting access works",
        intro:
          "One request-access page serves every app. Each app links to it with its own box already ticked, and the account works straight away, but it unlocks nothing until I approve an app.",
        showCount: true,
        aside: "tryAccess",
        tryAccess: {
          title: "Try it",
          body: "Request access and you'll get the real emails. I approve requests by hand, so it may take a little while.",
          signedIn: "You're signed in, so you've already used single sign-on.",
          requestAccess: "Request access",
          signIn: "Sign in",
        },
        steps: [
          {
            icon: "UserPlus",
            actor: "You",
            title: "Create an account",
            description:
              "Name, email, username and password. A second account with the same email or username is refused on the form. Already signed in? This step is skipped.",
          },
          {
            icon: "ListChecks",
            actor: "You",
            title: "Pick the apps",
            description:
              "Tick what you'd like, with an optional reason. authentik keeps the picks on your account and sends you back to the app you came from, signed in.",
          },
          {
            icon: "Send",
            actor: "authentik",
            title: "Emails go out",
            description:
              "You get a “We've got your request” email, and I get a “New access request” email at admin@ with your picks, your reason and a button to review it in authentik.",
          },
          {
            icon: "UserCheck",
            actor: "Me",
            title: "Approve, app by app",
            description:
              "Approving is adding you to that app's group. No form to fill in and nothing to remember: the group is the permission.",
          },
          {
            icon: "MailCheck",
            actor: "authentik",
            title: "“You're in”",
            description:
              "A rule watches group changes and emails you once per approved app, with a button to open it. The access applies at your next sign-in to that app.",
          },
        ],
      },
      {
        blockType: "accessTable",
        anchor: "access",
        title: "Who can do what",
        intro:
          "Anyone with an account can sign in to every public app. What you can do there comes from the groups in your sign-in token, which each app checks itself.",
        columns: { app: "App", group: "Group", unlocks: "Unlocks" },
        rows: [
          {
            app: "Portfolio",
            group: "portfolio-members",
            unlocks: "The colour palette on this site",
          },
          {
            app: "User Directory",
            group: "user-directory-editors",
            unlocks: "Adding, editing and deleting users",
          },
          { app: "API", group: "api-editors", unlocks: "Sending real requests from the API docs" },
          {
            app: "Grafana",
            group: "grafana-viewers, grafana-admins",
            unlocks: "Dashboards and logs (I add these by hand; they can't be requested)",
          },
          {
            app: "CMS",
            group: "cms-editors, cms-viewers",
            unlocks: "Editing the sites' content, or looking round it (by hand too)",
          },
        ],
      },
      {
        blockType: "cardGrid",
        anchor: "details",
        title: "The details that matter",
        columns: "2",
        items: [
          {
            icon: "FileCode",
            title: "Everything as code",
            description:
              "Groups, apps, sign-in pages, emails and the approval rule live in one versioned blueprint that authentik re-applies on start and hourly, so a change in the UI can't drift.",
          },
          {
            icon: "LockKeyhole",
            title: "Least privilege",
            description:
              "People who sign up are external users: they reach the apps they're allowed into and never authentik's own admin pages. Writes to the API need an editor group, checked by the API itself.",
          },
          {
            icon: "Ticket",
            title: "Guest invites",
            description:
              "For a short-term guest I create a single-use invite link with an expiry. They pick their own password, can edit the User Directory and nothing else, and I deactivate them afterwards.",
          },
          {
            icon: "ShieldCheck",
            title: "Privacy built in",
            description:
              "The sign-up form says what's stored and links the privacy notice. Accounts are deleted when a request is refused or access ends.",
          },
        ],
      },
    ],
  },

  // --- Email ---------------------------------------------------------------------------------
  {
    path: "/platform/email",
    parent: "/platform",
    title: "Email that actually arrives",
    navLabel: "Email",
    icon: "Mail",
    summary:
      "How the platform sends and receives email: SMTP2GO on a verified domain for access requests, approvals and alerts, and Cloudflare forwarding for the public addresses.",
    meta: {
      title: "Email",
      description:
        "How the platform sends and receives email: SMTP2GO on a verified domain for access requests, approvals and alerts, and Cloudflare forwarding for the public addresses.",
    },
    intro: {
      eyebrow: "Email delivery",
      text: "Two parts of the platform send email: authentik, for access requests and approvals, and Grafana, for alerts. Both go through SMTP2GO from noreply@thebensage.com, on a domain verified with DNS records, so the messages land in the inbox rather than spam.",
      actions: [
        button(
          "The email templates on GitHub",
          to.external(`${GITHUB_ORG}/Infrastructure/tree/main/identity/authentik/templates/email`),
          { style: "secondary", icon: "Code", iconPosition: "start" },
        ),
      ],
    },
    layout: [
      {
        blockType: "flows",
        anchor: "flow",
        title: "How a message travels",
        rows: [
          {
            label: "Sending",
            steps: [
              { icon: "Server", title: "authentik or Grafana", detail: "In Docker on the VPS" },
              { icon: "LockKeyhole", title: "SMTP over STARTTLS", detail: "Port 587, signed in" },
              { icon: "Send", title: "SMTP2GO", detail: "Signs and delivers" },
              { icon: "Inbox", title: "Your inbox", detail: "From noreply@" },
            ],
          },
          {
            label: "Receiving",
            steps: [
              { icon: "Mail", title: "hello@ or admin@", detail: "Public addresses" },
              { icon: "Globe", title: "Cloudflare", detail: "Email Routing" },
              { icon: "Forward", title: "Forwarded", detail: "To my own inbox" },
            ],
          },
        ],
      },
      {
        blockType: "addressCards",
        anchor: "addresses",
        title: "Three addresses, three jobs",
        items: [
          {
            address: "noreply@thebensage.com",
            job: "The sender of every automatic email. Nobody reads it, so replies aren't invited.",
          },
          {
            address: "hello@thebensage.com",
            job: "The public contact address on every site, the privacy notice and the terms.",
          },
          {
            address: "admin@thebensage.com",
            job: "Where access requests and alerts go, so personal mail stays separate.",
          },
        ],
      },
      {
        blockType: "emailSenders",
        anchor: "senders",
        title: "What gets sent",
        senders: [
          {
            icon: "Users",
            title: "Sign-in emails",
            description: "Sent by authentik during the request-access flow.",
            items: [
              "“We've got your request”, to you",
              "“New access request”, to admin@",
              "“You're in”, to you, once per approved app",
            ],
          },
          {
            icon: "BellRing",
            title: "Alerts",
            description: "Sent by Grafana when a rule fires, and again when it resolves.",
            items: [
              "Site down",
              "Site slow",
              "TLS certificate expiring",
              "Disk almost full",
              "Memory high",
              "CPU high",
              "Monitoring component down",
            ],
          },
        ],
        preview: {
          title: "The “You're in” email",
          fromLabel: "From",
          from: "TheBensage <noreply@thebensage.com>",
          subject: "You're in: your User Directory access is approved",
          heading: "You're in",
          greeting: "Hi Alex,",
          body: "Your access to the User Directory has been approved. Sign in with the username alex and the password you chose when you asked.",
          button: "Open the User Directory",
          caption:
            "Built from an HTML template with inline styles, in the same palette as the sites: the colours and the logo are generated from the design system when authentik's image is built. Next, I'm bringing the template design in-house, so it no longer relies only on authentik's own emails.",
        },
      },
      {
        blockType: "cardGrid",
        anchor: "practices",
        title: "Done properly",
        columns: "2",
        items: [
          {
            icon: "ShieldCheck",
            title: "A verified domain",
            description:
              "thebensage.com is a verified sender domain in SMTP2GO, with its DKIM and return-path records in Cloudflare, so receiving servers can check every message really comes from the domain.",
          },
          {
            icon: "Activity",
            title: "No click tracking",
            description:
              "Link tracking is switched off, so every button in an email goes straight to the site it names, not through a redirect on someone else's domain.",
          },
          {
            icon: "Code",
            title: "Settings, not code",
            description:
              "The SMTP server, port, TLS, login, sender and recipients are seven explicit settings in GitHub, passed in by the deploy pipeline. The password is a secret only an approved deploy can read. A new provider is new values, not a code change.",
          },
          {
            icon: "Laptop",
            title: "Tested before it ships",
            description:
              "The local Docker stack sends the same emails through the same provider, so a change to a template or a setting is checked end to end before production.",
          },
        ],
      },
    ],
  },

  // --- How I work ----------------------------------------------------------------------------
  {
    path: "/platform/how-i-work",
    parent: "/platform",
    title: "From idea to production",
    navLabel: "How I work",
    icon: "Workflow",
    summary:
      "How I take a change from idea to production: clear outcomes, written house rules in every repo, real verification before anything ships, and every review, commit and deploy approved by me.",
    meta: {
      title: "How I work",
      description:
        "How I take a change from idea to production: clear outcomes, written house rules in every repo, real verification before anything ships, and every review, commit and deploy approved by me.",
    },
    intro: {
      eyebrow: "Engineering workflow",
      text: "I design, build and run this platform myself. AI-assisted tooling speeds up the routine parts, the way linters and CI do, but the architecture, the decisions, the reviews and every deploy are mine.",
      actions: [
        button("The AI tooling I use: Claude Code", to.external("https://claude.com/claude-code"), {
          style: "ghost",
          size: "sm",
          icon: "ArrowUpRight",
        }),
      ],
    },
    layout: [
      {
        blockType: "timeline",
        anchor: "workflow",
        title: "How a change gets made",
        showCount: true,
        aside: "note",
        note: {
          title: "Why it matters to a team",
          body: "The habits behind this are the ones a team needs: breaking work into clear outcomes, writing down the rules, demanding evidence, and reviewing everything before it ships. They let one developer design, build, secure and run a platform this size, and every line of it is mine to answer for.",
        },
        steps: [
          {
            icon: "ListChecks",
            actor: "Me",
            title: "Define the outcome",
            description:
              "I start from what a change should achieve, like “show the sign-up flow on the portfolio”, and split it into separate pieces of work so unrelated jobs don't tangle.",
          },
          {
            icon: "Split",
            actor: "Me",
            title: "Build it",
            description:
              "I write and refine the code to the rules each repo sets out, using AI-assisted tooling for routine work such as boilerplate and first drafts.",
          },
          {
            icon: "UserRoundCheck",
            actor: "Me",
            title: "Make the calls",
            description:
              "When a choice changes the result, like the shape of this site, I weigh a short set of options and pick one. Design decisions don't get made by default.",
          },
          {
            icon: "ShieldCheck",
            actor: "Checks",
            title: "Prove it works",
            description:
              "Format, lint and type checks, real production builds, workflow linting, screenshots at phone and desktop widths, and the whole platform run locally in Docker. “It parses” doesn't count as done.",
          },
          {
            icon: "GitPullRequest",
            actor: "Me",
            title: "Review, commit and approve",
            description:
              "I read every change, commit it myself, and approve each production deploy in GitHub. Nothing ships on its own.",
          },
        ],
      },
      {
        blockType: "cardGrid",
        anchor: "practices",
        title: "What makes it work",
        columns: "3",
        items: [
          {
            icon: "ScrollText",
            title: "House rules in every repo",
            description:
              "Each repo documents its version pins and why, where content lives, the styling rules, how CI and deploys work, and hard lines such as never printing a token, so every change starts from the same rules.",
          },
          {
            icon: "Eye",
            title: "Checked against the source",
            description:
              "Instructions are checked against the current docs at the exact version I run (Coolify's, for example), and files are re-read rather than trusting old notes.",
          },
          {
            icon: "LockKeyhole",
            title: "Secrets stay with me",
            description:
              "Tokens and passwords are typed by me into GitHub or a local file that never gets printed. Production secrets sit behind an approval-gated environment, so nothing deploys without me.",
          },
          {
            icon: "Wrench",
            title: "Tested where it runs",
            description:
              "The whole platform runs locally in Docker on my laptop, and pages are checked in a real browser at phone and desktop widths before anything goes live.",
          },
          {
            icon: "FileCode",
            title: "Guides you can follow",
            description:
              "Anything done by hand, like going live or switching email provider, gets a step-by-step guide: one step at a time, exact values, nothing assumed.",
          },
          {
            icon: "Code",
            title: "Decisions written down",
            description:
              "Lasting decisions (the GitHub organisation, the email addresses, the deploy rules) are recorded, so later work picks up from what's already settled.",
          },
        ],
      },
    ],
  },

  // --- API reference -------------------------------------------------------------------------
  {
    path: "/api-reference",
    title: "API reference",
    navLabel: "API reference",
    cardLabel: "API",
    icon: "BookOpen",
    summary: "Every endpoint of the API, generated from the OpenAPI document the live API serves.",
    meta: {
      title: "API reference",
      description:
        "Browse the API, the general-use .NET API the User Directory runs on: every endpoint, parameter, response and schema, generated from the OpenAPI document the live API serves.",
    },
    intro: {
      eyebrow: "API",
      text: "The API is a general-use REST API on PostgreSQL. For now it serves one feature, the users behind the User Directory, and more will run on it. This reference is generated from the OpenAPI document the running API publishes, so it always describes the version that is live.",
      actions: [
        button("Open the interactive docs", to.project("API", "docs"), { icon: "ArrowUpRight" }),
        button("OpenAPI document", to.apiSpec(), {
          style: "secondary",
          icon: "FileBraces",
          iconPosition: "start",
        }),
        button("Source code", to.project("API", "source", { newTab: true }), {
          style: "secondary",
          icon: "Code",
          iconPosition: "start",
        }),
      ],
    },
    layout: [
      {
        blockType: "apiReference",
        project: { $project: "API" },
        specPath: "/openapi/v1.json",
        points: [
          {
            icon: "Braces",
            title: "One source of truth",
            description:
              "The OpenAPI document comes straight from the deployed API, not a copy kept in this site. When the API changes, this page changes with it.",
          },
          {
            icon: "Eye",
            title: "Browse-only",
            description:
              "Explore endpoints, parameters, responses and schemas, and copy example requests in several languages. Sending requests from this page is turned off.",
          },
          {
            icon: "Palette",
            title: "Same design system",
            description:
              "Scalar renders the reference, themed with the shared palette and fonts, so it follows your light or dark choice like the rest of the site.",
          },
        ],
        loading: "Loading the reference…",
        facts: {
          version: "Version",
          endpoints: "Endpoints",
          groups: "Groups",
          authentication: "Authentication",
        },
        authNames: wordingDefaults(AUTH_NAMES),
        unavailable: {
          title: "The reference isn't available right now",
          description: "It appears here automatically as soon as the API is online.",
        },
      },
    ],
  },

  // --- Legal ---------------------------------------------------------------------------------
  {
    path: "/privacy",
    pageType: "legal",
    title: "Privacy notice",
    navLabel: "Privacy",
    meta: {
      title: "Privacy notice",
      description: `How ${NAME}'s sites collect and use personal data, and your rights.`,
    },
    intro: {
      eyebrow: "Last updated",
      updated: PRIVACY_UPDATED,
      text: `This notice applies to all sites operated by ${NAME}: this site, the User Directory, TheBensage API, the component library (Storybook), the sign-in service and the monitoring dashboards. They are a personal portfolio operated by an individual in the UK, who is the controller of the personal data described below. Contact: ${EMAIL}.`,
    },
    layout: [
      {
        blockType: "textSection",
        heading: "Data collected",
        body: richText([
          [
            "**Server logs:** IP address, browser details, the page requested and the time. Kept for 14 days to keep the sites secure and running (legitimate interests).",
            "**Monitoring:** uptime, response times and server load. Kept for 30 days. Contains no personal data.",
            "**Accounts:** if you request access or accept an invite, the sign-in service (authentik) stores your name, email address, username, the reason given for your request, your password (as a secure hash), any passkey or two-factor method, and a log of sign-ins with IP address and browser, kept for up to 12 months. This is necessary to provide the access you requested. Your email address is used only to confirm and decide on your request. Accounts are deleted when a request is refused, when access ends, or on request.",
            "**CMS:** for the people who edit these sites, their name, email address and role, copied from the sign-in service when they sign in, and which changes they made. Removed with their account.",
            "**User Directory and TheBensage API:** anything you enter. It is a demo: enter fictitious details only. Entries may be edited, removed or reset at any time. Each change is recorded with its time and the name of the signed-in account that made it.",
            "**Email:** your address and message, kept only as long as needed to respond.",
          ],
          "Personal data is not sold, used for marketing or used for automated decision-making.",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Cookies",
        anchor: "cookies",
        body: richText([
          "The sites use only cookies that are strictly necessary or that store a setting you chose. No analytics, advertising or third-party tracking cookies are used, so no consent is required.",
          [
            "**Sign-in:** session cookies set by the User Directory (`ud_session`, `ud_login`, and `ud_sso_checked`, which remembers for a few minutes that you aren't signed in), this site (`pf_session`, `pf_login` and `pf_sso_checked`, the same jobs for the main site's sign-in, plus `pf_returning`, kept for one year after you sign in so the site only checks for an existing sign-in in browsers that have used it), the CMS (`cms_session` and `cms_login`, for its editors), the sign-in service and the monitoring dashboards while you are signed in. Editors previewing unpublished changes also get `__prerender_bypass` on the sites until they leave the preview.",
            "**Preferences:** your light or dark theme (`theme`), the three brand colours you picked on the main site (`colours`, one value such as `teal.sky.mint`) and the User Directory's card or table view (`view`), kept for one year. The theme and colours are shared between the main site and its subdomains (the User Directory and the component library), so your choice applies on each site.",
            "**Cookie notice:** records that you dismissed the cookie notice (`cookie-notice`), kept for one year.",
          ],
          "You can delete or block cookies in your browser settings. Blocking sign-in cookies prevents signing in.",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Service providers",
        body: richText([
          [
            "**IONOS:** hosts the server.",
            "**Cloudflare:** provides DNS for the domain and forwards email sent to its addresses.",
            "**SMTP2GO:** sends the sites' emails, such as sign-in access requests and approvals.",
            "**Google (Gmail):** stores email correspondence.",
          ],
          "Where a provider processes data outside the UK, the transfer is protected by safeguards recognised under UK data protection law.",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Your rights",
        body: richText([
          "You have the right to access, correct or delete your personal data, to restrict or object to its processing, and to receive it in a portable format. To exercise these rights, email the address above. Requests are answered within one month.",
          "You may also [lodge a complaint with the Information Commissioner's Office](https://ico.org.uk/make-a-complaint/).",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Changes",
        body: richText([
          "This notice may be updated. The date at the top shows the latest version.",
        ]),
      },
    ],
  },
  {
    path: "/terms",
    pageType: "legal",
    title: "Terms of use",
    navLabel: "Terms",
    meta: { title: "Terms of use", description: `Terms for using ${NAME}'s sites.` },
    intro: {
      eyebrow: "Last updated",
      updated: TERMS_UPDATED,
      text: `These terms apply to all sites operated by ${NAME}. By using the sites you accept these terms. If you do not accept them, do not use the sites.`,
    },
    layout: [
      {
        blockType: "textSection",
        heading: "Service",
        body: richText([
          "The sites are a personal portfolio and demonstrations, provided free of charge and as is. No guarantee is given that they are accurate, complete or available. They may be changed, reset or withdrawn at any time, and demo data may be deleted without notice.",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Accounts and acceptable use",
        body: richText([
          [
            "Accounts, access requests and invite links are personal and may be approved, refused or revoked at any time. Keep your credentials confidential.",
            "Enter fictitious details only. Do not add another person's personal data without their consent.",
            "Do not submit content that is unlawful, offensive or misleading, or that you do not have the right to share.",
            "Do not attempt to gain unauthorised access, bypass sign-in, overload or scrape the sites.",
          ],
          "Content or accounts that breach these terms may be removed without notice.",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Liability",
        body: richText([
          "To the extent permitted by law, no liability is accepted for any loss or damage arising from use of the sites or reliance on their content. Nothing in these terms limits liability that cannot be limited by law, including for death or personal injury caused by negligence, or for fraud.",
        ]),
      },
      {
        blockType: "textSection",
        heading: "Intellectual property",
        body: richText([
          `Site content is © ${NAME}. Source code published on GitHub is licensed under the terms in its repository. Third-party names and logos belong to their owners.`,
        ]),
      },
      {
        blockType: "textSection",
        heading: "Governing law",
        body: richText([
          `These terms are governed by the law of Scotland, and the Scottish courts have jurisdiction. If you live elsewhere in the UK, you keep the protection of your local law and may bring proceedings in your local courts. Questions: ${EMAIL}.`,
        ]),
      },
    ],
  },
];
