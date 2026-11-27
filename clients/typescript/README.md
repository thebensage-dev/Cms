# @thebensage-dev/cms-client

A typed, cached reader for TheBensage CMS (the Cms repo, Payload). Its types are copied from the CMS's generated `src/payload-types.ts`, so every page, block, project and setting is typed as the CMS defines it. No dependencies.

## Install

It's on GitHub Packages, like `@thebensage-dev/ui`. A project's `.npmrc` (gitignored) needs a token with `read:packages`.

```powershell
npm install @thebensage-dev/cms-client
```

## Use (on the server)

```ts
import { createCmsClient, pageById } from "@thebensage-dev/cms-client";
import snapshot from "./cms-snapshot.json";

const cms = createCmsClient({
  baseUrl: process.env.CMS_URL!, // where this server reaches the CMS
  site: "portfolio", // or "user-directory"
  snapshot, // used while the CMS has never been reached
});

const content = await cms.content(); // pages, projects, settings, and where they came from
const page = await cms.page("/platform/email");
const parent = pageById(content, page?.parent);
```

- **Fresh:** the whole site is fetched in three requests (published pages, projects, the site's settings, all at depth 0) and kept for `ttlSeconds` (60).
- **Stale:** after that, the copy is served at once while a new one loads in the background.
- **Down:** a failed or slow (`timeoutMs`, 3 s) fetch never replaces a good copy. With no copy yet, the `snapshot` is served; without one, `content()` throws `CmsUnavailableError`.

`content().source` says which it was (`live`, `cache` or `snapshot`). Relationships come back as ids: resolve them with `pageById` and `projectById`.

## Snapshots

```powershell
npx cms-snapshot --site portfolio --out src/content/cms-snapshot.json
```

reads `--url`, `CMS_URL` or the CMS's dev server (`http://localhost:3003`), and refuses to write anything that didn't come from the CMS.

## When the CMS's content model changes

1. In the repo root: `npm run generate`.
2. Here: `npm run generate` (rewrites `src/types.ts`), `npm run check`, bump `version` and commit. The `CMS client` workflow publishes it.
