import { RichText, SectionHeading } from "@thebensage-dev/ui";
import type { BlockProps } from "../context.ts";
import { cx, GeneralSection } from "../GeneralSection.tsx";

/** Two or three columns of text, with an optional heading above. */
export function ColumnsBlock({ block, ctx }: BlockProps<"columns">) {
  const id = block.anchor || `columns-${block.id ?? "block"}`;
  return (
    <GeneralSection page={ctx.page} id={block.anchor}>
      {block.title && <SectionHeading id={`${id}-title`} title={block.title} intro={block.intro} />}
      <div
        className={cx(
          "grid gap-stack",
          block.title && "mt-content",
          block.columns.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {block.columns.map((column, i) => (
          <div key={column.id ?? i}>
            {column.heading && <h3 className="title-card">{column.heading}</h3>}
            <RichText
              data={column.body}
              className={cx(
                "space-y-3 leading-relaxed text-foreground-muted",
                column.heading && "mt-2",
              )}
            />
          </div>
        ))}
      </div>
    </GeneralSection>
  );
}
