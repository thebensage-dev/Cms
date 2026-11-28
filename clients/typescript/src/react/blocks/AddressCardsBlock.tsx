import { AddressCards } from "../components/AddressCards.tsx";
import { PageSection } from "../components/PageSection.tsx";
import type { BlockProps } from "../context.ts";

export function AddressCardsBlock({ block }: BlockProps<"addressCards">) {
  return (
    <PageSection id={block.anchor} title={block.title}>
      <AddressCards items={block.items} />
    </PageSection>
  );
}
