import { describe, expect, it } from "vitest";
import { safeReturnTo } from "@/auth/returnTo";
import { cookieFrom, isEditor, readSession, seal } from "@/auth/session";

const SECRET = "test-secret-that-is-long-enough";

describe("the session cookie", () => {
  it("round-trips the account and its groups", async () => {
    const token = await seal(
      { sub: "abc", name: "Ada", email: "ada@example.test", groups: ["cms-editors"], sid: "s1" },
      "1h",
      SECRET,
    );
    expect(await readSession(token, SECRET)).toEqual({
      sub: "abc",
      name: "Ada",
      email: "ada@example.test",
      groups: ["cms-editors"],
      sid: "s1",
    });
  });

  it("refuses another key, an expired cookie and junk", async () => {
    const token = await seal({ sub: "abc" }, "1h", SECRET);
    expect(await readSession(token, "another-secret")).toBeNull();
    expect(await readSession(await seal({ sub: "abc" }, "-1s", SECRET), SECRET)).toBeNull();
    expect(await readSession("not-a-token", SECRET)).toBeNull();
    expect(await readSession(undefined, SECRET)).toBeNull();
  });

  it("reads one cookie from a Cookie header", () => {
    const header = "theme=dark; cms_session=a%3Db; other=1";
    expect(cookieFrom(header, "cms_session")).toBe("a=b");
    expect(cookieFrom(header, "missing")).toBeUndefined();
    expect(cookieFrom(null, "cms_session")).toBeUndefined();
  });
});

describe("who may edit", () => {
  it("admits cms-editors and authentik Admins only", () => {
    expect(isEditor(["cms-editors"])).toBe(true);
    expect(isEditor(["authentik Admins", "grafana-viewers"])).toBe(true);
    expect(isEditor(["portfolio-members", "user-directory-editors"])).toBe(false);
    expect(isEditor([])).toBe(false);
  });
});

describe("where a sign-in returns to", () => {
  it("keeps admin paths", () => {
    expect(safeReturnTo("/admin")).toBe("/admin");
    expect(safeReturnTo("/admin/collections/pages?limit=10")).toBe(
      "/admin/collections/pages?limit=10",
    );
  });

  it("sends anything else to the admin's home", () => {
    for (const bad of ["https://evil.test/admin", "//evil.test", "/administrator", "/", null]) {
      expect(safeReturnTo(bad)).toBe("/admin");
    }
  });
});
