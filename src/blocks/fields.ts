import type { ArrayField, Field } from "payload";
import { text } from "@/fields/common";
import { iconField } from "@/fields/icon";

// Field helpers several blocks use.

/** Names an array's rows after their first text field (see components/admin/RowLabel). */

export const rowLabel = { components: { RowLabel: "@/components/admin/RowLabel" } } as const;

/** Small steps with an icon in a row (FlowSteps). */
export function flowSteps(name: string, label?: string): ArrayField {
  return {
    name,
    label,
    type: "array",
    required: true,
    admin: { initCollapsed: true, ...rowLabel },
    fields: [
      iconField(),
      {
        type: "row",
        fields: [
          text("title", { required: true, admin: { width: "50%" } }),
          text("detail", { required: true, admin: { width: "50%" } }),
        ],
      },
    ],
  };
}

export const pagesField = (name = "pages", label?: string): Field => ({
  name,
  label,
  type: "relationship",
  relationTo: "pages",
  hasMany: true,
  required: true,
  admin: {
    description: "Shown as cards with each page's card label, summary and icon (its Card tab).",
  },
});
