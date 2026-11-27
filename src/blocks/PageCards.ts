import type { Block } from "payload";
import { pagesField } from "@/blocks/fields";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** Cards linking to other pages. */
export const PageCards: Block = {
  slug: "pageCards",
  dbName: "pb_cards",
  interfaceName: "PageCardsBlock",
  labels: { singular: "Page cards", plural: "Page cards" },
  fields: [
    anchorField(),
    ...sectionHeading(),
    pagesField(),
    text("readMore", { required: true, defaultValue: "Read more" }),
  ],
};
