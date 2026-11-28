// @thebensage-dev/cms-client/react: the CMS's blocks drawn with SharedUI, for Next.js sites.
// Add `@import "@thebensage-dev/cms-client/styles.css";` to the site's CSS so Tailwind sees the
// classes these components use.

export { CmsButtons, type CmsButton } from "./CmsButtons.tsx";
export { opt, type BlockContext, type BlockProps } from "./context.ts";
export { GeneralSection, sectionClass } from "./GeneralSection.tsx";
export { RefreshOnSave } from "./RefreshOnSave.tsx";
export { GENERAL_BLOCKS, RenderBlocks, type BlockRegistry } from "./RenderBlocks.tsx";
export { features, flowSteps, timelineSteps } from "./rows.ts";
