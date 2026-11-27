import path from "node:path";
import type { CollectionConfig } from "payload";
import { anyone, editor } from "@/access";

/**
 * Images for the pages (image and image-and-text blocks). The files live on disk at MEDIA_DIR
 * (a persistent volume in production: /app/media); the sites load them from the CMS's public
 * address. Stored as uploaded: there's no resizing (sharp isn't in the image).
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Images" },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"],
    group: "Content",
    description: "Images for the pages. Upload here, or straight from an image block.",
  },
  access: { read: anyone, create: editor, update: editor, delete: editor },
  upload: {
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"],
    // No sharp in the image, so no crops or sizes; the sites size images with CSS.
    crop: false,
    focalPoint: false,
  },
  fields: [
    {
      name: "alt",
      label: "Alternative text",
      type: "text",
      required: true,
      admin: {
        description: "What the image shows, for screen readers. Describe it in a sentence.",
      },
    },
  ],
};
