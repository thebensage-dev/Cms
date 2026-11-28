import type { ComponentType, ReactNode } from "react";
import type { LayoutBlock } from "../content.ts";
import { AccessTableBlock } from "./blocks/AccessTableBlock.tsx";
import { AddressCardsBlock } from "./blocks/AddressCardsBlock.tsx";
import { ApiReferenceBlock } from "./blocks/ApiReferenceBlock.tsx";
import { EmailSendersBlock } from "./blocks/EmailSendersBlock.tsx";
import { FlowsBlock } from "./blocks/FlowsBlock.tsx";
import { HomeHeroBlock } from "./blocks/HomeHeroBlock.tsx";
import { LinkCardsBlock } from "./blocks/LinkCardsBlock.tsx";
import { PageCardsBlock } from "./blocks/PageCardsBlock.tsx";
import { PageTeaserBlock } from "./blocks/PageTeaserBlock.tsx";
import { PlatformMapBlock } from "./blocks/PlatformMapBlock.tsx";
import { PlatformTeaserBlock } from "./blocks/PlatformTeaserBlock.tsx";
import { ProjectsGridBlock } from "./blocks/ProjectsGridBlock.tsx";
import { StackBlock } from "./blocks/StackBlock.tsx";
import { ThemeDemoBlock } from "./blocks/ThemeDemoBlock.tsx";
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
 * Every block any site can use, drawn the same way everywhere. A site that has more (the User
 * Directory's directory and profiles) adds them: `{ ...GENERAL_BLOCKS, userDirectory: … }`.
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
  accessTable: AccessTableBlock,
  addressCards: AddressCardsBlock,
  apiReference: ApiReferenceBlock,
  emailSenders: EmailSendersBlock,
  flows: FlowsBlock,
  homeHero: HomeHeroBlock,
  linkCards: LinkCardsBlock,
  pageCards: PageCardsBlock,
  pageTeaser: PageTeaserBlock,
  platformMap: PlatformMapBlock,
  platformTeaser: PlatformTeaserBlock,
  projectsGrid: ProjectsGridBlock,
  stack: StackBlock,
  themeDemo: ThemeDemoBlock,
};

/** Blocks that span the whole width, outside a wide or narrow page's centred column. */
export const FULL_WIDTH_BLOCKS: ReadonlySet<BlockType> = new Set<BlockType>(["stack"]);

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
