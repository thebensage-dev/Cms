import type { Block } from "payload";
import { rowLabel } from "@/blocks/fields";
import { anchorField, sectionHeading, tagsField, text, textarea } from "@/fields/common";
import { iconField } from "@/fields/icon";

/** What sends email, with a picture of one of the emails beside it. */
export const EmailSenders: Block = {
  slug: "emailSenders",
  dbName: "pb_senders",
  interfaceName: "EmailSendersBlock",
  labels: { singular: "Email senders", plural: "Email senders" },
  fields: [
    anchorField("senders"),
    ...sectionHeading({ intro: false }),
    {
      name: "senders",
      type: "array",
      required: true,
      admin: { initCollapsed: true, ...rowLabel },
      fields: [
        iconField(),
        text("title", { required: true }),
        text("description", { required: true }),
        tagsField("items", "Emails it sends"),
      ],
    },
    {
      name: "preview",
      label: "Email preview",
      type: "group",
      fields: [
        text("title", { required: true }),
        {
          type: "row",
          fields: [
            text("fromLabel", { required: true, defaultValue: "From", admin: { width: "20%" } }),
            text("from", { required: true, admin: { width: "30%" } }),
            text("subject", { required: true, admin: { width: "50%" } }),
          ],
        },
        text("heading", { required: true }),
        text("greeting", { required: true }),
        textarea("body", { required: true }),
        text("button", { required: true }),
        textarea("caption", { required: true }),
      ],
    },
  ],
};
