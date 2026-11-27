import {
  BoldFeature,
  FixedToolbarFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { anchorField, text } from "@/fields/common";

/** A heading and formatted text: the privacy notice's and terms' sections. */
export const TextSection: Block = {
  slug: "textSection",
  dbName: "pb_txt",
  interfaceName: "TextSectionBlock",
  labels: { singular: "Text section", plural: "Text sections" },
  fields: [
    text("heading", { required: true }),
    {
      ...anchorField(),
      required: false,
      admin: { description: "Optional: makes the section linkable, such as #cookies." },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      // Only what the sites render: paragraphs, bullet lists, bold, inline code and links.
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          InlineCodeFeature(),
          UnorderedListFeature(),
          LinkFeature({ enabledCollections: [] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        description:
          "Paragraphs, bullet lists, bold, inline code (for cookie names) and https links.",
      },
    },
  ],
};
