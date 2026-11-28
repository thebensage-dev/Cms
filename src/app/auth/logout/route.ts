import { authRoutes } from "@thebensage-dev/auth";
import { auth } from "@/auth/session";

export const { POST } = authRoutes(auth).logout;
