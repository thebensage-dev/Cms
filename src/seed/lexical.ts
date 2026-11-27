// Builds Lexical rich text (what Payload's richText fields store) from the short markup the sites'
// legal text used before the CMS: a paragraph is a string, a bulleted list is a string array;
// `**Lead:**` at the start is bold, `[text](https://…)` a link and backticks inline code.

type Node = Record<string, unknown>;

const BOLD = 1;
const CODE = 16;

const textNode = (text: string, format = 0): Node => ({
  type: "text",
  text,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const element = (type: string, children: Node[], extra: Node = {}): Node => ({
  type,
  children,
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  ...extra,
});

/** Links and inline code in a run of text. */
function inline(text: string, format = 0): Node[] {
  return text
    .split(/(\[[^\]]+\]\(https:\/\/[^)]+\)|`[^`]+`)/)
    .filter(Boolean)
    .map((part) => {
      const link = /^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/.exec(part);
      if (link) {
        return element("link", [textNode(link[1], format)], {
          version: 3,
          fields: { linkType: "custom", url: link[2], newTab: false },
        });
      }
      if (/^`[^`]+`$/.test(part)) return textNode(part.slice(1, -1), format | CODE);
      return textNode(part, format);
    });
}

/** "**Lead:** rest" with the lead in bold. */
function withLead(text: string): Node[] {
  const match = /^\*\*(.+?)\*\*\s*(.*)$/.exec(text);
  if (!match) return inline(text);
  return [textNode(match[1], BOLD), ...inline(` ${match[2]}`)];
}

export type Markup = string | string[];

export function richText(blocks: Markup[]) {
  const children = blocks.map((block) =>
    typeof block === "string"
      ? element("paragraph", inline(block), { textFormat: 0, textStyle: "" })
      : element(
          "list",
          block.map((item, i) => element("listitem", withLead(item), { value: i + 1 })),
          { listType: "bullet", start: 1, tag: "ul" },
        ),
  );
  return { root: element("root", children) };
}
