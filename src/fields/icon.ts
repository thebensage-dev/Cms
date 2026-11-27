import type { SelectField } from "payload";
import { ICON_NAMES, type IconName } from "@thebensage-dev/ui";

/**
 * Lucide icons content can pick, by their lucide-react name: SharedUI's registry, which both sites
 * draw from, so the picker and the sites always agree. Add an icon there (a SharedUI release),
 * then bump it here. An unknown name draws as a dot.
 */
export const ICONS = ICON_NAMES;

export type { IconName };

/** "FolderGit2" -> "Folder git 2", for the dropdown. */
const label = (name: string) =>
  name
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

/** A Lucide icon picked from the list above. */
export function iconField(overrides: Partial<SelectField> = {}): SelectField {
  return {
    name: "icon",
    type: "select",
    options: ICONS.map((value) => ({ value, label: label(value) })),
    admin: { description: "A Lucide icon (lucide.dev/icons)." },
    ...overrides,
  } as SelectField;
}
