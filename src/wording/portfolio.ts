import type { Wording } from "@/fields/common";

// The main site's wording that has a default, so a new block starts with today's words.

/** The API reference block: how each kind of OpenAPI authentication is named in the facts. */
export const AUTH_NAMES: Wording[] = [
  ["bearer", "Bearer token"],
  ["http", "HTTP {scheme}", "Other HTTP schemes; {scheme} is the scheme, such as Basic."],
  ["oauth2", "OAuth 2.0"],
  ["openIdConnect", "OpenID Connect"],
  ["apiKey", "API key"],
  ["mutualTLS", "Mutual TLS"],
];
