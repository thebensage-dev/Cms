import { describe, expect, it, vi } from "vitest";

// The sign-in flow itself is tested in @thebensage-dev/auth; these check the CMS's own rules.
vi.mock("payload", () => ({ getPayload: vi.fn() }));
vi.mock("@payload-config", () => ({ default: {} }));
const { auth, isEditor, roleFor } = await import("@/auth/session");

describe("who may use the CMS", () => {
  it("lets cms-editors and authentik Admins edit", () => {
    expect(isEditor(["cms-editors"])).toBe(true);
    expect(isEditor(["authentik Admins", "grafana-viewers"])).toBe(true);
    expect(roleFor(["cms-editors"])).toBe("editor");
  });

  it("lets cms-viewers look and turns everyone else away", () => {
    expect(roleFor(["cms-viewers"])).toBe("viewer");
    expect(roleFor(["portfolio-members", "user-directory-editors"])).toBeNull();
    expect(roleFor([])).toBeNull();
  });
});

describe("where a sign-in returns to", () => {
  it("keeps admin paths", () => {
    expect(auth.safeReturnTo("/admin")).toBe("/admin");
    expect(auth.safeReturnTo("/admin/collections/pages?limit=10")).toBe(
      "/admin/collections/pages?limit=10",
    );
  });

  it("sends anything else to the admin's home", () => {
    for (const bad of ["https://evil.test/admin", "//evil.test", "/administrator", "/", null]) {
      expect(auth.safeReturnTo(bad)).toBe("/admin");
    }
  });
});
