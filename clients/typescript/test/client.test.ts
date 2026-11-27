import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CmsUnavailableError,
  createCmsClient,
  crumbsFor,
  longDate,
  mediaImage,
  securityPolicy,
  findPage,
  pageById,
  projectById,
  type SiteContent,
} from "../src/index.ts";

const page = (id: number, path: string) => ({ id, path, title: `Page ${id}` });

/** A fake CMS: answers the four requests the client makes, counting them, or fails on demand. */
function fakeCms() {
  const state = { requests: [] as string[], down: false, title: "Home" };
  const fetch = async (input: string | URL | Request) => {
    const url = String(input);
    state.requests.push(url);
    if (state.down) throw new TypeError("fetch failed");
    const body = url.includes("/api/pages")
      ? { docs: [{ ...page(1, "/"), title: state.title }, page(2, "/skills")] }
      : url.includes("/api/projects")
        ? { docs: [{ id: 7, title: "API" }] }
        : url.includes("/api/media")
          ? { docs: [] }
          : { docs: [{ name: "TheBensage", slug: "portfolio" }] };
    return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
  };
  return { state, fetch: fetch as typeof globalThis.fetch };
}

const snapshot = {
  site: "portfolio",
  pages: [page(1, "/")],
  projects: [],
  settings: { name: "From the snapshot" },
  fetchedAt: "snapshot",
} as unknown as SiteContent<"portfolio">;

test("fetches the site once, then answers from memory while fresh", async () => {
  const { state, fetch } = fakeCms();
  const cms = createCmsClient({ baseUrl: "http://cms.test/", site: "portfolio", fetch });

  const first = await cms.content();
  assert.equal(first.source, "live");
  assert.equal(first.pages.length, 2);
  assert.equal((await cms.page("/skills/"))?.id, 2);
  assert.equal(await cms.page("/missing"), null);
  assert.equal(state.requests.length, 4);
  assert.ok(state.requests.some((url) => url.startsWith("http://cms.test/api/pages?")));
  assert.ok(state.requests.some((url) => url.includes("where[site.slug][equals]=portfolio")));
  assert.ok(state.requests.some((url) => url.includes("/api/sites?where[slug][equals]=portfolio")));
});

test("serves a stale copy at once and refreshes it in the background", async () => {
  const { state, fetch } = fakeCms();
  const cms = createCmsClient({
    baseUrl: "http://cms.test",
    site: "portfolio",
    fetch,
    ttlSeconds: 0,
  });

  await cms.content();
  state.title = "Edited";
  const stale = await cms.content();
  assert.equal(stale.source, "cache");
  assert.equal(stale.pages[0]?.title, "Home");
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal((await cms.content()).pages[0]?.title, "Edited");
});

test("keeps the last good copy while the CMS is down", async () => {
  const { state, fetch } = fakeCms();
  const errors: unknown[] = [];
  const cms = createCmsClient({
    baseUrl: "http://cms.test",
    site: "portfolio",
    fetch,
    ttlSeconds: 0,
    onError: (error) => errors.push(error),
  });

  await cms.content();
  state.down = true;
  const during = await cms.content();
  await new Promise((resolve) => setTimeout(resolve, 10));
  const after = await cms.content();
  assert.equal(during.pages.length, 2);
  assert.equal(after.pages.length, 2);
  assert.ok(errors.length >= 1);
});

test("falls back on the snapshot when the CMS is down from the start", async () => {
  const { state, fetch } = fakeCms();
  state.down = true;
  const cms = createCmsClient({
    baseUrl: "http://cms.test",
    site: "portfolio",
    fetch,
    snapshot,
    onError: () => {},
  });

  const content = await cms.content();
  assert.equal(content.source, "snapshot");
  assert.equal(content.settings.name, "From the snapshot");

  // The next request answers from the snapshot at once, while one fetch retries behind it...
  const before = state.requests.length;
  assert.equal((await cms.content()).source, "snapshot");
  assert.equal(state.requests.length, before + 4);
  // ...and once the CMS is back, the live content replaces it.
  state.down = false;
  await new Promise((resolve) => setTimeout(resolve, 10));
  await cms.content();
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal((await cms.content()).source, "cache");
  assert.equal((await cms.content()).pages.length, 2);
});

test("throws CmsUnavailableError with neither the CMS nor a snapshot", async () => {
  const { state, fetch } = fakeCms();
  state.down = true;
  const cms = createCmsClient({
    baseUrl: "http://cms.test",
    site: "portfolio",
    fetch,
    onError: () => {},
  });
  await assert.rejects(cms.content(), CmsUnavailableError);
});

