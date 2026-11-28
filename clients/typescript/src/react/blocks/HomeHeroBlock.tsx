import { HomeHero } from "../components/HomeHero.tsx";
import type { BlockProps } from "../context.ts";

export function HomeHeroBlock({ block, ctx }: BlockProps<"homeHero">) {
  return <HomeHero block={block} ctx={ctx} />;
}
