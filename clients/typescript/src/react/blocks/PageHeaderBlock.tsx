import Link from "next/link";
import { PageIntro } from "@thebensage-dev/ui";
import { crumbsFor } from "../../content.ts";
import { CmsButtons } from "../CmsButtons.tsx";
import type { BlockProps } from "../context.ts";

/** The top of an inner page: breadcrumbs (also as structured data), eyebrow, heading, intro and
 *  buttons (SharedUI's PageIntro). */
export function PageHeaderBlock({ block, ctx }: BlockProps<"pageHeader">) {
  return (
    <PageIntro
      crumbs={block.breadcrumbs ? crumbsFor(ctx.content, ctx.page) : []}
      breadcrumbsLabel={block.breadcrumbsLabel || undefined}
      eyebrow={block.eyebrow}
      title={block.heading || ctx.page.title}
      intro={block.intro}
      siteUrl={ctx.siteUrl}
      linkComponent={Link}
    >
      {block.actions?.length ? <CmsButtons buttons={block.actions} ctx={ctx} /> : null}
    </PageIntro>
  );
}