test("an HTTP error counts as the CMS being down", async () => {
  const fetch = (async () => new Response("nope", { status: 502 })) as typeof globalThis.fetch;
  const cms = createCmsClient({
    baseUrl: "http://cms.test",
    site: "user-directory",
    fetch,
    snapshot: snapshot as unknown as SiteContent<"user-directory">,
    onError: () => {},
  });
  assert.equal((await cms.content()).source, "snapshot");
});

test("lets a framework's own errors through instead of falling back", async () => {
  class FrameworkSignal extends Error {}
  const fetch = (async () => {
    throw new FrameworkSignal("dynamic usage");
  }) as typeof globalThis.fetch;
  const errors: unknown[] = [];
  const cms = createCmsClient({
    baseUrl: "http://cms.test",
    site: "portfolio",
    fetch,
    snapshot,
    onError: (error) => errors.push(error),
    rethrow: (error) => {
      if (error instanceof FrameworkSignal) throw error;
    },
  });
  await assert.rejects(cms.content(), FrameworkSignal);
  assert.equal(errors.length, 0);
});

test("looks up related pages and projects by id or document", () => {
  const content = {
    pages: [page(1, "/"), page(2, "/skills")],
    projects: [{ id: 7, title: "API" }],
  };
  const typed = content as unknown as SiteContent;
  assert.equal(pageById(typed, 2)?.path, "/skills");
  assert.equal(pageById(typed, typed.pages[0])?.path, "/");
  assert.equal(pageById(typed, null), undefined);
  assert.equal(projectById(typed, 7)?.title, "API");
  assert.equal(findPage(typed, "/")?.id, 1);
});

test("matches [name] segments and fills placeholders", async () => {
  const { matchPage, fill } = await import("../src/index.ts");
  const content = {
    pages: [page(1, "/users"), page(2, "/users/[id]"), page(3, "/users/new")],
  } as unknown as SiteContent;
  assert.equal(matchPage(content, "/users")?.page.id, 1);
  assert.equal(matchPage(content, "/users/new")?.page.id, 3, "an exact path wins");
  assert.deepEqual(matchPage(content, "/users/42/"), {
    page: content.pages[1],
    params: { id: "42" },
  });
  assert.equal(matchPage(content, "/users/42/edit"), null);
  assert.equal(fill("Show {count} users of {total}", { count: 3 }), "Show 3 users of {total}");
});

test("crumbsFor starts at the homepage and follows the nested pages; longDate reads as words", () => {
  const content = {
    pages: [
      { ...page(1, "/"), navLabel: "Home" },
      { ...page(2, "/platform"), navLabel: "Platform" },
    ],
  } as unknown as SiteContent;
  const child = {
    ...page(3, "/platform/sign-in"),
    breadcrumbs: [
      { label: "Platform", url: "/platform" },
      { label: "Sign-in", url: "/platform/sign-in" },
    ],
  } as unknown as SiteContent["pages"][number];
  assert.deepEqual(crumbsFor(content, child), [
    { label: "Home", path: "/" },
    { label: "Platform", path: "/platform" },
    { label: "Sign-in", path: "/platform/sign-in" },
  ]);
  assert.equal(longDate("2026-11-25T00:00:00.000Z"), "25 November 2026");
});

test("pages may be framed only by the CMS, and only while previewing", () => {
  assert.match(
    securityPolicy({ previewing: false, cmsUrl: "https://cms.example.com" }),
    /frame-ancestors 'none';/,
  );
  assert.match(
    securityPolicy({ previewing: true, cmsUrl: "https://cms.example.com/admin" }),
    /frame-ancestors 'self' https:\/\/cms\.example\.com;/,
  );
  assert.match(
    securityPolicy({ previewing: true, cmsUrl: "not a url" }),
    /frame-ancestors 'none';/,
  );
});

test("mediaImage finds an upload by id and puts its file on the CMS's public address", () => {
  const content = {
    media: [{ id: 4, url: "/api/media/file/a.png", alt: "A", width: 10, height: 5 }],
  } as unknown as SiteContent;
  assert.deepEqual(mediaImage(content, 4, "https://cms.example.com/"), {
    src: "https://cms.example.com/api/media/file/a.png",
    alt: "A",
    width: 10,
    height: 5,
  });
  assert.equal(mediaImage(content, 9, "https://cms.example.com"), null);
  assert.equal(mediaImage({}, null, "https://cms.example.com"), null);
});

test("mediaImage puts an absolute file address on the public CMS address given", () => {
  const content = {
    media: [{ id: 1, url: "http://cms.localhost:8080/api/media/file/b.png", alt: "B" }],
  } as unknown as SiteContent;
  assert.equal(
    mediaImage(content, 1, "https://cms.example.com")?.src,
    "https://cms.example.com/api/media/file/b.png",
  );
});
