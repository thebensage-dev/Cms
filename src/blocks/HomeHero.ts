import type { Block } from "payload";
import { actionsField, text, textarea } from "@/fields/common";

/** The homepage's opening. */
export const HomeHero: Block = {
  slug: "homeHero",
  dbName: "pb_hero",
  interfaceName: "HomeHeroBlock",
  labels: { singular: "Homepage hero", plural: "Homepage heroes" },
  fields: [
    text("role", { required: true, admin: { description: "The line above the headline." } }),
    text("headline", { required: true }),
    text("highlight", {
      admin: { description: "Part of the headline, drawn in the brand gradient." },
    }),
    textarea("intro", { required: true }),
    actionsField(),
  ],
};
