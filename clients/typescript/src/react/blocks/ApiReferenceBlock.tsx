import { ApiReferenceSection } from "../components/ApiReferenceSection.tsx";
import type { BlockProps } from "../context.ts";

export function ApiReferenceBlock({ block, ctx }: BlockProps<"apiReference">) {
  return (
    <ApiReferenceSection
      block={block}
      spec={ctx.apiSpec ?? null}
      label={ctx.page.title}
      viewer={ctx.apiViewer}
    />
  );
}
