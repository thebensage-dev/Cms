import type { Block } from "payload";
import { pagesField, rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** The homepage's look at the platform: highlights, page cards and a link. */
export const PlatformTeaser: Block = {
  slug: "platformTeaser",
  dbName: "pb_pteaser",
  interfaceName: "PlatformTeaserBlock",
  labels: { singular: "Platform teaser", plural: "Platform teasers" },
  fields: [
    anchorField("platform"),
    ...sectionHeading({ eyebrow: true }),
    {
      name: "highlights",
      type: "array",
      maxRows: 4,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        {
          type: "row",
          fields: [
            text("value", { required: true, admin: { width: "25%" } }),
            text("label", { required: true, admin: { width: "75%" } }),
          ],
        },
      ],
    },
    pagesField(),
    text("readMore", {
      label: "Link on each card",
      required: true,
      defaultValue: "Read more",
    }),
    text("linkLabel", { required: true }),
    {
      name: "linkPage",
      type: "relationship",
      relationTo: "pages",
      required: true,
      filterOptions: { "site.slug": { equals: "portfolio" } },
    },
  ],
};
