import type { Block } from "payload";
import { anchorField, sectionHeading, text, textarea } from "@/fields/common";
import { linkGroup } from "@/fields/link";

/** The design-system demo: the colour picker (members only), light and dark, and a preview. */
export const ThemeDemo: Block = {
  slug: "themeDemo",
  dbName: "pb_theme",
  interfaceName: "ThemeDemoBlock",
  labels: { singular: "Colour demo", plural: "Colour demos" },
  fields: [
    anchorField("theme"),
    ...sectionHeading({ eyebrow: true }),
    textarea("note", { required: true }),
    {
      type: "row",
      fields: [
        text("presetsLabel", { required: true, admin: { width: "50%" } }),
        text("themeLabel", { required: true, admin: { width: "50%" } }),
      ],
    },
    {
      type: "collapsible",
      label: "Locked palette (people who aren't members)",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "locked",
          type: "group",
          label: false,
          fields: [
            text("title", { required: true, admin: { description: "For visitors." } }),
            textarea("body", { required: true }),
            text("signIn", { label: "Sign in button", required: true }),
            text("memberTitle", {
              required: true,
              admin: { description: "For signed-in people who aren't members yet." },
            }),
            textarea("memberBody", { required: true }),
            text("requestAccess", { label: "Request access button", required: true }),
            text("refresh", { label: "Refresh link", required: true }),
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Colour roles",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "roles",
          type: "group",
          label: false,
          fields: (["primary", "secondary", "accent"] as const).map((role) => ({
            name: role,
            type: "group",
            fields: [
              {
                type: "row",
                fields: [
                  text("label", { required: true, admin: { width: "30%" } }),
                  text("hint", { required: true, admin: { width: "70%" } }),
                ],
              },
            ],
          })),
        },
      ],
    },
    {
      type: "collapsible",
      label: "Preview card",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "preview",
          type: "group",
          label: false,
          fields: [
            {
              type: "row",
              fields: [
                text("title", { required: true, admin: { width: "50%" } }),
                text("heading", { required: true, admin: { width: "50%" } }),
              ],
            },
            {
              name: "primary",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    text("button", { required: true, admin: { width: "33%" } }),
                    text("link", { required: true, admin: { width: "33%" } }),
                    text("progress", { required: true, admin: { width: "33%" } }),
                  ],
                },
              ],
            },
            {
              name: "secondary",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    text("tile", { required: true, admin: { width: "50%" } }),
                    text("tag", { required: true, admin: { width: "50%" } }),
                  ],
                },
                text("body", { required: true }),
              ],
            },
            {
              name: "accent",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    text("button", { required: true, admin: { width: "33%" } }),
                    text("text", { required: true, admin: { width: "33%" } }),
                    text("match", {
                      required: true,
                      admin: { width: "33%", description: "Highlighted after the text." },
                    }),
                  ],
                },
              ],
            },
            text("all", { required: true }),
            text("link", { label: "Components link text", required: true }),
            linkGroup("componentsLink", "Components link goes to", "comp"),
          ],
        },
      ],
    },
  ],
};
