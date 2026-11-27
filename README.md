# CMS

The content of both sites in [Payload](https://payloadcms.com) 3 (Next.js 16, PostgreSQL), at `cms.<domain>`: every page, built from blocks, plus images, projects and each site's header, footer and wording. Editors sign in through authentik and edit with the page beside them (Live Preview). The sites read the published content over Payload's REST API, through the `@thebensage-dev/cms-client` package in `clients/typescript`, and keep working from their last copy if the CMS is down.

How the repos fit together, and the local stack that runs them all, are in [Infrastructure's README](https://github.com/thebensage-dev/Infrastructure).

## Editing

`cms.<domain>` opens the admin. The dashboard lists each site's pages; the **site switcher** at the top of the menu picks which site the page list and new pages are for. In a page, the eye button opens **Live Preview** (the page itself, redrawn as you type, at phone, tablet or desktop width), and **Add Block** opens a picker grouped by kind, with a thumbnail of each block. Button text and screen-reader labels sit on each block's **Labels** tab, already filled in. Pages have drafts and versions; the sites only show published pages.

## The content model

- **Sites** (`src/collections/Sites.ts`): one record per site (Payload's multi-tenant plugin), holding its name, which front end shows it (`portfolio` or `user-directory`) and what every page shares: header, footer, labels, the preview bar and the not-found page. The User Directory's also has the Directory tab (its form, dialogs and access messages).
- **Pages** (`src/collections/Pages.ts`): belong to a site, with a path (`[id]` matches any value, so `/users/[id]` is every profile), a width and a list of blocks, top included.
- **Blocks** (`src/blocks/`, one file each, grouped in `src/blocks/index.ts`): page tops, general blocks for new pages (text, image, image and text, columns, buttons), sections shared by both sites, and each site's own (Portfolio's hero, projects, platform map, stack…; the User Directory's directory and profile). A page only offers the blocks its site can draw.
- **Images**, **Projects** (shared by both sites) and **Accounts** (CMS sign-ins, created on first sign-in).
- **Links** pick what they point to (a page, a project, request access, the main site…), and the sites work out the address per environment, so content never holds a domain. **Icons** come from SharedUI's icon list, so the picker and the sites always agree.
- **Seed** (`src/seed/`): the content both sites launched with, screenshots included (`seed-media/`), added to an empty database when `SEED_CONTENT=true`.

## Sign-in

The login page has one button: authentik (client `cms`) signs you in and your groups give your role: **editor** for `cms-editors` or `authentik Admins`, **viewer** for `cms-viewers` (sees everything, changes nothing). Anyone else is turned away by authentik. Payload's own passwords are off. To add someone: authentik > Directory > Groups > `cms-editors` or `cms-viewers`. People can ask for read-only access on authentik's Request access page.

## Running it

Needs Node 26 (`.nvmrc`), a `.npmrc` with a `read:packages` token (copy `.npmrc.example`) and PostgreSQL 18 (`.env.example` has a one-line Docker command).

```bash
npm ci
cp .env.example .env.local   # fill in PAYLOAD_SECRET (and the sign-in values to sign in)
npm run dev                  # http://localhost:3003/admin
npm run check                # format check, lint, typecheck, tests
```

Signing in needs authentik, so the easy way to use the admin locally is the whole stack (`../Infrastructure/local/compose.yaml`, http://cms.localhost:8080, signing in as `akadmin`).

## Changing the content model

1. Change the collection, block or field (a new block also needs a thumbnail: `node scripts/block-thumbnails.mjs`).
2. `npm run generate` (types and import map; CI fails when they're stale).
3. `npm run migrate:create <name>` (migrations run on start in production).
4. In `clients/typescript`: `npm run generate`, bump `version`; then update the sites and draw the new block there.

## Deploying

CI checks, builds `ghcr.io/thebensage-dev/cms` and, after approval, deploys it (the same pipeline as every repo; Infrastructure's README, "Deploying"). The `CMS client` workflow publishes `@thebensage-dev/cms-client` when its version changes. Every setting is derived from `DOMAIN` and `PLATFORM_SECRET`.

Coolify app: **Docker Compose** named `cms`, this repo, `compose.yaml`, domain of the `cms` service `https://cms.<domain>:3000`, auto deploy off. Coolify generates the database password (`SERVICE_PASSWORD_64_CMSDB`). Set the repo variable `SEED_CONTENT=true` for the first deploy only. Back up the `cms_db` (content) and `cms_media` (images) volumes, and never rename them.
