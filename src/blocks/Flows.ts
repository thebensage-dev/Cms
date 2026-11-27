import type { Block } from "payload";
import { flowSteps, rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, text } from "@/fields/common";

/** Rows of small steps, each with a label (how email travels). */
export const Flows: Block = {
  slug: "flows",
  dbName: "pb_flows",
  interfaceName: "FlowsBlock",
  labels: { singular: "Flows", plural: "Flows" },
  fields: [
    anchorField(),
    ...sectionHeading({ intro: false }),
    {
      name: "rows",
      type: "array",
      required: true,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [text("label", { required: true }), flowSteps("steps")],
    },
  ],
};
