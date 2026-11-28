import { PlatformTeaser } from "../components/PlatformTeaser.tsx";
import type { BlockProps } from "../context.ts";

export function PlatformTeaserBlock({ block, ctx }: BlockProps<"platformTeaser">) {
  return <PlatformTeaser block={block} content={ctx.content} page={ctx.page} />;
}
