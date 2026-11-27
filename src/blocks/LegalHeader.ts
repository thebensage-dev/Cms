import type { Block } from "payload";
import { text, textarea } from "@/fields/common";

/** The top of a legal text (privacy notice, terms): the date it last changed, the heading and the
 *  opening paragraph. */
export const LegalHeader: Block = {
  slug: "legalHeader",
  dbName: "pb_lhead",
  interfaceName: "LegalHeaderBlock",
  labels: { singular: "Legal header", plural: "Legal headers" },
  fields: [
    {
      type: "row",
      fields: [
        text("updatedLabel", {
          label: "Before the date",
          required: true,
          defaultValue: "Last updated",
          admin: { width: "50%" },
        }),
        {
          name: "updated",
          label: "Last updated",
          type: "date",
          required: true,
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
            description: "Change it whenever the text changes.",
          },
        },
      ],
    },
    text("heading", { admin: { description: "Leave empty to use the page's title." } }),
    textarea("intro", { required: true }),
  ],
};
