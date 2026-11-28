import { authRoutes } from "@thebensage-dev/auth";
import { auth } from "@/auth/session";

export const { GET } = authRoutes(auth).callback;
