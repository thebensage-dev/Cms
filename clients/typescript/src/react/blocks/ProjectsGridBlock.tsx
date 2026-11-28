import { ProjectsSection } from "../components/ProjectsSection.tsx";
import type { BlockProps } from "../context.ts";

export function ProjectsGridBlock({ block, ctx }: BlockProps<"projectsGrid">) {
  return (
    <ProjectsSection
      block={block}
      content={ctx.content}
      page={ctx.page}
      projectUrl={ctx.projectUrl}
    />
  );
}
