import { Figure } from "@thebensage-dev/ui";
import { mediaImage } from "../../content.ts";
import type { BlockProps } from "../context.ts";
import { GeneralSection } from "../GeneralSection.tsx";

/** One uploaded image with its caption. Nothing while the image is missing. */
export function ImageBlock({ block, ctx }: BlockProps<"image">) {
  const image = mediaImage(ctx.content, block.image, ctx.mediaUrl);
  if (!image) return null;
  return (
    <GeneralSection page={ctx.page}>
      <Figure {...image} caption={block.caption} small={block.size === "small"} />
    </GeneralSection>
  );
}
