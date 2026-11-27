import type { Block } from "payload";
import { rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** Each subdomain and what runs there. */
export const PlatformMap: Block = {
  slug: "platformMap",
  dbName: "pb_map",
  interfaceName: "PlatformMapBlock",
  labels: { singular: "Platform map", plural: "Platform maps" },
  fields: [
    anchorField("map"),
    ...sectionHeading(),
    {
      name: "apps",
      type: "array",
      required: true,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        {
          type: "row",
          fields: [
            text("host", { required: true, admin: { width: "33%" } }),
            text("name", { required: true, admin: { width: "33%" } }),
            text("detail", { required: true, admin: { width: "33%" } }),
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "address",
              label: "Links to",
              type: "select",
              defaultValue: "none",
              options: [
                { value: "none", label: "No link" },
                { value: "SITE_URL", label: "This site" },
                { value: "USER_DIRECTORY_URL", label: "The User Directory" },
                { value: "API_URL", label: "The API" },
                { value: "STORYBOOK_URL", label: "Storybook" },
                { value: "page", label: "A page on this site" },
              ],
              admin: { width: "50%" },
            },
            {
              name: "page",
              type: "relationship",
              relationTo: "pages",
              filterOptions: { "site.slug": { equals: "portfolio" } },
              admin: { width: "50%", condition: (_, sibling) => sibling?.address === "page" },
            },
          ],
        },
      ],
    },
  ],
};
