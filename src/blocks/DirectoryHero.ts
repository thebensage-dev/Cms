import type { Block } from "payload";
import { actionsField, text, textarea } from "@/fields/common";
import { rowLabel } from "@/blocks/fields";
import { iconField } from "@/fields/icon";

/** The landing page's opening: tag, headline, intro, buttons, the live counts (from the API) and
 *  the animated example search. */
export const DirectoryHero: Block = {
  slug: "directoryHero",
  dbName: "pb_dhero",
  interfaceName: "DirectoryHeroBlock",
  labels: { singular: "Directory hero", plural: "Directory heroes" },
  fields: [
    {
      type: "row",
      fields: [
        text("tag", { required: true, admin: { width: "50%" } }),
        iconField({ name: "tagIcon", admin: { width: "50%" } }),
      ],
    },
    text("headline", { required: true }),
    text("highlight", {
      admin: { description: "Part of the headline, drawn in the brand gradient." },
    }),
    textarea("intro", { required: true }),
    actionsField(),
    {
      name: "summary",
      label: "Live counts (from the API)",
      type: "group",
      fields: [
        { name: "show", type: "checkbox", defaultValue: true },
        {
          type: "row",
          fields: [
            text("users", { required: true, defaultValue: "users", admin: { width: "33%" } }),
            text("countries", {
              required: true,
              defaultValue: "countries",
              admin: { width: "33%" },
            }),
            text("interests", {
              required: true,
              defaultValue: "interests",
              admin: { width: "33%" },
            }),
          ],
        },
      ],
    },
    {
      name: "preview",
      label: "Search preview (the animated example beside the text)",
      type: "group",
      fields: [
        text("query", {
          required: true,
          admin: { description: "Typed into the example search box." },
        }),
        {
          name: "rows",
          type: "array",
          admin: { initCollapsed: true, ...rowLabel },
          fields: [
            {
              type: "row",
              fields: [
                text("name", { required: true, admin: { width: "40%" } }),
                text("job", { required: true, admin: { width: "40%" } }),
                text("country", {
                  required: true,
                  admin: { width: "20%", description: "Two-letter code." },
                }),
              ],
            },
            {
              name: "match",
              label: "Highlighted as the match",
              type: "checkbox",
            },
          ],
        },
      ],
    },
  ],
};
