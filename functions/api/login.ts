import { AppEnv } from "../_lib/types";
import { clientIp, isRateLimited } from "../_lib/rate-limit";
import { preflight, withCors } from "../_lib/cors";
import { json } from "../_lib/response";
import { issueSession, verifySecret } from "../_lib/auth";

const LOGIN_RATE_LIMIT_MAX = 10;
const LOGIN_RATE_LIMIT_WINDOW_SECONDS = 60;

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

  const password = (input as Record<string, unknown>).password;
  if (typeof password !== "string" || password.length === 0) {
    return json({ error: "Şifre gerekli." }, { status: 400 });
  }

  const ip = clientIp(request);
  const limited = await isRateLimited(env, `login:${ip}`, LOGIN_RATE_LIMIT_MAX, LOGIN_RATE_LIMIT_WINDOW_SECONDS);
  if (limited) {
    return json({ error: "Çok fazla deneme yaptın, biraz sonra tekrar dene." }, { status: 429 });
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!(await verifySecret(password, env.ADMIN_PASSWORD))) {
    return json({ error: "Hatalı şifre." }, { status: 401 });
  }

  const token = await issueSession(env.SESSION_SECRET);
  return json({ token });
}