import { CmsButtons } from "../CmsButtons.tsx";
import type { BlockProps } from "../context.ts";
import { GeneralSection } from "../GeneralSection.tsx";

/** A wide card with a heading, a sentence and buttons. */
export function CallToActionBlock({ block, ctx }: BlockProps<"callToAction">) {
  return (
    <GeneralSection page={ctx.page}>
      <div className="card brand-wash flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span aria-hidden className="brand-rule mb-4" />
          <h2 className="title-card text-xl">{block.title}</h2>
          {block.body && <p className="mt-1 text-foreground-muted">{block.body}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <CmsButtons buttons={block.actions} ctx={ctx} />
        </div>
      </div>
    </GeneralSection>
  );
}
