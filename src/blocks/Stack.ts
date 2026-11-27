import type { Block } from "payload";
import { flowSteps, rowLabel } from "@/blocks/fields";
import { brandLogoFields } from "@/fields/brandLogo";
import { anchorField, featureItems, sectionHeading, text } from "@/fields/common";
import { iconField } from "@/fields/icon";

/** The pipeline, every piece of the platform and the tools behind it (full width). */
export const Stack: Block = {
  slug: "stack",
  dbName: "pb_stack",
  interfaceName: "StackBlock",
  labels: { singular: "Stack", plural: "Stacks" },
  fields: [
    anchorField("stack"),
    ...sectionHeading({ eyebrow: true }),
    text("pipelineLabel", { required: true }),
    flowSteps("pipeline"),
    featureItems("pieces"),
    text("toolsTitle", { required: true }),
    {
      name: "toolGroups",
      type: "array",
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        text("group", { required: true }),
        {
          name: "tools",
          type: "array",
          admin: { initCollapsed: true, ...rowLabel },
          fields: [
            {
              type: "row",
              fields: [
                text("name", { required: true, admin: { width: "40%" } }),
                text("url", { required: true, admin: { width: "60%" } }),
              ],
            },
            ...brandLogoFields(),
            iconField({ admin: { description: "Used when there's no logo." } }),
          ],
        },
      ],
    },
  ],
};
