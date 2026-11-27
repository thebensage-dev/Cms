import type { Block } from "payload";
import { rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text, textarea } from "@/fields/common";
import { linkGroup } from "@/fields/link";

/** Note cards, each with a link. */
export const LinkCards: Block = {
  slug: "linkCards",
  dbName: "pb_lcards",
  interfaceName: "LinkCardsBlock",
  labels: { singular: "Link cards", plural: "Link cards" },
  fields: [
    anchorField(),
    ...sectionHeading(),
    {
      name: "items",
      type: "array",
      required: true,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        text("title", { required: true }),
        textarea("body", { required: true }),
        text("linkLabel", { required: true }),
        linkGroup(),
      ],
    },
  ],
};
