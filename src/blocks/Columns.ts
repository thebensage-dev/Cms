import type { Block } from "payload";
import { anchorField, sectionHeading, text } from "@/fields/common";
import { formattedText } from "@/fields/richText";
import { rowLabel } from "@/blocks/fields";

/** Two or three columns of text side by side (one under another on phones). */
export const Columns: Block = {
  slug: "columns",
  dbName: "pb_cols",
  interfaceName: "ColumnsBlock",
  labels: { singular: "Columns", plural: "Columns" },
  fields: [
    ...sectionHeading({ required: false }),
    {
      name: "columns",
      type: "array",
      minRows: 2,
      maxRows: 3,
      required: true,
      admin: { ...rowLabel },
      fields: [text("heading"), formattedText("body", { required: true })],
    },
    { ...anchorField(), required: false, admin: { description: "Optional: links here as #id." } },
  ],
};
