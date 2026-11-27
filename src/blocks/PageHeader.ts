import type { Block } from "payload";
import { actionsField, text, textarea } from "@/fields/common";

/** The top of an inner page: breadcrumbs, the brand rule, eyebrow, the page's heading, its intro
 *  and buttons. Usually the first block. */
export const PageHeader: Block = {
  slug: "pageHeader",
  dbName: "pb_phead",
  interfaceName: "PageHeaderBlock",
  labels: { singular: "Page header", plural: "Page headers" },
  fields: [
    {
      type: "row",
      fields: [
        text("eyebrow", { admin: { width: "50%" } }),
        text("heading", {
          admin: { width: "50%", description: "Leave empty to use the page's title." },
        }),
      ],
    },
    textarea("intro", { required: true }),
    actionsField(),
    {
      type: "row",
      fields: [
        {
          name: "breadcrumbs",
          label: "Show breadcrumbs",
          type: "checkbox",
          defaultValue: true,
          admin: { width: "50%" },
        },
        text("breadcrumbsLabel", {
          label: "Breadcrumbs name (read out)",
          defaultValue: "Breadcrumb",
          admin: { width: "50%" },
        }),
      ],
    },
  ],
};
