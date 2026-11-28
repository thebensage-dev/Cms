import type { ReactNode } from "react";
import { Reveal } from "@thebensage-dev/ui";
import type { Page } from "../types.ts";

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

/**
 * A section's own layout classes on a full-width page (`full`, its centred band), or the gap
 * that separates it inside a wide or narrow page's column, so any section block fits any page.
 */
export const sectionClass = (page: Page, full: string) =>
  page.width === "full" ? full : "mt-subsection";

/**
 * Lays out a block: in the page's column on a wide or narrow page, or in a centred band of its
 * own on a full-width page (a landing page: the space below each section separates them), where
 * it fades in as it scrolls into view.
 */
export function GeneralSection({
  page,
  id,
  labelledBy,
  className,
  children,
}: {
  page: Page;
  id?: string | null;
  /** The id of the section's heading. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  const full = page.width === "full";
  return (
    <section
      id={id || undefined}
      aria-labelledby={labelledBy}
      className={cx(
        "scroll-mt-8",
        sectionClass(page, "mx-auto w-full max-w-5xl px-4 pb-section sm:px-6"),
        className,
      )}
    >
      {full ? <Reveal onScroll>{children}</Reveal> : children}
    </section>
  );
}

export { cx };
