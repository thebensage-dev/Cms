import { Figure, MediaText, RichText } from "@thebensage-dev/ui";
import { mediaImage } from "../../content.ts";
import { CmsButtons } from "../CmsButtons.tsx";
import type { BlockProps } from "../context.ts";
import { GeneralSection } from "../GeneralSection.tsx";
import { Heading } from "./Heading.tsx";

/** An uploaded image beside a heading, formatted text and buttons. */
export function ImageTextBlock({ block, ctx }: BlockProps<"imageText">) {
  const image = mediaImage(ctx.content, block.image, ctx.mediaUrl);
  return (
    <GeneralSection page={ctx.page} id={block.anchor}>
      <MediaText media={image && <Figure {...image} />} mediaSide={block.imageSide ?? "left"}>
        <Heading eyebrow={block.eyebrow} heading={block.heading} />
        <RichText
          data={block.body}
          className="mt-content space-y-4 leading-relaxed text-foreground-muted"
        />
        {block.actions?.length ? (
          <div className="mt-content flex flex-wrap gap-3">
            <CmsButtons buttons={block.actions} ctx={ctx} />
          </div>
        ) : null}
      </MediaText>
    </GeneralSection>
  );
}
