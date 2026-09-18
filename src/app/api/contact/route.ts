import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const { name, email, message, website } = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };

  if (website && website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Lütfen adını gir." }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Geçerli bir e-posta adresi gir." }, { status: 400 });
  }

  if (!message || message.trim().length < 10) {
    return NextResponse.json({ error: "Mesajın en az 10 karakter olmalı." }, { status: 400 });
  }

  // TODO: Gerçek bir e-posta servisine (Resend, Postmark vb.) bağla.
  // Not: Buradan success dönmek yalnızca istemciye "alındı" mesajı verir;
  // mesaj gönderimi servis bağlanınca tamamlanacak.

  return NextResponse.json({ success: true });
}
