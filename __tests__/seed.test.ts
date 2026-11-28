import { describe, expect, it } from "vitest";
import { blocksFor } from "@/collections/Pages";
import { brandLogo } from "@/fields/brandLogo";
import { ICONS } from "@/fields/icon";
import { richText } from "@/seed/lexical";
import { portfolioPages, portfolioSettings, projects } from "@/seed/portfolio";
import { seedMedia } from "@/seed/media";
import { resolveRefs } from "@/seed/refs";
import { userDirectoryPages, userDirectorySettings } from "@/seed/userDirectory";

/** Every value under `key` anywhere in `value`. */
function collect(value: unknown, key: string, out: unknown[] = []): unknown[] {
  if (Array.isArray(value)) value.forEach((item) => collect(item, key, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === key) out.push(v);
      collect(v, key, out);
    }
  }
  return out;
}

const sites = [
  { site: "portfolio" as const, pages: portfolioPages, settings: portfolioSettings },
  { site: "user-directory" as const, pages: userDirectoryPages, settings: userDirectorySettings },
];

describe("the seed content", () => {
  it.each(sites)("uses only blocks $site renders", ({ site, pages }) => {
    for (const page of pages) {
      for (const block of page.layout) {
        expect(
          blocksFor(site === "user-directory" ? [site] : []),
          `${page.path}: ${block.blockType}`,
        ).toContain(block.blockType);
      }
    }
  });

  it.each(sites)("has one page per path on $site, parents first", ({ pages }) => {
    const paths = pages.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
    pages.forEach((page, i) => {
      if (page.parent) expect(paths.slice(0, i)).toContain(page.parent);
    });
  });

  it.each(sites)(
    "links only to pages, projects and images that exist ($site)",
    ({ pages, settings }) => {
      const ids = {
        pages: new Map(pages.map((page, i) => [page.path, i + 1])),
        projects: new Map(projects.map((project, i) => [project.title, i + 1])),
        media: new Map(seedMedia.map((image, i) => [image.name, i + 1])),
      };
      expect(() => resolveRefs([pages, settings], ids)).not.toThrow();
    },
  );

  it("links projects to main-site pages that exist", () => {
    const ids = {
      pages: new Map(portfolioPages.map((page, i) => [page.path, i + 1])),
      projects: new Map(),
    };
    expect(() => resolveRefs(projects, ids)).not.toThrow();
  });

  it("picks only icons the CMS offers", () => {
    const icons = collect(
      [portfolioPages, userDirectoryPages, sites.map((s) => s.settings)],
      "icon",
    )
      .concat(collect([portfolioPages, userDirectoryPages], "tagIcon"))
      .filter((name) => name !== undefined);
    for (const name of icons) expect(ICONS).toContain(name);
  });

  it("names only logos simple-icons has", () => {
    const logos = collect(portfolioPages, "logo").filter((slug) => slug !== undefined);
    expect(logos.length).toBeGreaterThan(20);
    for (const slug of logos) expect(brandLogo(String(slug)), String(slug)).toBeDefined();
  });
});

describe("rich text from the old legal markup", () => {
  it("turns a bold lead, a link and inline code into Lexical nodes", () => {
    const doc = richText([
      ["**Sign-in:** cookies such as `pf_session`."],
      "See [the ICO](https://ico.org.uk/) for more.",
    ]);
    const [list, paragraph] = doc.root.children as Record<string, unknown>[];
    expect(list).toMatchObject({ type: "list", listType: "bullet" });
    const item = (list.children as Record<string, unknown>[])[0];
    expect(item.children).toEqual([
      expect.objectContaining({ text: "Sign-in:", format: 1 }),
      expect.objectContaining({ text: " cookies such as ", format: 0 }),
      expect.objectContaining({ text: "pf_session", format: 16 }),
      expect.objectContaining({ text: ".", format: 0 }),
    ]);
    expect(paragraph.children).toContainEqual(
      expect.objectContaining({
        type: "link",
        fields: { linkType: "custom", url: "https://ico.org.uk/", newTab: false },
      }),
    );
  });
});
