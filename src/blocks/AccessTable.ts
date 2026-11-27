import type { Block } from "payload";
import { rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** A table: app, group, what it unlocks (a card per row on phones). */
export const AccessTable: Block = {
  slug: "accessTable",
  dbName: "pb_access",
  interfaceName: "AccessTableBlock",
  labels: { singular: "Access table", plural: "Access tables" },
  fields: [
    anchorField("access"),
    ...sectionHeading(),
    {
      name: "columns",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            text("app", { required: true, admin: { width: "33%" } }),
            text("group", { required: true, admin: { width: "33%" } }),
            text("unlocks", { required: true, admin: { width: "33%" } }),
          ],
        },
      ],
    },
    {
      name: "rows",
      type: "array",
      required: true,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        text("app", { required: true }),
        text("group", { required: true, admin: { description: "Shown as code." } }),
        text("unlocks", { required: true }),
      ],
    },
  ],
};
