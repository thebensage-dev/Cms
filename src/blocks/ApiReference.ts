import type { Block } from "payload";
import { featureItems, text, textarea, wordingGroup } from "@/fields/common";
import { AUTH_NAMES } from "@/wording/portfolio";

/** The API's OpenAPI reference, fetched live from the API, with three cards above it. */
export const ApiReference: Block = {
  slug: "apiReference",
  dbName: "pb_apiref",
  interfaceName: "ApiReferenceBlock",
  labels: { singular: "API reference", plural: "API references" },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "project",
          type: "relationship",
          relationTo: "projects",
          required: true,
          admin: { width: "50%", description: "The project whose live API is shown." },
        },
        text("specPath", {
          label: "OpenAPI document path",
          required: true,
          defaultValue: "/openapi/v1.json",
          admin: { width: "50%" },
        }),
      ],
    },
    featureItems("points", { tags: false }),
    {
      name: "facts",
      label: "Fact labels",
      type: "group",
      custom: { labels: true },
      fields: [
        {
          type: "row",
          fields: [
            text("version", { required: true, defaultValue: "Version", admin: { width: "25%" } }),
            text("endpoints", {
              required: true,
              defaultValue: "Endpoints",
              admin: { width: "25%" },
            }),
            text("groups", { required: true, defaultValue: "Groups", admin: { width: "25%" } }),
            text("authentication", {
              required: true,
              defaultValue: "Authentication",
              admin: { width: "25%" },
            }),
          ],
        },
      ],
    },
    wordingGroup(
      "authNames",
      "Authentication names",
      AUTH_NAMES,
      "How each kind of sign-in the OpenAPI document declares is named in the facts.",
    ),
    text("loading", { required: true, defaultValue: "Loading the reference…" }),
    {
      name: "unavailable",
      label: "While the API is down",
      type: "group",
      fields: [text("title", { required: true }), textarea("description", { required: true })],
    },
  ],
};
