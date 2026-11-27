"use client";

import { Pill, useRowLabel } from "@payloadcms/ui";

const NAME_FIELDS = ["heading", "title", "headline", "anchor", "caption"];

/**
 * A layout block's header: its number, its kind and what it says (its heading or title), so a
 * collapsed page reads like an outline.
 */
export default function BlockLabel({ label }: { label: string }) {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const name = NAME_FIELDS.map((field) => data?.[field]).find(
    (value): value is string => typeof value === "string" && value.trim() !== "",
  );
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ opacity: 0.6 }}>{String((rowNumber ?? 0) + 1).padStart(2, "0")}</span>
      <Pill pillStyle="white" size="small">
        {label}
      </Pill>
      {name && <span>{name}</span>}
    </span>
  );
}
