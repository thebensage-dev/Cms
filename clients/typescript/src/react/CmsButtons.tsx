import Link from "next/link";
import { ActionLinks, iconByName } from "@thebensage-dev/ui";
import type { CmsLink } from "../links.ts";
import type { BlockContext } from "./context.ts";

/** A button as the CMS stores it (the buttons field). */
export type CmsButton = {
  id?: string | null;
  label: string;
  style?: "primary" | "secondary" | "accent" | "ghost" | null;
  size?: "default" | "sm" | "lg" | null;
  icon?: string | null;
  iconPosition?: "start" | "end" | null;
  link: CmsLink;
};

/** Buttons from the CMS, in order, drawn by SharedUI's ActionLinks. A button whose link can't go
 *  anywhere here right now is left out. With `nudge`, a primary button's trailing icon moves on
 *  hover. */
export function CmsButtons({
  buttons,
  ctx,
  nudge = false,
}: {
  buttons: CmsButton[] | null | undefined;
  ctx: Pick<BlockContext, "resolveLink">;
  nudge?: boolean;
}) {
  const actions = (buttons ?? []).flatMap((button, i) => {
    const link = ctx.resolveLink(button.link);
    if (!link) return [];
    return [
      {
        key: button.id ?? i,
        label: button.label,
        href: link.href,
        style: button.style,
        size: button.size,
        icon: iconByName(button.icon),
        iconPosition: button.iconPosition,
        internal: link.internal,
        external: link.external,
        download: link.download,
      },
    ];
  });
  if (!actions.length) return null;
  return <ActionLinks actions={actions} linkComponent={Link} nudge={nudge} />;
}
