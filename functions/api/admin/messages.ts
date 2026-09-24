import { AppEnv } from "../../_lib/types";
import { json } from "../../_lib/response";

interface ContactRow {
  id: string;
  name: string;
  email: string;
  message: string;
  ip: string | null;
  is_read: number;
  created_at: number;
}

export const onRequestGet: PagesFunction<AppEnv> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    `SELECT id, name, email, message, ip, is_read, created_at
     FROM contacts
     ORDER BY created_at DESC
     LIMIT 200`,
  ).all<ContactRow>();

  const total = await env.DB.prepare("SELECT COUNT(*) AS n FROM contacts").first<{ n: number }>();
  const unread = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM contacts WHERE is_read = 0",
  ).first<{ n: number }>();

  return json({
    messages: results ?? [],
    stats: { total: total?.n ?? 0, unread: unread?.n ?? 0 },
  });
};