"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Inbox, Lock, LogOut, Mail, MailOpen, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { withBasePath } from "@/lib/base-path";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  ip: string | null;
  is_read: number;
  created_at: number;
};

type Stats = { total: number; unread: number };

const TOKEN_KEY = "saim-contact-admin";

const inputClasses =
  "w-full rounded-md border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";

const iconButtonClasses =
  "flex h-8 w-8 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:border-accent-border hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function api<T>(path: string, token: string | null, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(withBasePath(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError(0, "Sunucuya ulaşılamıyor.");
  }

  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new ApiError(response.status, data?.error ?? "Bir hata oluştu.");
  }
  return data as T;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AdminPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(false);

  function handleAuthError(error: unknown) {
    if (error instanceof ApiError && error.status === 401) {
      window.localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setMessages([]);
      toast.error("Oturum doldu, tekrar giriş yap.");
      return;
    }
    toast.error(error instanceof Error ? error.message : "Bir hata oluştu.");
  }

  const load = useCallback(async (activeToken: string) => {
    const data = await api<{ messages: Message[]; stats: Stats }>(
      "/api/admin/messages",
      activeToken,
    );
    setMessages(data.messages);
    setStats(data.stats);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.resolve();
      if (cancelled) return;
      const saved = window.localStorage.getItem(TOKEN_KEY);
      if (saved) setToken(saved);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      await Promise.resolve();
      if (cancelled) return;
      try {
        await load(token);
      } catch (error) {
        if (!cancelled) handleAuthError(error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, load]);

  useEffect(() => {
    if (!token) return;
    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      load(token).catch((error) => {
        if (error instanceof ApiError && error.status === 401) handleAuthError(error);
      });
    }, 30_000);
    return () => window.clearInterval(interval);
  }, [token, load]);

  useEffect(() => {
    const pageTitle = `Mesaj Kutusu — ${siteConfig.name}`;
    document.title = stats.unread > 0 ? `(${stats.unread}) ${pageTitle}` : pageTitle;
    return () => {
      document.title = pageTitle;
    };
  }, [stats.unread]);

  async function refresh() {
    if (!token) return;
    setLoading(true);
    try {
      await load(token);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSigningIn(true);
    try {
      const data = await api<{ token: string }>("/api/login", null, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      window.localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
      toast.success("Giriş başarılı.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Giriş başarısız.");
    } finally {
      setSigningIn(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMessages([]);
    setStats({ total: 0, unread: 0 });
  }

  async function toggleRead(message: Message) {
    if (!token) return;
    const nextRead = !message.is_read;
    try {
      await api(`/api/admin/messages/${message.id}`, token, {
        method: "PATCH",
        body: JSON.stringify({ read: nextRead }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, is_read: nextRead ? 1 : 0 } : m)),
      );
      setStats((prev) => ({
        ...prev,
        unread: nextRead ? Math.max(prev.unread - 1, 0) : prev.unread + 1,
      }));
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function removeMessage(message: Message) {
    if (!token) return;
    if (!window.confirm("Bu mesajı silmek istediğine emin misin?")) return;
    try {
      await api(`/api/admin/messages/${message.id}`, token, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
      setStats((prev) => ({
        total: Math.max(prev.total - 1, 0),
        unread: message.is_read ? prev.unread : Math.max(prev.unread - 1, 0),
      }));
      toast.success("Mesaj silindi.");
    } catch (error) {
      handleAuthError(error);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md">
        <Eyebrow>Yönetim</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight">Mesaj kutusu</h1>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          Gelen iletişim mesajlarını görmek için yönetici şifresini gir.
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-fg">
              Şifre
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Yönetici şifresi"
              autoComplete="current-password"
              className={cn(inputClasses, "border-border")}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            icon={<Lock size={16} />}
            disabled={signingIn || password.length === 0}
          >
            {signingIn ? "Doğrulanıyor..." : "Giriş Yap"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Yönetim</Eyebrow>
          <h1 className="mt-5 flex flex-wrap items-center gap-3 font-display text-4xl font-semibold leading-tight">
            Mesaj kutusu
            {stats.unread > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {stats.unread} yeni mesaj
              </span>
            )}
          </h1>
          <p className="mt-3 font-mono text-xs text-fg-subtle">
            {stats.total} mesaj · {stats.unread} okunmamış
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={refresh}
            disabled={loading}
            icon={
              <RefreshCw size={16} className={cn(loading && "animate-spin")} />
            }
          >
            {loading ? "Yükleniyor..." : "Yenile"}
          </Button>
          <Button variant="ghost" onClick={handleLogout} icon={<LogOut size={16} />}>
            Çıkış
          </Button>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {!loading && messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <Inbox className="mx-auto h-6 w-6 text-fg-subtle" />
            <p className="mt-3 text-sm text-fg-muted">Henüz mesaj yok.</p>
          </div>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={cn(
                "rounded-lg border bg-bg-elevated p-5",
                message.is_read ? "border-border" : "border-accent-border",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-fg">
                    {message.name}
                    {!message.is_read && (
                      <span className="ml-2 font-mono text-[10px] uppercase text-accent">
                        yeni
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="mt-0.5 inline-block text-xs text-fg-muted transition-colors hover:text-accent"
                  >
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-fg-subtle">
                    {formatDate(message.created_at)}
                  </span>
                  <button
                    type="button"
                    aria-label={message.is_read ? "Okunmadı olarak işaretle" : "Okundu olarak işaretle"}
                    title={message.is_read ? "Okunmadı olarak işaretle" : "Okundu olarak işaretle"}
                    onClick={() => toggleRead(message)}
                    className={iconButtonClasses}
                  >
                    {message.is_read ? <MailOpen size={15} /> : <Mail size={15} />}
                  </button>
                  <button
                    type="button"
                    aria-label="Mesajı sil"
                    title="Mesajı sil"
                    onClick={() => removeMessage(message)}
                    className={cn(iconButtonClasses, "hover:border-danger hover:text-danger")}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-fg-muted">
                {message.message}
              </p>
              {message.ip && (
                <p className="mt-4 font-mono text-[11px] text-fg-subtle">{message.ip}</p>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}