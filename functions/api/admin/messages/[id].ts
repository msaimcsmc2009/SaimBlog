import { AppEnv } from "../../../_lib/types";
import { json } from "../../../_lib/response";

export const onRequestPatch: PagesFunction<AppEnv, "id"> = async ({ request, env, params }) => {
  const id = typeof params.id === "string" ? params.id : "";
  if (!id) {
    return json({ error: "Mesaj bulunamadı." }, { status: 404 });
  }

  const input = await request.json().catch(() => null);
  if (typeof input !== "object" || input === null) {
    return json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const read = (input as Record<string, unknown>).read;
  if (typeof read !== "boolean") {
    return json({ error: "read alanı zorunlu." }, { status: 400 });
  }

  const result = await env.DB.prepare("UPDATE contacts SET is_read = ?1 WHERE id = ?2")
    .bind(read ? 1 : 0, id)
    .run();

  if (result.meta.changes === 0) {
    return json({ error: "Mesaj bulunamadı." }, { status: 404 });
  }

  return json({ ok: true });
};

export const onRequestDelete: PagesFunction<AppEnv, "id"> = async ({ env, params }) => {
  const id = typeof params.id === "string" ? params.id : "";
  if (!id) {
    return json({ error: "Mesaj bulunamadı." }, { status: 404 });
  }

  const result = await env.DB.prepare("DELETE FROM contacts WHERE id = ?1")
    .bind(id)
    .run();

  if (result.meta.changes === 0) {
    return json({ error: "Mesaj bulunamadı." }, { status: 404 });
  }

  return json({ ok: true });
};