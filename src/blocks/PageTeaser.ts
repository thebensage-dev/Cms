import type { Block } from "payload";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** A short list of the cards of another page's first card grid, linking to that page. */
export const PageTeaser: Block = {
  slug: "pageTeaser",
  dbName: "pb_teaser",
  interfaceName: "PageTeaserBlock",
  labels: { singular: "Page teaser", plural: "Page teasers" },
  fields: [
    anchorField(),
    ...sectionHeading({ eyebrow: true }),
    {
      name: "page",
      type: "relationship",
      relationTo: "pages",
      required: true,
      admin: { description: "Shows the icons and titles of this page's first card grid." },
    },
    text("linkLabel", { required: true }),
  ],
};
