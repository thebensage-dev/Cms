import {
  findPage,
  type ContentSource,
  type SettingsFor,
  type Site,
  type SiteContent,
} from "./content.ts";
import { PREVIEW_HEADER } from "./preview.ts";
import type { Media, Page, Project } from "./types.ts";

export class CmsUnavailableError extends Error {
  constructor(cause: unknown) {
    super("The CMS can't be reached and there's no snapshot to fall back on.", { cause });
    this.name = "CmsUnavailableError";
  }
}

export interface CmsClientOptions<S extends Site> {
  /** The CMS's address as this server reaches it, such as `https://cms.example.com`. */
  baseUrl: string;
  site: S;
  /** How long a fetched copy counts as fresh. After that it's still served while a new copy loads. */
  ttlSeconds?: number;
  /** Gives up on the CMS after this long and serves the copy it has. */
  timeoutMs?: number;
  /**
   * The site's content as of the last snapshot (`cms-snapshot`), used when the CMS can't be
   * reached and nothing has been fetched yet, e.g. right after a deploy while the CMS is down.
   */
  snapshot?: SiteContent<S>;
  /** The secret shared with the CMS (PREVIEW_SECRET) that lets `content({ draft: true })` read drafts. */
  previewSecret?: string;
  fetch?: typeof globalThis.fetch;
  /** Told about every failed fetch (the client then falls back). Defaults to console.warn. */
  onError?: (error: unknown) => void;
  /**
   * Called first with anything a fetch throws, to let a framework's own control-flow errors
   * through instead of treating them as the CMS being down. In Next.js pass `unstable_rethrow`
   * from "next/navigation", so a route still switches to rendering per request.
   */
  rethrow?: (error: unknown) => void;
}

export interface CmsClient<S extends Site> {
  /**
   * The site's content: fresh, cached or the snapshot (see `ContentSource`). With `draft`, the
   * latest drafts straight from the CMS, never cached (needs `previewSecret`).
   */
  content(options?: { draft?: boolean }): Promise<SiteContent<S> & { source: ContentSource }>;
  /** The published page at `path` (such as `/` or `/platform/email`), or null. */
  page(path: string): Promise<Page | null>;
  /** Drops the cached copy, so the next call fetches again. */
  clear(): void;
}

/** A copy in memory: from the CMS (`at` = when), or the snapshot standing in for one (`at` = 0). */
type Fetched<S extends Site> = { content: SiteContent<S>; at: number; snapshot?: true };

/**
 * A reader for one site's content. It fetches the whole site (a few dozen kB) in four requests and
 * keeps it in memory, so a page view costs no request at all while the copy is fresh:
 *
 * - fresh copy: served as is;
 * - stale copy: served at once, and a new one is fetched in the background;
 * - no copy yet: fetched now; if the CMS can't be reached, the `snapshot` is served instead, and
 *   kept as a stale copy, so later requests don't wait while the CMS is still down.
 *
 * A failed fetch never replaces a good copy, so the site keeps rendering while the CMS is down.
 * Relationships come back as ids (depth 0); look them up with `pageById` and `projectById`.
 */
export function createCmsClient<S extends Site>(options: CmsClientOptions<S>): CmsClient<S> {
  const baseUrl = options.baseUrl.replace(/\/+$/, "");
  const ttl = (options.ttlSeconds ?? 60) * 1000;
  const timeoutMs = options.timeoutMs ?? 3000;
  const doFetch = options.fetch ?? globalThis.fetch;
  const onError = options.onError ?? ((error: unknown) => console.warn("CMS fetch failed:", error));
  let cached: Fetched<S> | undefined;
  let inFlight: Promise<Fetched<S>> | undefined;

  async function getJson<T>(path: string, draft = false): Promise<T> {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (draft && options.previewSecret) headers[PREVIEW_HEADER] = options.previewSecret;
    const response = await doFetch(`${baseUrl}${path}`, {
      headers,
      signal: AbortSignal.timeout(timeoutMs),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`GET ${path}: HTTP ${response.status}`);
    return (await response.json()) as T;
  }

  async function fetchSite(draft: boolean): Promise<SiteContent<S>> {
    const site = encodeURIComponent(options.site);
    const drafts = draft ? "&draft=true" : "";
    const [pages, projects, sites, media] = await Promise.all([
      getJson<{ docs: Page[] }>(
        `/api/pages?where[site.slug][equals]=${site}&depth=0&limit=0&sort=path${drafts}`,
        draft,
      ),
      getJson<{ docs: Project[] }>(`/api/projects?depth=0&limit=0&sort=_order`),
      getJson<{ docs: SettingsFor<S>[] }>(`/api/sites?where[slug][equals]=${site}&depth=0&limit=1`),
      getJson<{ docs: Media[] }>(`/api/media?depth=0&limit=0`),
    ]);
    const settings = sites.docs[0];
    if (!settings) throw new Error(`The CMS has no site "${options.site}"`);
    return {
      site: options.site,
      pages: pages.docs,
      projects: projects.docs,
      settings,
      media: media.docs,
      fetchedAt: new Date().toISOString(),
    };
  }

  function refresh(): Promise<Fetched<S>> {
    inFlight ??= fetchSite(false)
      .then((content) => (cached = { content, at: Date.now() }))
      .finally(() => {
        inFlight = undefined;
      });
    return inFlight;
  }

  /** Reports a failed background refresh, unless it was the framework's own signal. */
  function reportBackground(error: unknown) {
    try {
      options.rethrow?.(error);
    } catch {
      return; // A framework signal, not a failure; the next request refreshes.
    }
    onError(error);
  }

  async function content({ draft = false } = {}): Promise<
    SiteContent<S> & { source: ContentSource }
  > {
    if (draft) {
      if (!options.previewSecret) throw new Error("Draft content needs the preview secret.");
      return { ...(await fetchSite(true)), source: "draft" };
    }
    const source = (copy: Fetched<S>): ContentSource => (copy.snapshot ? "snapshot" : "cache");
    if (cached && Date.now() - cached.at < ttl) {
      return { ...cached.content, source: source(cached) };
    }
    if (cached) {
      // Stale: answer now, refresh behind it.
      refresh().catch(reportBackground);
      return { ...cached.content, source: source(cached) };
    }
    try {
      return { ...(await refresh()).content, source: "live" };
    } catch (error) {
      options.rethrow?.(error);
      onError(error);
      if (options.snapshot) {
        // Keep the snapshot as a stale copy, so the next requests answer at once instead of each
        // waiting for the timeout, and one fetch at a time keeps trying in the background.
        cached = { content: options.snapshot, at: 0, snapshot: true };
        return { ...options.snapshot, source: "snapshot" };
      }
      throw new CmsUnavailableError(error);
    }
  }

  return {
    content,
    async page(path) {
      return findPage(await content(), path);
    },
    clear() {
      cached = undefined;
    },
  };
}

/**
 * Fetches a site's content for a snapshot file (what `cms-snapshot` writes). Throws when the CMS
 * can't be reached, so a snapshot is never written from a fallback.
 */
export async function fetchSnapshot<S extends Site>(
  options: Pick<CmsClientOptions<S>, "baseUrl" | "site" | "fetch" | "timeoutMs">,
): Promise<SiteContent<S>> {
  const client = createCmsClient({ ...options, onError: () => {} });
  const { source, ...content } = await client.content();
  if (source !== "live") throw new Error("The snapshot didn't come from the CMS.");
  return content as SiteContent<S>;
}
