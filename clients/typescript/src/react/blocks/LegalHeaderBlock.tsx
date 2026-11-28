import { LegalIntro } from "@thebensage-dev/ui";
import { longDate } from "../../content.ts";
import type { BlockProps } from "../context.ts";

/** The top of a legal text: "Last updated" and the date, the heading and the opening paragraph. */
export function LegalHeaderBlock({ block, ctx }: BlockProps<"legalHeader">) {
  return (
    <LegalIntro
      updatedLabel={block.updatedLabel}
      updated={block.updated ? longDate(block.updated) : null}
      title={block.heading || ctx.page.title}
      intro={block.intro}
    />
  );
}
