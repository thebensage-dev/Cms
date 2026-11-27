import type { Block } from "payload";
import { text } from "@/fields/common";

/** One image, with an optional caption. */
export const Image: Block = {
  slug: "image",
  dbName: "pb_img",
  interfaceName: "ImageBlock",
  labels: { singular: "Image", plural: "Images" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    {
      type: "row",
      fields: [
        text("caption", { admin: { width: "70%" } }),
        {
          name: "size",
          type: "select",
          defaultValue: "column",
          options: [
            { value: "column", label: "Column width" },
            { value: "small", label: "Small, centred" },
          ],
          admin: { width: "30%" },
        },
      ],
    },
  ],
};
