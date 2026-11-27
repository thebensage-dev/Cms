// Copies the CMS's types (src/payload-types.ts, written by `npm run generate` in the repo root
// from the Payload config) into src/types.ts, without Payload's module augmentation, so the
// client's types always match the collections, globals and blocks.
// `--check` only compares, and fails when the committed file is out of date (CI runs it).
import { readFileSync, writeFileSync } from "node:fs";
import { format, resolveConfig } from "prettier";

const check = process.argv.includes("--check");
const source = readFileSync(new URL("../../../src/payload-types.ts", import.meta.url), "utf8");

const header =
  "// Generated from the CMS's src/payload-types.ts by `npm run generate`. Don't edit: change the\n" +
  "// Payload config, run `npm run generate` in the repo root, then here.\n\n";
const body = source
  .replace(/^\/\* tslint:disable \*\/\n\/\* eslint-disable \*\/\n/, "")
  .replace(/\ndeclare module "payload" \{[\s\S]*?\n\}\n?$/, "\n");
const target = new URL("../src/types.ts", import.meta.url);
// Formatted as the repo formats it, so `npm run format:check` agrees with `--check` here.
const content = await format(header + body.trimStart(), {
  ...(await resolveConfig(target)),
  parser: "typescript",
});

if (check) {
  let current = "";
  try {
    current = readFileSync(target, "utf8");
  } catch {}
  if (current !== content) {
    console.error("src/types.ts is out of date: run `npm run generate` and commit it.");
    process.exit(1);
  }
} else {
  writeFileSync(target, content);
  console.log("Wrote src/types.ts");
}
