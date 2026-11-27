// Seed data names other documents by path (pages) or title (projects), since ids only exist once
// they're created. `resolveRefs` swaps the markers for ids.

export type PageRef = { $page: string };
export type ProjectRef = { $project: string };

export const page = (path: string): PageRef => ({ $page: path });
export const project = (title: string): ProjectRef => ({ $project: title });

type Link = Record<string, unknown>;

/** Link helpers, matching the link field (src/fields/link.ts). */
export const to = {
  page: (path: string, extra: Link = {}): Link => ({ type: "page", page: page(path), ...extra }),
  url: (url: string, extra: Link = {}): Link => ({ type: "url", url, ...extra }),
  external: (url: string): Link => ({ type: "url", url, newTab: true }),
  email: (extra: Link = {}): Link => ({ type: "email", ...extra }),
  project: (title: string, projectTarget = "default", extra: Link = {}): Link => ({
    type: "project",
    project: project(title),
    projectTarget,
    ...extra,
  }),
  requestAccess: (): Link => ({ type: "requestAccess" }),
  apiSpec: (): Link => ({ type: "apiSpec", newTab: true }),
  status: (): Link => ({ type: "status" }),
  mainSite: (path: string): Link => ({ type: "mainSite", url: path }),
};

export function resolveRefs<T>(
  value: T,
  ids: {
    pages: Map<string, number | string>;
    projects: Map<string, number | string>;
    media?: Map<string, number | string>;
  },
): T {
  if (Array.isArray(value)) return value.map((item) => resolveRefs(item, ids)) as T;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.$page === "string") {
      const id = ids.pages.get(record.$page);
      if (id === undefined) throw new Error(`Seed: no page at ${record.$page}`);
      return id as T;
    }
    if (typeof record.$media === "string") {
      const id = ids.media?.get(record.$media);
      if (id === undefined) throw new Error(`Seed: no image called ${record.$media}`);
      return id as T;
    }
    if (typeof record.$project === "string") {
      const id = ids.projects.get(record.$project);
      if (id === undefined) throw new Error(`Seed: no project called ${record.$project}`);
      return id as T;
    }
    return Object.fromEntries(
      Object.entries(record).map(([key, item]) => [key, resolveRefs(item, ids)]),
    ) as T;
  }
  return value;
}
