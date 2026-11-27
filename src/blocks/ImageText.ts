import type { Block } from "payload";
import { actionsField, anchorField, text } from "@/fields/common";
import { formattedText } from "@/fields/richText";

/** An image beside a heading, formatted text and buttons (stacked on phones). */
export const ImageText: Block = {
  slug: "imageText",
  dbName: "pb_imgtxt",
  interfaceName: "ImageTextBlock",
  labels: { singular: "Image and text", plural: "Images and text" },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: { width: "70%" },
        },
        {
          name: "imageSide",
          label: "Image on the",
          type: "select",
          defaultValue: "left",
          options: [
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ],
          admin: { width: "30%" },
        },
      ],
    },
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
