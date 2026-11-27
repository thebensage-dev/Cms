import type { Block } from "payload";
import { anchorField, featureItems, sectionHeading, text } from "@/fields/common";

/** Cards with an icon, title, description and tags (FeatureGrid). */
export const CardGrid: Block = {
  slug: "cardGrid",
  dbName: "pb_grid",
  interfaceName: "CardGridBlock",
  labels: { singular: "Card grid", plural: "Card grids" },
  fields: [
    anchorField(),
    ...sectionHeading(),
    {
      type: "row",
      fields: [
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: [
            { value: "2", label: "Two" },
            { value: "3", label: "Three" },
          ],
          admin: { width: "50%" },
        },
        text("tagsLabel", {
          admin: { width: "50%", description: "Read out before each card's tags." },
        }),
      ],
    },
    featureItems(),
  ],
};
