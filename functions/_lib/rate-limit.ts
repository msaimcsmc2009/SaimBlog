import { AppEnv } from "./types";

export async function isRateLimited(
  env: AppEnv,
  key: string,
  max: number,
  windowSeconds: number,
): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;

  const row = await env.DB.prepare(
    "SELECT count FROM rate_limits WHERE ip = ?1 AND window_start > ?2",
  )
    .bind(key, windowStart)
    .first<{ count: number }>();

  if (row && row.count >= max) return true;

  await env.DB.prepare(
    `INSERT INTO rate_limits (ip, window_start, count)
     VALUES (?1, ?2, 1)
     ON CONFLICT(ip) DO UPDATE SET
       count = CASE WHEN window_start > ?2 THEN count + 1 ELSE 1 END,
       window_start = CASE WHEN window_start > ?2 THEN window_start ELSE ?2 END`,
  )
    .bind(key, now)
    .run();

  return false;
}

export function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "unknown";
}