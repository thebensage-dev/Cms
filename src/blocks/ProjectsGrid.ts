import type { Block } from "payload";
import { rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** Every project (from Projects, in their order), then "Coming next". */
export const ProjectsGrid: Block = {
  slug: "projectsGrid",
  dbName: "pb_projects",
  interfaceName: "ProjectsGridBlock",
  labels: { singular: "Projects", plural: "Projects" },
  fields: [
    anchorField("projects"),
    ...sectionHeading({ eyebrow: true, intro: false }),
    {
      name: "labels",
      type: "group",
      custom: { labels: true },
      fields: [
        {
          type: "row",
          fields: [
            text("live", { required: true, defaultValue: "Live", admin: { width: "33%" } }),
            text("open", {
              label: "Default link text",
              required: true,
              defaultValue: "Open the app",
              admin: { width: "33%" },
            }),
            text("source", {
              label: "Source link",
              required: true,
              defaultValue: "Source code",
              admin: { width: "33%" },
            }),
          ],
        },
        {
          type: "row",
          fields: [
            text("builtWith", {
              label: "Tags (read out)",
              required: true,
              defaultValue: "Built with",
              admin: { width: "50%" },
            }),
            text("sourceOn", {
              label: "After “Source code” (read out)",
              required: true,
              defaultValue: "of {project} on GitHub",
              admin: { width: "50%" },
            }),
          ],
        },
      ],
    },
    {
      name: "comingNext",
      type: "group",
      fields: [
        text("title", { required: true }),
        {
          name: "items",
          type: "array",
          admin: { initCollapsed: true, ...rowLabel },
          fields: [
            {
              type: "row",
              fields: [
                text("name", { required: true, admin: { width: "40%" } }),
                text("detail", { required: true, admin: { width: "60%" } }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
