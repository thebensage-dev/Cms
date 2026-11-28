import { RichText } from "@thebensage-dev/ui";
import { CmsButtons } from "../CmsButtons.tsx";
import type { BlockProps } from "../context.ts";
import { GeneralSection } from "../GeneralSection.tsx";
import { Heading } from "./Heading.tsx";

/** The general text section: eyebrow, heading, formatted text and buttons. */
export function ContentBlock({ block, ctx }: BlockProps<"content">) {
  return (
    <GeneralSection page={ctx.page} id={block.anchor} className="max-w-3xl">
      <Heading eyebrow={block.eyebrow} heading={block.heading} />
      <RichText
        data={block.body}
        className="mt-content space-y-4 leading-relaxed text-foreground-muted"
      />
      {block.actions?.length ? (
        <div className="mt-content flex flex-wrap gap-3">
          <CmsButtons buttons={block.actions} ctx={ctx} />
        </div>
      ) : null}
    </GeneralSection>
  );
}
