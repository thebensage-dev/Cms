import Link from "next/link";
import type { Payload } from "payload";
import { siteAddress } from "@/collections/Sites";
import type { Page, Site } from "@/payload-types";

const box: React.CSSProperties = {
  border: "1px solid var(--theme-elevation-150)",
  borderRadius: "var(--style-radius-m)",
  padding: "1.25rem",
  background: "var(--theme-elevation-50)",
};
const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.4rem 0",
  borderTop: "1px solid var(--theme-elevation-100)",
  textDecoration: "none",
  color: "inherit",
};
const muted: React.CSSProperties = { color: "var(--theme-elevation-500)" };

/**
 * The dashboard's top: each site, where it's published, and its pages (unpublished changes
 * marked), so editing starts from the page you want; plus each site's settings.
 */
export default async function SiteOverview({ payload }: { payload: Payload }) {
  const [sites, pages] = await Promise.all([
    payload.find({ collection: "sites", depth: 0, limit: 0, sort: "label" }),
    payload.find({
      collection: "pages",
      draft: true,
      depth: 0,
      limit: 0,
      sort: "path",
      select: { title: true, path: true, site: true, _status: true },
    }),
  ]);
  const all = pages.docs as Pick<Page, "id" | "title" | "path" | "site" | "_status">[];

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Your sites</h2>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Open a page to edit its blocks; the eye button shows it beside you as you type. The site
        switcher in the menu picks which site new pages are for.
      </p>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
        }}
      >
        {(sites.docs as Site[]).map((site) => {
          const base = siteAddress(site);
          return (
            <div key={site.id} style={box}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{site.label}</h3>
                  {base && <span style={muted}>{base.replace(/^https?:\/\//, "")}</span>}
                </div>
                <Link href={`/admin/collections/sites/${site.id}`}>Site settings</Link>
              </div>
              <div style={{ marginTop: "0.75rem" }}>
                {all
                  .filter((page) => page.site === site.id)
                  .map((page) => (
                    <Link key={page.id} href={`/admin/collections/pages/${page.id}`} style={row}>
                      <span>{page.title}</span>
                      <span style={muted}>
                        {page.path}
                        {page._status === "draft" ? " · unpublished changes" : ""}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
