#!/usr/bin/env node
// Writes a site's content from the CMS to a JSON file, the snapshot the site falls back on while
// the CMS can't be reached:
//   cms-snapshot --site portfolio --url http://localhost:3003 --out src/content/cms-snapshot.json
// Without --url: CMS_URL, else the CMS's dev server (http://localhost:3003).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { parseArgs } from "node:util";
import { fetchSnapshot } from "../dist/index.js";

const { values } = parseArgs({
  options: { site: { type: "string" }, url: { type: "string" }, out: { type: "string" } },
});
const baseUrl = values.url ?? (process.env.CMS_URL || "http://localhost:3003");
if (!values.site || !baseUrl || !values.out) {
  console.error(
    "Usage: cms-snapshot --site <portfolio|user-directory> --url <CMS address> --out <file>",
  );
  process.exit(1);
}
const content = await fetchSnapshot({ baseUrl, site: values.site, timeoutMs: 15000 });
// Without fetchedAt churn: a snapshot only changes in git when the content does.
const { fetchedAt: _fetchedAt, ...stable } = content;
mkdirSync(dirname(values.out), { recursive: true });
writeFileSync(values.out, JSON.stringify({ ...stable, fetchedAt: "snapshot" }, null, 2) + "\n");
console.log(
  `Wrote ${values.out}: ${content.pages.length} pages, ${content.projects.length} projects.`,
);
