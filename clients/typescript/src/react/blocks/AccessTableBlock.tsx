import { AccessTable } from "../components/AccessTable.tsx";
import { PageSection } from "../components/PageSection.tsx";
import { opt, type BlockProps } from "../context.ts";

export function AccessTableBlock({ block }: BlockProps<"accessTable">) {
  return (
    <PageSection id={block.anchor} title={block.title} intro={opt(block.intro)}>
      <AccessTable columns={block.columns} rows={block.rows} />
    </PageSection>
  );
}
