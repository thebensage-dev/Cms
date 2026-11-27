import type { Block } from "payload";
import { anchorField, sectionHeading, tagsField, text, textarea } from "@/fields/common";
import { iconField } from "@/fields/icon";

/** Numbered steps beside the section heading (StepTimeline), with an optional card under it. */
export const Timeline: Block = {
  slug: "timeline",
  dbName: "pb_tl",
  interfaceName: "TimelineBlock",
  labels: { singular: "Timeline", plural: "Timelines" },
  fields: [
    anchorField(),
    ...sectionHeading(),
    {
      name: "steps",
      type: "array",
      required: true,
      admin: { initCollapsed: true, components: { RowLabel: "@/components/admin/RowLabel" } },
      fields: [
        {
          type: "row",
          fields: [
            iconField({ admin: { width: "50%" } }),
            text("actor", {
              admin: { width: "50%", description: "Who does this step, such as You or Me." },
            }),
          ],
        },
        text("title", { required: true }),
        textarea("description", { required: true }),
      ],
    },
    {
      name: "showCount",
      label: "Number the steps",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "aside",
      label: "Under the heading",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none", label: "Nothing" },
        { value: "note", label: "A note" },
        { value: "tryAccess", label: "Try it: request access and sign in" },
      ],
    },
    {
      name: "note",
      type: "group",
      admin: { condition: (_, sibling) => sibling?.aside === "note" },
      fields: [text("title"), textarea("body")],
    },
    {
      name: "tryAccess",
      label: "Try it",
      type: "group",
      admin: { condition: (_, sibling) => sibling?.aside === "tryAccess" },
      fields: [
        text("title"),
        textarea("body", { admin: { description: "For visitors." } }),
        textarea("signedIn", { admin: { description: "For signed-in people." } }),
        text("requestAccess", { label: "Request access button" }),
        text("signIn", { label: "Sign in button" }),
      ],
    },
    tagsField("tags", "Tags under the steps"),
  ],
};
