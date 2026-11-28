import { FeatureGrid, SectionHeading } from "@thebensage-dev/ui";
import { opt, type BlockProps } from "../context.ts";
import { GeneralSection } from "../GeneralSection.tsx";
import { features } from "../rows.ts";

/** A heading over a grid of cards, each with an icon, a title, a sentence and tags. */
export function CardGridBlock({ block, ctx }: BlockProps<"cardGrid">) {
  const titleId = `${block.anchor}-title`;
  return (
    <GeneralSection page={ctx.page} id={block.anchor} labelledBy={titleId}>
      <SectionHeading id={titleId} title={block.title} intro={opt(block.intro)} />
      <FeatureGrid
        features={features(block.items)}
        columns={block.columns === "2" ? 2 : 3}
        tagsLabel={opt(block.tagsLabel)}
        className="mt-content"
      />
    </GeneralSection>
  );
}
