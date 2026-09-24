"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Adını girmelisin.";
  if (!EMAIL_REGEX.test(values.email)) errors.email = "Geçerli bir e-posta adresi gir.";
  if (values.message.trim().length < 10) errors.message = "Mesajın en az 10 karakter olmalı.";
  return errors;
}

const inputClasses =
  "w-full rounded-md border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contactExtra = ((formData.get("contact_extra") as string) ?? "").trim();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(withBasePath("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          contact_extra: contactExtra,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? "Mesajın gönderilemedi, tekrar dene.");
      }
      setValues({ name: "", email: "", message: "" });
      toast.success("Mesajın gönderildi. En kısa sürede dönüş yapacağım.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Mesajın gönderilemedi.";
      toast.error(message === "Failed to fetch" ? "Sunucuya ulaşılamıyor." : message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div aria-hidden className="hidden">
        <label htmlFor="contact_extra">Bu alanı boş bırak</label>
        <input
          id="contact_extra"
          name="contact_extra"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          readOnly
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
          İsim
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Adın Soyadın"
          className={cn(inputClasses, errors.name ? "border-danger" : "border-border")}
        />
        {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
          E-posta
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="sen@ornek.com"
          className={cn(inputClasses, errors.email ? "border-danger" : "border-border")}
        />
        {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
          Mesaj
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder="Ne konuşmak istersin?"
          className={cn(inputClasses, "resize-none", errors.message ? "border-danger" : "border-border")}
        />
        {errors.message && <p className="mt-1.5 text-xs text-danger">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" icon={<Send size={16} />} disabled={submitting}>
        {submitting ? "Gönderiliyor..." : "Mesajı Gönder"}
      </Button>
    </form>
  );
}
