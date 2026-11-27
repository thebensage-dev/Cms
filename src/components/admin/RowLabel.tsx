"use client";

import { useRowLabel } from "@payloadcms/ui";

const NAME_FIELDS = [
  "title",
  "label",
  "name",
  "heading",
  "group",
  "app",
  "address",
  "host",
  "value",
];

/** Names an array row after its first filled-in text field, instead of "Item 01". */
export default function RowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const name = NAME_FIELDS.map((field) => data?.[field]).find(
    (value): value is string => typeof value === "string" && value.trim() !== "",
  );
  const number = String((rowNumber ?? 0) + 1).padStart(2, "0");
  return <span>{name ? `${number} · ${name}` : `Row ${number}`}</span>;
}
