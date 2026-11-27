import type { Block } from "payload";
import { actionsField } from "@/fields/common";

/** A row of buttons on their own. */
export const Buttons: Block = {
  slug: "buttons",
  dbName: "pb_btns",
  interfaceName: "ButtonsBlock",
  labels: { singular: "Buttons", plural: "Buttons" },
  fields: [
    { ...actionsField(), required: true, minRows: 1 },
    {
      name: "align",
      type: "select",
      defaultValue: "start",
      options: [
        { value: "start", label: "Left" },
        { value: "center", label: "Centred" },
      ],
    },
  ],
};
