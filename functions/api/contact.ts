import { AppEnv } from "../_lib/types";
import { clientIp, isRateLimited } from "../_lib/rate-limit";
import { preflight, withCors } from "../_lib/cors";
import { json } from "../_lib/response";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60;

export const onRequest: PagesFunction<AppEnv> = async ({ request, env }) => {
  const blocked = preflight(request, env);
  if (blocked) return blocked;

  if (request.method !== "POST") {
    return json({ error: "Metot bulunamadı." }, { status: 404 });
  }

  const response = await handlePost(request, env);
  return withCors(response, request, env);
};

async function handlePost(request: Request, env: AppEnv): Promise<Response> {
  const input = await request.json().catch(() => null);
  if (typeof input !== "object" || input === null) {
    return json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const data = input as Record<string, unknown>;

  if (typeof data.contact_extra === "string" && data.contact_extra.trim() !== "") {
    return json({ ok: true }, { status: 201 });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return json({ error: "Adını eksiksiz yaz." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email) || email.length > 200) {
    return json({ error: "Geçerli bir e-posta adresi gir." }, { status: 400 });
  }
  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: "Mesajın 10 ile 5000 karakter arasında olmalı." }, { status: 400 });
  }

  const ip = clientIp(request);
  const limited = await isRateLimited(env, `contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_SECONDS);
  if (limited) {
    return json({ error: "Çok fazla istek gönderdin, biraz sonra tekrar dene." }, { status: 429 });
  }

  const now = Math.floor(Date.now() / 1000);
  const id = crypto.randomUUID();
  const userAgent = request.headers.get("User-Agent") ?? "";

  await env.DB.prepare(
    `INSERT INTO contacts (id, name, email, message, ip, user_agent, is_read, created_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, ?7)`,
  )
    .bind(id, name, email, message, ip, userAgent, now)
    .run();

  return json({ ok: true, id }, { status: 201 });
}