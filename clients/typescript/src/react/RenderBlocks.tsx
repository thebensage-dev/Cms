import type { ComponentType, ReactNode } from "react";
import type { LayoutBlock } from "../content.ts";
import { ButtonsBlock } from "./blocks/ButtonsBlock.tsx";
import { CallToActionBlock } from "./blocks/CallToActionBlock.tsx";
import { CardGridBlock } from "./blocks/CardGridBlock.tsx";
import { ColumnsBlock } from "./blocks/ColumnsBlock.tsx";
import { ContentBlock } from "./blocks/ContentBlock.tsx";
import { ImageBlock } from "./blocks/ImageBlock.tsx";
import { ImageTextBlock } from "./blocks/ImageTextBlock.tsx";
import { LegalHeaderBlock } from "./blocks/LegalHeaderBlock.tsx";
import { PageHeaderBlock } from "./blocks/PageHeaderBlock.tsx";
import { TextSectionBlock } from "./blocks/TextSectionBlock.tsx";
import { TimelineBlock } from "./blocks/TimelineBlock.tsx";
import type { BlockContext, BlockProps } from "./context.ts";

type BlockType = LayoutBlock["blockType"];

/** Which component draws each block type. */
export type BlockRegistry<C extends BlockContext = BlockContext> = {
  [T in BlockType]?: (props: BlockProps<T, C>) => ReactNode;
};

/**
 * The blocks every site can use (the CMS's GENERAL_BLOCKS), drawn the same way everywhere. A site
 * adds its own: `{ ...GENERAL_BLOCKS, projectsGrid: ProjectsGridBlock }`.
 */
export const GENERAL_BLOCKS: BlockRegistry = {
  pageHeader: PageHeaderBlock,
  legalHeader: LegalHeaderBlock,
  content: ContentBlock,
  image: ImageBlock,
  imageText: ImageTextBlock,
  columns: ColumnsBlock,
  buttons: ButtonsBlock,
  textSection: TextSectionBlock,
  cardGrid: CardGridBlock,
  timeline: TimelineBlock,
  callToAction: CallToActionBlock,
};

/** A page's blocks in order, each drawn by its component. A type with none renders nothing. */
export function RenderBlocks<C extends BlockContext>({
  blocks,
  registry,
  ctx,
}: {
  blocks: LayoutBlock[] | null | undefined;
  registry: BlockRegistry<C>;
  ctx: C;
}) {
  return (blocks ?? []).map((block, i) => {
    const Component = registry[block.blockType] as
      ComponentType<{ block: LayoutBlock; ctx: C }> | undefined;
    return Component ? <Component key={block.id ?? i} block={block} ctx={ctx} /> : null;
  });
}
