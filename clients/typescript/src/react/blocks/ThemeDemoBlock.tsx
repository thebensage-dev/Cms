import { ThemeSection } from "../components/ThemeSection.tsx";
import type { BlockProps } from "../context.ts";

/** The colour demo: members get the picker; sign-in links come back to this section. */
export function ThemeDemoBlock({ block, ctx }: BlockProps<"themeDemo">) {
  if (!ctx.theme) return null;
  const { content, access } = ctx;
  const components = ctx.resolveLink(block.preview.componentsLink);
  return (
    <ThemeSection
      block={block}
      page={ctx.page}
      theme={ctx.theme.theme}
      colours={ctx.theme.colours}
      cookieDomain={ctx.theme.cookieDomain}
      componentsUrl={components?.href ?? content.settings.githubUrl ?? undefined}
      access={{
        member: access?.member ?? false,
        signedIn: access?.signedIn ?? false,
        signInHref: access?.signInHrefFor?.(`${ctx.path ?? ctx.page.path}#${block.anchor}`),
        requestAccessUrl: access?.requestAccessHref,
      }}
    />
  );
}
