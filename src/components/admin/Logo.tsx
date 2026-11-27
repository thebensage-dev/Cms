import { logoSvg } from "@thebensage-dev/ui";

/** The admin panel's logo (login page and nav): SharedUI's logo mark plus the name. */
export default function Logo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- an inline SVG data URI */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(logoSvg())}`}
        alt=""
        width={40}
        height={40}
      />
      <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}>
        TheBensage CMS
      </span>
    </span>
  );
}
