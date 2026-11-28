import { StackSection } from "../components/StackSection.tsx";
import type { BlockProps } from "../context.ts";

/** Full width (see FULL_WIDTH in the registry). */
export function StackBlock({ block }: BlockProps<"stack">) {
  return <StackSection block={block} />;
}
