import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// The same headers as the sites. Payload's admin needs no framing of its own, so frames are
// banned everywhere except the front-channel logout route, which authentik loads in a hidden
// frame (it sets its own frame-ancestors).
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // The CMS has no pages of its own: its address opens the admin (which asks to sign in).
  async redirects() {
    return [{ source: "/", destination: "/admin", permanent: false }];
  },
  async headers() {
    return [{ source: "/((?!auth/frontchannel-logout).*)", headers: securityHeaders }];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
