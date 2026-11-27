import type { Block } from "payload";
import { rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text, textarea } from "@/fields/common";

/** Email addresses and the job of each. */
export const AddressCards: Block = {
  slug: "addressCards",
  dbName: "pb_addr",
  interfaceName: "AddressCardsBlock",
  labels: { singular: "Address cards", plural: "Address cards" },
  fields: [
    anchorField("addresses"),
    ...sectionHeading({ intro: false }),
    {
      name: "items",
      type: "array",
      required: true,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [text("address", { required: true }), textarea("job", { required: true })],
    },
  ],
};
