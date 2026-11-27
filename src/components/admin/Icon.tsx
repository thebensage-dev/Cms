import { logoSvg } from "@thebensage-dev/ui";

/** The small logo in the admin panel's nav. */
export default function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- an inline SVG data URI
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(logoSvg())}`}
      alt="TheBensage CMS"
      width={28}
      height={28}
    />
  );
}
