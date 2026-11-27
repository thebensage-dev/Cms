import assert from "node:assert/strict";
import { test } from "node:test";
import { previewQuery, resolveLink, verifyPreviewToken, type SiteContent } from "../src/index.ts";

const content = {
  site: "portfolio",
  pages: [
    { id: 1, path: "/", title: "Home" },
    { id: 2, path: "/api-reference", title: "API reference" },
  ],
  projects: [
    { id: 7, title: "API", source: "https://github.com/x/Api", page: 2 },
    { id: 8, title: "Shared UI", source: "https://github.com/x/SharedUI" },
  ],
  settings: { email: "hello@example.test" },
  fetchedAt: "test",
} as unknown as SiteContent;

const resolvers = {
  projectUrl: (project: { id: number }) =>
    project.id === 7 ? "https://api.example.test/" : "https://ui.example.test",
  requestAccess: () => "https://id.example.test/if/flow/request-access/?app=portfolio",
  status: () => undefined,
  mainSite: () => "https://example.test/",
};

const href = (link: Record<string, unknown>) => resolveLink(content, link, resolvers)?.href ?? null;

test("resolves each link type the CMS offers", () => {
  assert.equal(href({ type: "page", page: 2, anchor: "spec" }), "/api-reference#spec");
  assert.equal(href({ type: "url", url: "/#projects" }), "/#projects");
  assert.equal(href({ type: "email" }), "mailto:hello@example.test");
  assert.equal(href({ type: "project", project: 7 }), "/api-reference");
  assert.equal(href({ type: "project", project: 8 }), "https://ui.example.test");
  assert.equal(
    href({ type: "project", project: 7, projectTarget: "app" }),
    "https://api.example.test/",
  );
  assert.equal(
    href({ type: "project", project: 7, projectTarget: "docs" }),
    "https://api.example.test/docs/",
  );
  assert.equal(
    href({ type: "project", project: 7, projectTarget: "source" }),
    "https://github.com/x/Api",
  );
  assert.match(href({ type: "requestAccess" }) ?? "", /request-access/);
  assert.equal(
    href({ type: "mainSite", url: "/privacy#cookies" }),
    "https://example.test/privacy#cookies",
  );
});

test("leaves out links that can't go anywhere here", () => {
  assert.equal(href({ type: "status" }), null);
  assert.equal(href({ type: "apiSpec" }), null);
  assert.equal(href({ type: "page", page: 99 }), null);
  assert.equal(href({ type: "project", project: 99 }), null);
  assert.equal(resolveLink(content, null), null);
  assert.equal(resolveLink(content, { type: "requestAccess" }), null);
});

test("marks new-tab links external and site paths internal, and keeps downloads", () => {
  assert.deepEqual(resolveLink(content, { type: "url", url: "https://x.test", newTab: true }), {
    href: "https://x.test",
    external: true,
    internal: false,
  });
  assert.deepEqual(resolveLink(content, { type: "url", url: "/cv.pdf", download: "CV.pdf" }), {
    href: "/cv.pdf",
    external: false,
    internal: true,
    download: "CV.pdf",
  });
});

test("preview links open only the signed path, only until they expire", () => {
  const now = Date.UTC(2026, 10, 27, 9, 0);
  const query = new URLSearchParams(previewQuery("s3cret", "/platform", now));
  assert.equal(verifyPreviewToken("s3cret", query, now), "/platform");
  assert.equal(verifyPreviewToken("other", query, now), null);
  assert.equal(verifyPreviewToken("s3cret", query, now + 31 * 60_000), null);

  const tampered = new URLSearchParams(query);
  tampered.set("path", "/terms");
  assert.equal(verifyPreviewToken("s3cret", tampered, now), null);

  const offSite = new URLSearchParams(previewQuery("s3cret", "//evil.test", now));
  assert.equal(verifyPreviewToken("s3cret", offSite, now), null);
});
