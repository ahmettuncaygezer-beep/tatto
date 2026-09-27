// shared/types/index.ts
// Domain models, hotspot matrices, Zod validation schemas

import { z } from 'zod'
// ─────────────────────────────────────────────
// Anatomical Hotspot Domain Model
// ─────────────────────────────────────────────

export interface AnatomicalHotspot {
  id: string
  title: string
  subtitle: string
  position: {
    top: string
    left: string
  }
  painLevel: string
  healingTime: string
  note: string
  portfolioPieces: PortfolioPiece[]
}

export interface PortfolioPiece {
  id: string
  label: string
  description: string
  zone: string
}

// ─────────────────────────────────────────────
// Consultation Form — Zod Schemas
// ─────────────────────────────────────────────

export const AnatomicalZoneSchema = z.enum(
  [
    'chest-core',
    'cervical-conduit',
    'deltoid-architecture',
    'untouched-canvas',
    'abdominal-fissure',
  ],
  { errorMap: () => ({ message: 'Lütfen bir tuval alanı seçiniz.' }) }
)
export type AnatomicalZone = z.infer<typeof AnatomicalZoneSchema>

export const SessionScaleSchema = z.enum(
  ['single-session', 'large-scale', 'body-concept'],
  { errorMap: () => ({ message: 'Lütfen bir seans ölçeği seçiniz.' }) }
)
export type SessionScale = z.infer<typeof SessionScaleSchema>

export const ConsultationFormSchema = z.object({
  // Step 1
  zone: AnatomicalZoneSchema,
  // Step 2
  milatDate: z.string().min(1, 'Lütfen kişisel milat tarihinizi seçiniz.'),
  // Step 3
  philosophy: z
    .string()
    .min(20, 'Lütfen felsefenizi ve hikayenizi en az 20 karakterle açıklayınız.')
    .max(1000),
  // Step 4
  sessionScale: SessionScaleSchema,
  // Step 5
  name: z.string().min(2, 'Lütfen adınızı ve soyadınızı giriniz.'),
  phone: z.string().regex(/^[+\d\s\-()]{7,20}$/, 'Lütfen geçerli bir telefon numarası giriniz.'),
  email: z.string().email('Lütfen geçerli bir e-posta adresi giriniz.'),
  city: z.string().min(2, 'Lütfen bulunduğunuz şehri giriniz.'),
})

export type ConsultationFormData = z.infer<typeof ConsultationFormSchema>

// Partial for step-by-step validation
export const Step1Schema = ConsultationFormSchema.pick({ zone: true })
export const Step2Schema = ConsultationFormSchema.pick({ milatDate: true })
export const Step3Schema = ConsultationFormSchema.pick({ philosophy: true })
export const Step4Schema = ConsultationFormSchema.pick({ sessionScale: true })
export const Step5Schema = ConsultationFormSchema.pick({
  name: true,
  phone: true,
  email: true,
  city: true,
})

// ─────────────────────────────────────────────
// The 5 Anatomical Hotspot Matrix (Canonical)
// ─────────────────────────────────────────────

export const ANATOMICAL_HOTSPOTS: AnatomicalHotspot[] = [
  {
    id: 'chest-core',
    title: 'Açık Göğüs & Biyomekanik Çekirdek',
    subtitle: 'The Epiphany Core',
    position: { top: '54%', left: '56%' },
    painLevel: '5.0 / 5 — Zirve Hassasiyet',
    healingTime: '18 – 24 Gün',
    note: 'Kabuğu kırmak irade ister. Buradaki ışık hatları, kişinin en derin zihinsel miladıdır.',
    portfolioPieces: [
      { id: 'cc-1', label: 'Biyomekanik Sternum', description: 'Glowing neural core', zone: 'chest-core' },
      { id: 'cc-2', label: 'Kintsugi Göğüs', description: 'Gold-veined cracked marble', zone: 'chest-core' },
    ],
  },
  {
    id: 'cervical-conduit',
    title: 'Şahdamarı & Boyun Lifleri',
    subtitle: 'Cervical Conduit',
    position: { top: '32%', left: '42%' },
    painLevel: '4.5 / 5 — Yüksek Sinir Yoğunluğu',
    healingTime: '10 – 14 Gün',
    note: 'Zihinsel uyanışın omurgaya bağlandığı hat. Dış dünyaya karşı tavizsiz kimlik duruşu.',
    portfolioPieces: [
      { id: 'cer-1', label: 'Servikal Devre', description: 'Neural fiber mapping', zone: 'cervical-conduit' },
      { id: 'cer-2', label: 'Karotis Arteri Haritası', description: 'Anatomical blackwork', zone: 'cervical-conduit' },
    ],
  },
  {
    id: 'deltoid-architecture',
    title: 'Sol Pazu & Mekanik Silindirler',
    subtitle: 'Deltoid Architecture',
    position: { top: '58%', left: '78%' },
    painLevel: '2.5 / 5 — Dengeli / Dayanıklı',
    healingTime: '7 – 10 Gün',
    note: 'Heykelsi anatominin gravür detaylarıyla buluştuğu en asil hareket alanı.',
    portfolioPieces: [
      { id: 'del-1', label: 'Mekanik Silindir', description: 'Sculptural deltoid biomechanics', zone: 'deltoid-architecture' },
      { id: 'del-2', label: 'Gravür Detay', description: 'Baroque engraving pattern', zone: 'deltoid-architecture' },
    ],
  },
  {
    id: 'untouched-canvas',
    title: 'Dokunulmamış Mermer Göğüs',
    subtitle: 'The Untouched Canvas',
    position: { top: '50%', left: '34%' },
    painLevel: '3.8 / 5 — Kemik Titreşimi',
    healingTime: '12 – 14 Gün',
    note: 'Her heykel önce saf ve dokunulmamış bir taştır. Henüz işlenmemiş potansiyeli bekleyen saf tuval.',
    portfolioPieces: [
      { id: 'uc-1', label: 'Mermer Tuval', description: 'Virgin marble study', zone: 'untouched-canvas' },
      { id: 'uc-2', label: 'Saf Form', description: 'Negative space mastery', zone: 'untouched-canvas' },
    ],
  },
  {
    id: 'abdominal-fissure',
    title: 'Alt Karın & Kintsugi Kırılma Hattı',
    subtitle: 'Abdominal Fissure',
    position: { top: '67%', left: '39%' },
    painLevel: '4.8 / 5 — Yoğun Esneme',
    healingTime: '14 – 20 Gün',
    note: 'Yara izlerinin altın varak ve gölgeyle bir güç sembolüne dönüştürüldüğü Kintsugi alanı.',
    portfolioPieces: [
      { id: 'ab-1', label: 'Kintsugi Kırılma', description: 'Gold-repaired fissure lines', zone: 'abdominal-fissure' },
      { id: 'ab-2', label: 'Abdominal Harita', description: 'Anatomical scar transformation', zone: 'abdominal-fissure' },
    ],
  },
]

