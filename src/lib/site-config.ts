export const siteConfig = {
  name: "Saim",
  fullName: "M. Saim",
  role: "Yazılım Geliştirici",
  tagline: "Lise son sınıf öğrencisiyim ve yazılım geliştiriyorum.",
  description:
    "SaaS fikirlerini ve mobil uygulamaları uçtan uca kodluyorum; her projede öğrendiklerimi burada belgeliyorum.",
  url: "https://saim.dev",
  email: "msaimcsmc2009@gmail.com",
  location: "Türkiye",
  social: {
    github: "https://github.com/saim",
    linkedin: "https://linkedin.com/in/saim",
    twitter: "https://x.com/saim",
  },
  nav: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımda", href: "/hakkimda" },
    { label: "Projeler", href: "/projeler" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
