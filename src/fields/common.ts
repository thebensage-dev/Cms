import type { ArrayField, CollapsibleField, Field, TextField, TextareaField } from "payload";
import { iconField } from "@/fields/icon";
import { linkGroup } from "@/fields/link";

/** The section's id on the page (its heading gets `<anchor>-title`), so links can jump to it. */
export function anchorField(defaultValue?: string): TextField {
  return {
    name: "anchor",
    label: "Section id",
    type: "text",
    defaultValue,
    required: true,
    validate: (value: string | null | undefined) =>
      !value || /^[a-z][a-z0-9-]*$/.test(value) || "Lowercase letters, digits and dashes only.",
    admin: {
      description: "Used in links to this section (#id). Lowercase letters, digits and dashes.",
    },
  };
}

export const text = (name: string, overrides: Partial<TextField> = {}): TextField =>
  ({ name, type: "text", ...overrides }) as TextField;

export const textarea = (name: string, overrides: Partial<TextareaField> = {}): TextareaField =>
  ({ name, type: "textarea", ...overrides }) as TextareaField;

/** The heading of a section: title and an optional intro under it. */
export function sectionHeading({ eyebrow = false, intro = true, required = true } = {}): Field[] {
  return [
    ...(eyebrow ? [text("eyebrow")] : []),
    text("title", { required }),
    ...(intro ? [textarea("intro")] : []),
  ];
}

/** Tags shown as chips: one text field holding many values. */
export const tagsField = (name = "tags", label?: string): Field => ({
  name,
  label,
  type: "text",
  hasMany: true,
});

/** Buttons, in order. The first is usually the main call to action. */
export function actionsField(name = "actions"): ArrayField {
  return {
    name,
    label: "Buttons",
    type: "array",
    labels: { singular: "Button", plural: "Buttons" },
    admin: { initCollapsed: true, components: { RowLabel: "@/components/admin/RowLabel" } },
    fields: [
      {
        type: "row",
        fields: [
          text("label", { required: true, admin: { width: "50%" } }),
          {
            name: "style",
            type: "select",
            defaultValue: "primary",
            options: [
              { value: "primary", label: "Primary (blue)" },
              { value: "secondary", label: "Secondary (outline)" },
              { value: "accent", label: "Accent (warm; one per view at most)" },
              { value: "ghost", label: "Ghost (text only)" },
            ],
            admin: { width: "25%" },
          },
          {
            name: "size",
            type: "select",
            defaultValue: "default",
            options: [
              { value: "default", label: "Default" },
              { value: "sm", label: "Small" },
              { value: "lg", label: "Large" },
            ],
            admin: { width: "25%" },
          },
        ],
      },
      {
        type: "row",
        fields: [
          iconField({ admin: { width: "50%" } }),
          {
            name: "iconPosition",
            type: "select",
            defaultValue: "end",
            options: [
              { value: "start", label: "Before the label" },
              { value: "end", label: "After the label" },
            ],
            admin: { width: "50%" },
          },
        ],
      },
      linkGroup(),
    ],
  };
}

/** Cards with an icon, a title, a description and optional tags (FeatureGrid on the sites). */
export function featureItems(name = "items", { tags = true } = {}): ArrayField {
  return {
    name,
    type: "array",
    labels: { singular: "Card", plural: "Cards" },
    admin: { initCollapsed: true, components: { RowLabel: "@/components/admin/RowLabel" } },
    fields: [
      iconField(),
      text("title", { required: true }),
      textarea("description", { required: true }),
      ...(tags ? [tagsField()] : []),
    ],
  };
}

/** One piece of wording: field name, what's there today (the default) and an optional hint. */
export type Wording = [name: string, defaultValue: string, description?: string];

/**
 * A group of short texts (labels, buttons, messages), two to a row, each with today's wording as
 * its default. `{name}`-style placeholders in a default are filled in by the site.
 */
export function wordingGroup(
  name: string,
  label: string,
  entries: Wording[],
  description?: string,
): CollapsibleField {
  const fields: Field[] = entries.map(([field, defaultValue, hint]) =>
    text(field, {
      required: true,
      defaultValue,
      admin: { width: "50%", ...(hint && { description: hint }) },
    }),
  );
  const rows: Field[] = [];
  for (let i = 0; i < fields.length; i += 2) {
    rows.push({ type: "row", fields: fields.slice(i, i + 2) });
  }
  // Closed until needed: the words are already filled in. The collapsible only changes the form;
  // the group keeps the stored shape.
  return {
    type: "collapsible",
    label,
    // Shown on the block's Labels tab (src/blocks/index.ts).
    custom: { labels: true },
    admin: { initCollapsed: true, ...(description && { description }) },
    fields: [{ name, label: false, type: "group", fields: rows }],
  };
}

/** The default wording of a group as an object, for the seed. */
export const wordingDefaults = (entries: Wording[]) =>
  Object.fromEntries(entries.map(([field, value]) => [field, value]));
