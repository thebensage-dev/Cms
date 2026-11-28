import { PageSection } from "../components/PageSection.tsx";
import { PlatformMap } from "../components/PlatformMap.tsx";
import { opt, type BlockProps } from "../context.ts";

export function PlatformMapBlock({ block, ctx }: BlockProps<"platformMap">) {
  return (
    <PageSection id={block.anchor} title={block.title} intro={opt(block.intro)}>
      <PlatformMap apps={block.apps} content={ctx.content} envUrl={ctx.envUrl} />
    </PageSection>
  );
}
