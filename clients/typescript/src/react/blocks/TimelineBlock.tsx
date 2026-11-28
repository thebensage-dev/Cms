import { LogIn, UserPlus } from "lucide-react";
import { NoteCard, SectionHeading, StepTimeline } from "@thebensage-dev/ui";
import type { Block } from "../../content.ts";
import { opt, type BlockContext, type BlockProps } from "../context.ts";
import { cx, GeneralSection } from "../GeneralSection.tsx";
import { timelineSteps } from "../rows.ts";

/**
 * Steps down a line, with an optional note or "Try it" card and tags. In a page's column the
 * heading (and its card) stays in view beside the steps on wide screens; on a full-width page it
 * sits above them.
 */
export function TimelineBlock({ block, ctx }: BlockProps<"timeline">) {
  const titleId = `${block.anchor}-title`;
  const beside = ctx.page.width !== "full";
  const aside = <Aside block={block} ctx={ctx} />;
  return (
    <GeneralSection
      page={ctx.page}
      id={block.anchor}
      labelledBy={titleId}
      className={cx(beside && "grid gap-stack lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]")}
    >
      <div className={cx(beside && "lg:sticky lg:top-8 lg:self-start")}>
        <SectionHeading id={titleId} title={block.title} intro={opt(block.intro)} />
        {beside && <div className="mt-content empty:hidden">{aside}</div>}
      </div>
      <div>
        <StepTimeline
          steps={timelineSteps(block.steps)}
          label={block.title}
          {...(block.showCount === false && { countLabel: false as const })}
          className={cx(!beside && "mt-content")}
        />
        {!beside && <div className="mt-content empty:hidden">{aside}</div>}
        {block.tags?.length ? (
          <div className="mt-stack flex flex-wrap gap-2">
            {block.tags.map((item) => (
              <span key={item} className="tag border border-border bg-surface px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </GeneralSection>
  );
}

/** What goes with the heading: a note, or the "Try it" card (request access, and sign in). */
function Aside({ block, ctx }: { block: Block<"timeline">; ctx: BlockContext }) {
  if (block.aside === "note" && block.note?.title) {
    return <NoteCard title={block.note.title} body={block.note.body ?? ""} />;
  }
  const text = block.tryAccess;
  if (block.aside !== "tryAccess" || !text || !ctx.access) return null;
  const { signedIn, signInHref, requestAccessHref } = ctx.access;
  return (
    <NoteCard title={text.title ?? ""} body={(signedIn ? text.signedIn : text.body) ?? ""}>
      {requestAccessHref && (
        <a href={requestAccessHref} className="btn btn-accent">
          <UserPlus className="size-4" aria-hidden />
          {text.requestAccess}
        </a>
      )}
      {!signedIn && signInHref && (
        <a href={signInHref} className="btn btn-secondary">
          <LogIn className="size-4" aria-hidden />
          {text.signIn}
        </a>
      )}
    </NoteCard>
  );
}
