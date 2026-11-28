import { cx as clsx } from "../GeneralSection.tsx";
import { toneAt, toneClass, iconOrDot } from "@thebensage-dev/ui";
import { fill, type Block } from "../../index.ts";
import type { ComponentType } from "react";
import type { ApiSpec, AuthScheme } from "../apiSpec.ts";

/** The summary line over the reference: only the facts the document actually states. */
function specFacts(spec: ApiSpec | null, block: Block<"apiReference">) {
  if (!spec) return [];
  const labels = block.facts;
  const list = (items?: string[]) => (items?.length ? items.join(", ") : undefined);
  const authName = (scheme: AuthScheme) =>
    scheme.kind === "http"
      ? fill(block.authNames.http, { scheme: scheme.scheme })
      : block.authNames[scheme.kind];
  return [
    { label: labels.version, value: spec.version },
    { label: labels.endpoints, value: spec.operations?.toString() },
    { label: labels.groups, value: list(spec.groups) },
    { label: labels.authentication, value: list(spec.auth?.map(authName)) },
  ].filter((fact) => fact.value);
}

/** The API's cards, the facts from its OpenAPI document and the browse-only reference (or a
 *  notice while the API is down). */
export function ApiReferenceSection({
  block,
  spec,
  label,
  viewer: Viewer,
}: {
  block: Block<"apiReference">;
  spec: ApiSpec | null;
  /** Names the reference for screen readers (the page title). */
  label: string;
  /** Draws the document interactively; without it, only the summary shows. */
  viewer?: ComponentType<{ content: string; loading: string }>;
}) {
  const facts = specFacts(spec, block);
  return (
    <>
      <ul className="mt-subsection grid gap-5 md:grid-cols-3">
        {(block.points ?? []).map((point, i) => {
          const Icon = iconOrDot(point.icon);
          return (
            <li
              key={point.id ?? point.title}
              className={clsx("card tone-card p-6", toneClass(toneAt(i)))}
            >
              <Icon className="size-5 text-primary-ink" aria-hidden />
              <h2 className="title-card mt-3">{point.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {point.description}
              </p>
            </li>
          );
        })}
      </ul>

      {facts.length > 0 && (
        <dl className="mt-stack grid gap-x-8 gap-y-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1 font-mono text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <section aria-label={label} className="mt-stack">
        {spec && !Viewer ? null : spec && Viewer ? (
          <div className="card overflow-hidden">
            <Viewer content={spec.content} loading={block.loading} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border-strong p-10 text-center">
            <span className="font-semibold">{block.unavailable.title}</span>
            <p className="max-w-md text-sm text-foreground-muted">
              {block.unavailable.description}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
