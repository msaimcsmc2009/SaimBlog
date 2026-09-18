# Saim — Kişisel Blog & Portfolyo

Yazılım geliştirici olarak fikirleri çalışan yazılıma dönüştürdüğüm projeleri, öğrenim günlüklerimi ve iletişim kanallarımı barındıran bloklama sitesi.

## Teknolojiler

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- MDX (blog yazıları)
- Framer Motion (animasyonlar)

## Geliştirme

```bash
npm install
npm run dev
```

`http://localhost:3000` adresinde açılır.

## Scripts

| Komut          | Açıklama                        |
| -------------- | ------------------------------- |
| `npm run dev`  | Geliştirme sunucusunu başlat    |
| `npm run build`| Üretim build'i al              |
| `npm start`    | Build'i sun                     |
| `npm run lint` | ESLint ile kodu denetle         |

## Proje yapısı

```
content/blog/          Blog yazıları (MDX, front-matter: title/excerpt/date/category)
public/fotolar/        Proje görselleri
src/app/               Sayfa rotaları (App Router)
src/components/        UI ve bölüm bileşenleri
src/lib/site-config.ts Site bilgileri (ad, e-posta, sosyal bağlantılar, URL)
src/lib/projects.ts    Proje listesi (slug, görsel, linkler, hikâye)
src/lib/blog.ts        MDX içerik okuma / okuma süresi
```

## İçerik ekleme

- **Blog yazısı:** `content/blog/` altına `.mdx` dosyası ekle (örn. `yeni-yazi.mdx`).
- **Proje:** `src/lib/projects.ts` listesine kayıt ekle.
- **Site bilgileri:** `src/lib/site-config.ts` üzerinden güncelle.