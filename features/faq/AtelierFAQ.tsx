'use client'

// features/faq/AtelierFAQ.tsx
// Interactive accordion FAQ guide for collectors preparing for an atelier milestone with scroll animations

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  q: string
  a: string
  tag: string
}

const FAQS: FAQItem[] = [
  {
    tag: 'Kabul & Randevu',
    q: 'Atölyeye kabul ve randevu süreci nasıl işler?',
    a: 'Tuncay Gezer Atölyesi, her yıl sınırlı sayıda koleksiyoner kabul etmektedir. Web sitemizdeki konsültasyon formunu doldurduğunuzda, felsefi hikayeniz ve anatomik hedefleriniz bizzat sanatçı tarafından incelenir. Uygun bulunan projelere 48 saat içinde özel kabul daveti iletilir.',
  },
  {
    tag: 'Tasarım & Yöntem',
    q: 'Tasarım önceden mi çizilir, serbest el (freehand) mi uygulanır?',
    a: 'Hiçbir tasarım iki boyutlu kağıtta ya da ekranda tamamlanmaz. İlk konsültasyonda kavramsal tema kararlaştırıldıktan sonra, seans günü mermer çatlakları, drape hatları ve biyomekanik unsurlar doğrudan teninize, kaslarınızın hareket açılarına göre serbest el (freehand) olarak çizilir.',
  },
  {
    tag: 'Uluslararası Koleksiyonerler',
    q: 'Yurt dışından veya şehir dışından gelen koleksiyonerler için süreç nasıldır?',
    a: 'Koleksiyonerlerimizin %60’ı Zürih, Monaco, Londra, Berlin ve Milano gibi şehirlerden seyahat etmektedir. Bu misafirlerimiz için yoğunlaştırılmış seans blokları (ardışık 2-3 günlük seanslar) ve özel atölye karşılama protokolü uygulanmaktadır.',
  },
  {
    tag: 'Teknik & Kintsugi',
    q: 'Kintsugi altın hatları ve pigment kalitesi kalıcı mıdır?',
    a: 'Kullanılan pigmentler, tıbbi onaylı ve ağır metal içermeyen en üst segment formülasyonlardır. Altın ışıltısı hissi veren Kintsugi hatları, özel sıcak pigment karışımları ve derin mikro-gölgelendirme teknikleri ile derinin ikinci katmanına işlenerek ömür boyu parlaklığını korur.',
  },
  {
    tag: 'Ölçek & Süre',
    q: 'Büyük ölçekli bir başyapıt (kol, sırt, göğüs) kaç seans sürer?',
    a: 'Anatomik kapsama göre tam kol projeleri ortalama 4-5 seans (30-40 saat), tam sırt projeleri 6-8 seans (45-60 saat), tek bölge çalışmalar ise 2-3 seans sürmektedir. Her seans arasında cildin kendini yenilemesi için 3-4 haftalık iyileşme periyodu bırakılır.',
  },
  {
    tag: 'Yara İzi & Kintsugi',
    q: 'Ameliyat izleri veya kırılma hatları Kintsugi ile dönüştürülebilir mi?',
    a: 'Kintsugi felsefesinin kalbi tam olarak budur. Bedeninizdeki yara izleri, ameliyat hatları veya geçmişin izleri gizlenmez; aksine altın kırılma hatları ve mermer rölyefleriyle hayatınızın en asil güç sembolüne dönüştürülür.',
  },
]

export function AtelierFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-deep-obsidian text-white overflow-hidden border-t border-white/5"
      aria-label="Koleksiyoner Sıkça Sorulan Sorular"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
            <span className="font-syne text-[8.5px] md:text-[9.5px] tracking-[0.35em] text-gold uppercase font-medium">
              Koleksiyoner Rehberi · Sıkça Sorulanlar
            </span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
            Merak Edilen <span className="text-gold-gradient italic">Atölye Detayları</span>
          </h2>
          <p className="font-inter text-xs sm:text-sm text-white/60 font-light max-w-xl mt-4 leading-relaxed">
            Dönüşüm seansınız öncesinde bilmeniz gereken tüm sanatsal ve operasyonel prensipler.
          </p>
        </motion.div>

        {/* Accordion List with Staggered Scroll Transitions */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  rounded-2xl border border-white/10
                  bg-gradient-to-b from-white/[0.03] to-transparent
                  overflow-hidden transition-all duration-300
                  hover:border-gold/40 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]
                "
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 md:p-7 flex items-start justify-between gap-3 sm:gap-4 text-left cursor-pointer"
                  data-interactive="true"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="font-syne text-[8.5px] sm:text-[9px] tracking-[0.25em] text-gold uppercase font-medium">
                      {faq.tag}
                    </span>
                    <h3 className="font-cinzel text-sm sm:text-base md:text-lg text-white font-medium hover:text-gold transition-colors">
                      {faq.q}
                    </h3>
                  </div>

                  <span
                    className={`
                      w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10
                      flex items-center justify-center shrink-0
                      text-gold text-xs sm:text-sm transition-all duration-300
                      ${isOpen ? 'rotate-180 bg-gold/15 border-gold/50 shadow-[0_0_12px_rgba(212,175,55,0.4)]' : ''}
                    `}
                  >
                    ↓
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-7 pb-4 sm:pb-7 pt-1 border-t border-white/5">
                        <p className="font-inter text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
