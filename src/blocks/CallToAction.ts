import type { Block } from "payload";
import { actionsField, text, textarea } from "@/fields/common";

/** A wide card with a heading, a sentence and buttons. */
export const CallToAction: Block = {
  slug: "callToAction",
  dbName: "pb_cta",
  interfaceName: "CallToActionBlock",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [text("title", { required: true }), textarea("body"), actionsField()],
};
