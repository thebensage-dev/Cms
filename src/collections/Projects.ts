import type { CollectionConfig } from "payload";
import { anyone, editor } from "@/access";
import { tagsField } from "@/fields/common";

/** The live projects, in the order the main site lists them (drag to reorder). */
export const Projects: CollectionConfig = {
  slug: "projects",
  orderable: true,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "address", "updatedAt"],
    group: "Content",
    description: "Listed on the main site's homepage, in this order. Drag rows to reorder.",
  },
  versions: { maxPerDoc: 25 },
  access: { read: anyone, create: editor, update: editor, delete: editor },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    tagsField(),
    {
      type: "row",
      fields: [
        {
          name: "address",
          label: "Live address",
          type: "select",
          required: true,
          options: [
            { value: "USER_DIRECTORY_URL", label: "The User Directory (USER_DIRECTORY_URL)" },
            { value: "API_URL", label: "The API (API_URL)" },
            { value: "STORYBOOK_URL", label: "Storybook (STORYBOOK_URL)" },
            { value: "CMS_PUBLIC_URL", label: "The CMS (CMS_PUBLIC_URL, else CMS_URL)" },
          ],
          admin: {
            width: "50%",
            description: "Each environment sets its own address, so it isn't typed here.",
          },
        },
        {
          name: "fallbackUrl",
          label: "Address for local development",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            description: "Used when the variable isn't set, e.g. npm run dev.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "cta",
          label: "Link text",
          type: "text",
          admin: { width: "50%", description: "Leave empty for the default (Open the app)." },
        },
        {
          name: "source",
          label: "Source code (GitHub)",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "page",
      label: "Page on the main site",
      type: "relationship",
      relationTo: "pages",
      filterOptions: { "site.slug": { equals: "portfolio" } },
      admin: {
        description: "If set, the card and the footer open this page instead of the live app.",
      },
    },
  ],
};
