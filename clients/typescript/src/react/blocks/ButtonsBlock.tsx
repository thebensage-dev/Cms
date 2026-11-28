import { CmsButtons } from "../CmsButtons.tsx";
import type { BlockProps } from "../context.ts";
import { cx, GeneralSection } from "../GeneralSection.tsx";

/** A row of buttons on their own. */
export function ButtonsBlock({ block, ctx }: BlockProps<"buttons">) {
  return (
    <GeneralSection page={ctx.page}>
      <div className={cx("flex flex-wrap gap-3", block.align === "center" && "justify-center")}>
        <CmsButtons buttons={block.actions} ctx={ctx} />
      </div>
    </GeneralSection>
  );
}
