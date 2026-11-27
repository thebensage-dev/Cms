import type { Field } from "payload";
import * as simpleIcons from "simple-icons";

type SimpleIcon = { slug: string; path: string; title: string };

// Every simple-icons logo by slug (as in simpleicons.org URLs: "nextdotjs", "github"), built once.
let bySlug: Map<string, SimpleIcon> | undefined;
export function brandLogo(slug: string): SimpleIcon | undefined {
  bySlug ??= new Map(
    Object.values(simpleIcons as Record<string, unknown>)
      .filter((icon): icon is SimpleIcon => typeof (icon as SimpleIcon)?.slug === "string")
      .map((icon) => [icon.slug, icon]),
  );
  return bySlug.get(slug);
}

/**
 * A brand logo from simple-icons, picked by slug. The CMS stores the logo's SVG path next to the
 * slug when it's saved (`logoPath`), so the sites draw it without shipping the icon set.
 */
export function brandLogoFields(): Field[] {
  return [
    {
      name: "logo",
      label: "Logo (simple-icons slug)",
      type: "text",
      admin: {
        description:
          "The name in the logo's simpleicons.org address, such as nextdotjs. Leave empty to use the icon below.",
      },
      validate: (value: string | null | undefined) =>
        !value || brandLogo(value) ? true : `simple-icons has no logo called "${value}".`,
    },
    {
      name: "logoPath",
      type: "text",
      admin: { readOnly: true, hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) =>
            typeof siblingData?.logo === "string" && siblingData.logo
              ? (brandLogo(siblingData.logo)?.path ?? null)
              : null,
        ],
      },
    },
  ];
}
