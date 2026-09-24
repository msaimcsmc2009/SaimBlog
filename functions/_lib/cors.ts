import { AppEnv, } from "./types";
import { json } from "./response";

const DEFAULT_ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:8788"];

export function isAllowedOrigin(origin: string | null, env: AppEnv): boolean {
  if (!origin) return false;
  const allowed = env.ALLOWED_ORIGINS
    ? [...DEFAULT_ALLOWED_ORIGINS, ...env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)]
    : DEFAULT_ALLOWED_ORIGINS;
  return allowed.includes(origin);
}

export function corsHeaders(origin: string | null): HeadersInit {
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function preflight(request: Request, env: AppEnv): Response | null {
  if (request.method !== "OPTIONS") return null;
  const origin = request.headers.get("Origin");
  if (!isAllowedOrigin(origin, env)) {
    return json({ error: "Kaynak engellendi." }, { status: 403 });
  }
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export function withCors(response: Response, request: Request, env: AppEnv): Response {
  const origin = request.headers.get("Origin");
  if (!origin || !isAllowedOrigin(origin, env)) return response;
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}