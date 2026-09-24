import { AppEnv } from "../../_lib/types";
import { preflight, withCors } from "../../_lib/cors";
import { json } from "../../_lib/response";
import { verifySession } from "../../_lib/auth";

export const onRequest: PagesFunction<AppEnv> = async ({ request, env, next }) => {
  const blocked = preflight(request, env);
  if (blocked) return blocked;

  const authorization = request.headers.get("Authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

  if (!token || !(await verifySession(token, env.SESSION_SECRET))) {
    return json({ error: "Oturum geçersiz veya zamanı dolmuş." }, { status: 401 });
  }

  const response = await next();
  return withCors(response, request, env);
};