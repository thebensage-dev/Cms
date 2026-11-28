import { SkillsTeaser } from "../components/SkillsTeaser.tsx";
import type { BlockProps } from "../context.ts";

export function PageTeaserBlock({ block, ctx }: BlockProps<"pageTeaser">) {
  return <SkillsTeaser block={block} content={ctx.content} page={ctx.page} />;
}
