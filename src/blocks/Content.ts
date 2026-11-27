import type { Block } from "payload";
import { actionsField, anchorField, text } from "@/fields/common";
import { formattedText } from "@/fields/richText";

/** The general-purpose section: an optional eyebrow and heading, formatted text and buttons. */
export const Content: Block = {
  slug: "content",
  dbName: "pb_text",
  interfaceName: "ContentBlock",
  labels: { singular: "Text", plural: "Texts" },
  fields: [
    {
      type: "row",
      fields: [
        text("eyebrow", { admin: { width: "50%" } }),
        text("heading", { admin: { width: "50%" } }),
      ],
    },
    formattedText("body", { required: true }),
    actionsField(),
    { ...anchorField(), required: false, admin: { description: "Optional: links here as #id." } },
  ],
};
