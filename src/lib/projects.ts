import { type ProjectStatus } from "@/components/ui/badge";

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  status: ProjectStatus;
  year: string;
  tech: string[];
  image?: string;
  links: {
    demo?: string;
    github?: string;
  };
  problem: string;
  solution: string;
  challenges: string;
  impact: string;
  gallery: string[];
};

// Projelerinizi buraya ekleyebilirsiniz.
// slug: URL'de görünecek benzersiz tanımlayıcı (örn: "projem")
// status: "canli" | "gelistiriliyor" | "mvp" | "konsept"
export const projects: Project[] = [
  {
    slug: "mun-konferans-sitesi", // veya konferansın adı: orn. "istmun-2026"                                                                                                                      
      title: "İLLUMMUN Resmi Sitesi",                                                                                                                                                     
      oneLiner: "Model Birleşmiş Milletler (MUN) konferansı için komite tanıtımları, başvuru süreci ve etkinlik programını sunan duyarlı web platformu.",                                            
      status: "canli",                                                                                                                                                                               
      year: "2026",                                                                                                                                                                                  
      tech: ["HTML5", "CSS3", "JavaScript"],
      image: "/fotolar/illumlogoprofilfoto.jpeg",
      links: {
        demo: "https://msaimcsmc2009.github.io/ILLUMMUN/",
        github: "https://github.com/msaimcsmc2009/ILLUMMUN",
      },                                                                                                                                                                                             
      problem: "Konferans öncesinde komite rehberlerini, kılık kıyafet kurallarını ve delege başvurularını yüzlerce katılımcıya düzenli bir şekilde ulaştırmak gerekiyordu.",                        
      solution: "Mobil uyumlu, hızlı açılan ve delegelerin ihtiyaç duyduğu tüm bilgileri (komiteler, program, başvuru formu) tek çatı altında toplayan bir web sitesi geliştirdim.",                 
      challenges: "Farklı komitelerin detaylı rehberlerini ve etkinlik akışını mobil cihazlarda da rahat okunabilir bir arayüzde düzenlemek üzerine çalıştım.",                                      
      impact: "Konferansa katılan delegelerin başvuru yapmasını ve bilgilere hızlıca ulaşmasını sağlayarak organizasyon sürecini dijitalleştirdi.",                                                  
      gallery: [],
  },
  {
    slug: "oto-evrim",
    title: "Oto Evrim",
    oneLiner: "Arabaların geçmişten günümüze tarihsel evrimini ve teknik gelişimini anlatan okul projesi web sitesi.",
    status: "canli",
    year: "2026",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "/fotolar/arabaevrimilogopp.jpeg",
    links: {
      demo: "https://msaimcsmc2009.github.io/ProjeSitesi/",
      github: "https://github.com/msaimcsmc2009/ProjeSitesi",
    },
    problem: "Otomotiv tarihinin gelişim basamaklarını ve modellerin evrimini kullanıcıya sade, anlaşılır ve kronolojik bir akışla aktaran bir okul projesi ihtiyacı.",
    solution: "Düz HTML5, CSS3 ve JavaScript kullanarak harici kütüphane bağımlılığı olmayan, hafif, hızlı açılan ve arabaların dönemlere göre evrimini sunan bir web arayüzü geliştirdim.",
    challenges: "Saf CSS ve temel JavaScript ile farklı ekran boyutlarına uyumlu, görsel açıdan dengeli ve akıcı bir sayfa düzeni oluşturmak.",
    impact: "Okul projesi kapsamında başarıyla sunuldu ve otomotiv meraklıları için sade ve hızlı bir dijital rehber oldu.",
    gallery: [],
  },
  {
    slug: "ozmun",
    title: "OZMUN Resmi Konferans Sitesi",
    oneLiner: "Özel alan adı ve kapsamlı Google SEO yapılandırmasıyla yayına alınan, komite rehberleri ve başvuruları sunan resmi Model UN platformu.",
    status: "canli",
    year: "2026",
    tech: ["HTML5", "CSS3", "JavaScript", "SEO", "Custom Domain"],
    image: "/fotolar/ozmunlogopp.jpeg",
    links: {
      demo: "https://msaimcsmc2009.github.io/ozmuns/",
      github: "https://github.com/msaimcsmc2009/ozmuns",
    },
    problem: "Konferansın Google aramalarında üst sıralarda yer alması, özel alan adı ile profesyonel bir kurumsal kimlik kazanması ve delegelerin bilgilere kolayca ulaşması gerekiyordu.",
    solution: "Düz HTML5, CSS3 ve JavaScript ile hafif ve hızlı bir web platformu geliştirildi. Özel alan adı entegrasyonu, arama motoru optimizasyonu (SEO), meta etiketleri ve Google Search Console yapılandırmaları tamamlandı.",
    challenges: "Arama motoru indeksleme standartlarına tam uyum sağlamak, DNS yönlendirmelerini yapılandırmak ve arama sonuçlarında hızlıca görünürlük elde etmek.",
    impact: "Google üzerinde hedeflenen aramalarda görünürlük kazandı; özel alan adı desteğiyle konferansa prestij sağlayarak delege kayıt sürecini kolaylaştırdı.",
    gallery: [],
  },
  {
    slug: "randevu-takip-sistemi",
    title: "Randevu Takip Sistemi",
    oneLiner: "Kullanıcıların hesap oluşturup giriş yaparak kendi randevularını oluşturduğu, düzenlediği ve takip ettiği modern web uygulaması.",
    status: "gelistiriliyor",
    year: "2026",
    tech: ["Next.js", "HTML5", "CSS3", "JavaScript", "Supabase", "Vercel"],
    image: "/fotolar/randevutakiplogo.jpeg",
    links: {
      demo: "https://randevutakipsistem.vercel.app/",
      github: "https://github.com/msaimcsmc2009/RandevuTakipSistem",
    },
    problem: "Randevuları dijital ortamda düzenli bir şekilde yönetmek, takip etmek ve organize etmek için kullanıcı dostu bir web platformu ihtiyacı.",
    solution: "Next.js ve Supabase ile geliştirilen; kullanıcıların kayıt olup hesabına giriş yapabildiği, randevularını saklayıp yönetebildiği modern ve responsive bir randevu takip sistemi web uygulaması oluşturdum. Kayıt ve giriş işlemleri Supabase veritabanındaki kullanıcı hesapları üzerinden yürütülüyor.",
    challenges: "Supabase ile kullanıcı kayıt ve giriş (authentication) sistemini kurmak, her kullanıcının randevularını kendi hesabıyla güvenli şekilde veritabanında saklamak, kullanıcı arayüzünü sezgisel ve kullanışlı tasarlamak.",
    impact: "Kullanıcıların hesap oluşturarak kendi randevularını güvenle yönetebildiği, kişisel randevu takibini dijitalleştiren bir sistem sundu.",
    gallery: [],
  },
  {
    slug: "dukkan-sitesi",
    title: "Akdeniz Endustriyel Temizlik Kurumsal Web Sitesi",
    oneLiner: "Kendi işletmem olan parça yıkama, sulu kumlama ve partikül filtresi yıkama hizmetlerini tanıtan tamamen kurumsal web sitesi.",
    status: "gelistiriliyor",
    year: "2026",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "/fotolar/dukkanlogopp.jpeg",
    links: {
      demo: "https://msaimcsmc2009.github.io/DukkanSite/",
      github: "https://github.com/msaimcsmc2009/DukkanSite",
    },
    problem: "Kendi dükkanım için sunduğum parça yıkama, sulu (ıslak) kumlama ve partikül filtresi yıkama hizmetlerini müşterilere profesyonel ve kurumsal bir şekilde tanıtacak, hizmetlerimi anlatan güvenilir bir web sitesi ihtiyacı.",
    solution: "İşletmemi kurumsal bir kimlikle yansıtan; sunduğum hizmetleri, çalışma alanlarımı ve iletişim bilgilerimi düzenli bir şekilde sunan, mobil uyumlu ve hızlı açılan bir web sitesi geliştirdim.",
    challenges: "Parça yıkama, sulu kumlama ve partikül filtresi yıkama hizmetlerini ayırt edici, anlaşılır ve güven veren bir üslupla farklı ekran boyutlarında düzenli şekilde sergilemek.",
    impact: "Dükkanımın dijital bir vitrine kavuşmasını sağladı; müşteriler hizmetlerimi ve iletişim bilgilerime internet üzerinden kolayca ulaşabiliyor.",
    gallery: [],
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

const featuredOrder = ["randevu-takip-sistemi", "ozmun", "mun-konferans-sitesi"];

export function getFeaturedProjects(count = 3) {
  const ordered = featuredOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const rest = projects.filter((project) => !featuredOrder.includes(project.slug));
  return [...ordered, ...rest].slice(0, count);
}
