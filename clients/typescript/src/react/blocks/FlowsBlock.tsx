import { FlowSteps } from "@thebensage-dev/ui";
import { PageSection } from "../components/PageSection.tsx";
import type { BlockProps } from "../context.ts";
import { flowSteps } from "../rows.ts";

/** Rows of small steps, each with its label (how email travels). */
export function FlowsBlock({ block }: BlockProps<"flows">) {
  return (
    <PageSection id={block.anchor} title={block.title}>
      <div className="grid gap-8">
        {block.rows.map((row) => (
          <div key={row.id ?? row.label}>
            <p className="eyebrow">{row.label}</p>
            <FlowSteps steps={flowSteps(row.steps)} label={row.label} className="mt-3" />
          </div>
        ))}
      </div>
    </PageSection>
  );
}
