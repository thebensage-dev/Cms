import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["__tests__/**/*.test.ts"],
    // Our packages import Next by its bare paths (next/headers), which only a bundler resolves.
    server: { deps: { inline: ["@thebensage-dev/auth", "@thebensage-dev/cms-client"] } },
  },
});
