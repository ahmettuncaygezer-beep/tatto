// shared/lib/portfolio-data.ts
// Master portfolio pieces archive with anatomical metadata, collector notes, and image paths

import { PORTFOLIO_ASSETS } from './assets'

export interface PortfolioMasterpiece {
  id: string
  collectorCode: string
  title: string
  subtitle: string
  category: 'all' | 'biomechanical' | 'kintsugi' | 'sculpture' | 'large-scale'
  categoryLabel: string
  zone: string
  origin: string
  sessions: string
  specs: string
  story: string
  image: string
  palette: string[]
  featured?: boolean
}

export const PORTFOLIO_MASTERPIECES: PortfolioMasterpiece[] = [
  {
    id: 'david-biomech',
    collectorCode: '#TG-8802',
    title: "David'in Uyanışı",
    subtitle: 'Michelangelo Mermeri & Sibernetik Anatomi',
    category: 'biomechanical',
    categoryLabel: 'Biyomekanik & Heykel',
    zone: 'Tam Kol & Ön Kol',
    origin: 'Zürich, İsviçre',
    sessions: '4 Seans · 32 Saat',
    specs: '0.25mm 3RL Bugpin · 24K Altın Pigment',
    story:
      "Michelangelo'nun David heykelinin çatlayan mermer silüeti, omuzdan alt kola doğru inen hassas hidrolik pistonlar ve saat mekanizmaları ile birleşir. Kintsugi altın çatlakları, sanatçının mermer tenine hayat verirken bedenin bir tapınak değil, yeniden inşa edilen yaşayan bir heykel olduğunu simgeler.",
    image: PORTFOLIO_ASSETS.biomechanicalSleeve,
    palette: ['Obsidyen Karası', '24K Altın Varak', 'Mermer Grisi', 'Bronz Hidrolik'],
    featured: true,
  },
  {
    id: 'aegis-kintsugi-spine',
    collectorCode: '#TG-9140',
    title: 'Aegis & Kintsugi Omurga',
    subtitle: 'Antik Zeus Büstü & Kutsal Omurga Hattı',
    category: 'kintsugi',
    categoryLabel: 'Kintsugi & Büyük Ölçek',
    zone: 'Tam Sırt & Omurga Hattı',
    origin: 'Monaco',
    sessions: '6 Seans · 48 Saat',
    specs: '0.30mm Curved Magnum · Saf Altın Varak Tekniği',
    story:
      'Sırt omurgası boyunca yükselen antik Zeus heykeli büstü, derin altın Kintsugi kırılma hatları ve barok filigran oymalar ile donatılmıştır. Omurların her biri, mekanik sibernetik kemik mimarisiyle deriye kök salarak koleksiyonerin zihinsel miladını mühürler.',
    image: PORTFOLIO_ASSETS.kintsugiSpine,
    palette: ['24K Saf Altın', 'Kömür Siyahı', 'Carrara Mermer Beyazı', 'Filigran Gölgelendirme'],
    featured: true,
  },
  {
    id: 'chronos-chest',
    collectorCode: '#TG-7731',
    title: 'Kronos & Bedenin Mimarisi',
    subtitle: 'Antik Büst & Sternum Zaman Çarkı',
    category: 'sculpture',
    categoryLabel: 'Antik Heykel & Zaman Çarkı',
    zone: 'Göğüs, Omuz & Sternum',
    origin: 'Londra, Birleşik Krallık',
    sessions: '3 Seans · 24 Saat',
    specs: 'Micro-shader · 0.20mm Bugpin İğne',
    story:
      'Omuz başına yerleşen antik mermer büst, köprücük kemiğinden geçen altın kırılma hattıyla göğüs merkezindeki açık saat dişlileri ve zaman çarkına bağlanır. Zamanın bedeni aşındırmasına karşılık, sanatın o aşınmayı ebedileştirmesinin manifestosudur.',
    image: PORTFOLIO_ASSETS.sculptureChest,
    palette: ['Altın Kırılma', 'Mermer Yontu Grisi', 'Titanyum Çark Tonu', 'Derin Gölge'],
    featured: true,
  },
  {
    id: 'gothic-tendon',
    collectorCode: '#TG-6509',
    title: 'Gotik Katedral & Kas Lifleri',
    subtitle: 'Anatomik Kas Katmanları & Tourbillon Dişlileri',
    category: 'biomechanical',
    categoryLabel: 'Biyomekanik Mikro-Detay',
    zone: 'Ön Kol & Bilek',
    origin: 'İstanbul, Türkiye',
    sessions: '2 Seans · 16 Saat',
    specs: '1RL Tek İğne Gravür · Kintsugi Altın Hat',
    story:
      'Ön kol kas anatomisinin derinliklerine inen gotik katedral vitray kemeri ve tourbillon saat mekanizması; altın çatlaklarla deriye nefes aldırır. Kas her gerildiğinde dişliler ve mimari kemerler optik olarak hareket eder.',
    image: PORTFOLIO_ASSETS.cyberneticArm,
    palette: ['Gotik Obsidyen', 'Tourbillon Altını', 'Kas Doku Grisi', 'Vitray Işıltısı'],
    featured: false,
  },
  {
    id: 'aphrodite-sacred-geometry',
    collectorCode: '#TG-9944',
    title: 'Afrodit & Kutsal Geometri',
    subtitle: 'Neoklasik Tanrıça & Fraktal Mandala',
    category: 'large-scale',
    categoryLabel: 'Neoklasik Heykel & Geometri',
    zone: 'Tam Kol Kapsamı',
    origin: 'Milano, İtalya',
    sessions: '5 Seans · 40 Saat',
    specs: 'Opak Gri Tonlama · Altın Çatlak İllüstrasyonu',
    story:
      'Neoklasik mermer tanrıça büstünün yumuşak drape kumaşları, alt kolda fraktal kutsal geometri mandalaları ile birleşerek zamanın ötesinde bir dinginlik ve matematiksel estetik yaratır.',
    image: PORTFOLIO_ASSETS.neoclassicalSleeve,
    palette: ['Carrara Beyazı', 'Geometrik Siyah', '24K Altın Damar', 'Mat Gri'],
    featured: false,
  },
  {
    id: 'corinthian-hydraulics',
    collectorCode: '#TG-8120',
    title: 'Korint Sütunu & Titanyum Piston',
    subtitle: 'Klasik Mimari Kolon & Bacak Dinamiği',
    category: 'biomechanical',
    categoryLabel: 'Mimari Kolon & Biyomekanik',
    zone: 'Kaval Kemiği & Baldır',
    origin: 'Berlin, Almanya',
    sessions: '3 Seans · 22 Saat',
    specs: 'Heavy Blackwork & Altın Damar Dikişi',
    story:
      'Antik Roma Korint mermer sütununun içinden çıkan titanyum amortisör ve kas lifleri, yürüyüş esnasında bacak kaslarının dinamik hareketiyle hayat bulur. Taş ve makine insan bedeninde tek vücut olur.',
    image: PORTFOLIO_ASSETS.biomechLeg,
    palette: ['Korint Taşı', 'Titanyum Gri', 'Altın Harç', 'Derin Blackwork'],
    featured: false,
  },
]

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'TÜM ESERLER' },
  { id: 'biomechanical', label: 'BİYOMEKANİK' },
  { id: 'kintsugi', label: 'KINTSUGI & ALTIN' },
  { id: 'sculpture', label: 'ANTİK HEYKEL' },
  { id: 'large-scale', label: 'BÜYÜK ÖLÇEK' },
] as const
