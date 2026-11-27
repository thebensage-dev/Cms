import { getPayload } from "payload";
import config from "@payload-config";

// GET /health: 200 when the CMS can read its database, 503 otherwise. For the Docker healthcheck,
// Grafana's site check (sites.yml) and the local stack's monitoring.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    await payload.count({ collection: "pages", overrideAccess: true });
    return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Health check failed:", err);
    return Response.json(
      { status: "unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
