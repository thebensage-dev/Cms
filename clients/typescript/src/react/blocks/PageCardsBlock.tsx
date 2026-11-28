import { DeepDiveCards } from "../components/DeepDiveCards.tsx";
import { PageSection } from "../components/PageSection.tsx";
import { opt, type BlockProps } from "../context.ts";

export function PageCardsBlock({ block, ctx }: BlockProps<"pageCards">) {
  return (
    <PageSection id={block.anchor} title={block.title} intro={opt(block.intro)}>
      <DeepDiveCards pages={block.pages} content={ctx.content} readMore={block.readMore} />
    </PageSection>
  );
}
