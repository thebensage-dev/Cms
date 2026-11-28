// Every layout block, one file each. Each block is a piece of content with a fixed shape; how it
// looks is up to the site (each has one component per block type in its blocks registry).
import type { Block, Field } from "payload";
import { AccessTable } from "@/blocks/AccessTable";
import { AddressCards } from "@/blocks/AddressCards";
import { ApiReference } from "@/blocks/ApiReference";
import { Buttons } from "@/blocks/Buttons";
import { CallToAction } from "@/blocks/CallToAction";
import { CardGrid } from "@/blocks/CardGrid";
import { Columns } from "@/blocks/Columns";
import { Content } from "@/blocks/Content";
import { DirectoryHero } from "@/blocks/DirectoryHero";
import { EmailSenders } from "@/blocks/EmailSenders";
import { Flows } from "@/blocks/Flows";
import { HomeHero } from "@/blocks/HomeHero";
import { Image } from "@/blocks/Image";
import { ImageText } from "@/blocks/ImageText";
import { LegalHeader } from "@/blocks/LegalHeader";
import { LinkCards } from "@/blocks/LinkCards";
import { PageCards } from "@/blocks/PageCards";
import { PageHeader } from "@/blocks/PageHeader";
import { PageTeaser } from "@/blocks/PageTeaser";
import { PlatformMap } from "@/blocks/PlatformMap";
import { PlatformTeaser } from "@/blocks/PlatformTeaser";
import { ProjectsGrid } from "@/blocks/ProjectsGrid";
import { Stack } from "@/blocks/Stack";
import { TextSection } from "@/blocks/TextSection";
import { ThemeDemo } from "@/blocks/ThemeDemo";
import { Timeline } from "@/blocks/Timeline";
import { UserDirectory } from "@/blocks/UserDirectory";
import { UserProfile } from "@/blocks/UserProfile";

/** The groups of the "Add block" drawer, in order. */
type DrawerGroup =
  "Page tops" | "Text and images" | "Sections" | "Showcase sections" | "User Directory";

/** A label group (screen-reader words, button wording…), which goes in the block's Labels tab. */
const isLabels = (field: Field) =>
  (field.type === "group" || field.type === "collapsible") && field.custom?.labels === true;

/**
 * How a block appears to editors: in its drawer group with a thumbnail, its header showing its
 * heading, and its labels on a separate tab after the content. Tabs without names, so the
 * stored content keeps its shape.
 */
function forEditors(block: Block, group: DrawerGroup): Block {
  const labels = block.fields.filter(isLabels);
  const content = block.fields.filter((field) => !isLabels(field));
  const fields: Field[] =
    labels.length && content.length
      ? [
          {
            type: "tabs",
            tabs: [
              { label: "Content", fields: content },
              {
                label: "Labels",
                description:
                  "Button text, messages and screen-reader labels, already filled in. Change them only to reword them.",
                fields: labels,
              },
            ],
          },
        ]
      : block.fields;
  const singular = block.labels?.singular;
  return {
    ...block,
    fields,
    admin: {
      ...block.admin,
      group,
      disableBlockName: true,
      images: { thumbnail: { url: `/block-thumbnails/${block.slug}.svg`, alt: "" } },
      components: {
        ...block.admin?.components,
        Label: {
          path: "@/components/admin/BlockLabel",
          clientProps: { label: typeof singular === "string" ? singular : block.slug },
        },
      },
    },
  };
}

/** Blocks every site can use (drawn by @thebensage-dev/cms-client/react). */
export const sharedBlocks = [
  forEditors(PageHeader, "Page tops"),
  forEditors(LegalHeader, "Page tops"),
  forEditors(Content, "Text and images"),
  forEditors(Image, "Text and images"),
  forEditors(ImageText, "Text and images"),
  forEditors(Columns, "Text and images"),
  forEditors(TextSection, "Text and images"),
  forEditors(Buttons, "Text and images"),
  forEditors(CardGrid, "Sections"),
  forEditors(Timeline, "Sections"),
  forEditors(CallToAction, "Sections"),
  forEditors(HomeHero, "Page tops"),
  forEditors(PageCards, "Sections"),
  forEditors(LinkCards, "Sections"),
  forEditors(PageTeaser, "Sections"),
  forEditors(ProjectsGrid, "Showcase sections"),
  forEditors(PlatformTeaser, "Showcase sections"),
  forEditors(PlatformMap, "Showcase sections"),
  forEditors(Stack, "Showcase sections"),
  forEditors(Flows, "Showcase sections"),
  forEditors(AccessTable, "Showcase sections"),
  forEditors(AddressCards, "Showcase sections"),
  forEditors(EmailSenders, "Showcase sections"),
  forEditors(ThemeDemo, "Showcase sections"),
  forEditors(ApiReference, "Showcase sections"),
];

/** The User Directory app's blocks: they read and change users through the API, so only a site
 *  with that app (the User Directory block set) can use them. */
export const userDirectoryBlocks = [
  forEditors(DirectoryHero, "Page tops"),
  forEditors(UserDirectory, "User Directory"),
  forEditors(UserProfile, "User Directory"),
];
