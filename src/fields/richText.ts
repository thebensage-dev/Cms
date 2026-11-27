import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { RichTextField } from "payload";

/**
 * Formatted text for the general blocks: paragraphs, subheadings (h3, h4), bold, italic, inline
 * code, bullet and numbered lists, quotes and links. Only what the sites' RichText draws.
 */
export function formattedText(
  name = "body",
  overrides: Partial<RichTextField> = {},
): RichTextField {
  return {
    name,
    type: "richText",
    editor: lexicalEditor({
      features: () => [
        ParagraphFeature(),
        HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
        BoldFeature(),
        ItalicFeature(),
        InlineCodeFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        BlockquoteFeature(),
        LinkFeature({ enabledCollections: [] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    ...overrides,
  } as RichTextField;
}
