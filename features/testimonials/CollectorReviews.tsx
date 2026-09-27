'use client'

// features/testimonials/CollectorReviews.tsx
// Exclusive reflections and testimonials from global art collectors with staggered scroll animations

import { motion } from 'framer-motion'

const REVIEWS = [
  {
    quote:
      'Mermer bir heykelin tenimde nefes aldığını hissetmek inanılmaz bir dönüşüm. Tuncay Gezer sadece bir dövme sanatçısı değil; yaşayan insan anatomisinin heykeltıraşıdır.',
    collector: 'Dr. Alexander V.',
    city: 'Zürih, İsviçre',
    piece: "David'in Uyanışı — Biyomekanik Kol",
    code: '#TG-8802',
  },
  {
    quote:
      'Omurgam boyunca işlenen Kintsugi altın hatları, hayatımın en zorlu kırılma anını en büyük güç anıtıma dönüştürdü. Seanslardaki odak ve atölye sessizliği benzersizdi.',
    collector: 'Julian M.',
    city: 'Monaco',
    piece: 'Aegis & Kintsugi Omurga',
    code: '#TG-9140',
  },
  {
    quote:
      'Serbest el (freehand) çalışma sırasında kaslarımın her gerilme açısını gotik katedral kemerleriyle senkronize etti. Tenimde bir dövme değil, yaşayan bir müze eseri taşıyorum.',
    collector: 'Kerem B.',
    city: 'İstanbul, Türkiye',
    piece: 'Gotik Katedral & Kas Lifleri',
    code: '#TG-6509',
  },
]

export function CollectorReviews() {
  return (
    <section
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-obsidian text-white overflow-hidden border-t border-white/5"
      aria-label="Koleksiyoner Mektupları"
    >
      <div className="max-w-7xl mx-auto">
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
              Koleksiyoner Deneyimleri · Mektuplar
            </span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
            Yaşayan Anıtların <span className="text-gold-gradient italic">Hikayeleri</span>
          </h2>
          <p className="font-inter text-xs sm:text-sm text-white/60 font-light max-w-xl mt-4 leading-relaxed">
            Her seans, sanatçı ve koleksiyoner arasında paylaşılan derin bir güven ve felsefi yolculuktur.
          </p>
        </motion.div>

        {/* Reviews Grid with Staggered Scroll Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.collector}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group flex flex-col justify-between p-6 sm:p-8 rounded-2xl md:rounded-3xl
                bg-gradient-to-b from-white/[0.04] to-transparent
                border border-white/10 hover:border-gold/40 transition-all duration-500
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)]
                hover:-translate-y-2
              "
              data-interactive="true"
            >
              <div>
                <span className="font-cinzel text-4xl text-gold/40 select-none block leading-none mb-3 group-hover:text-gold transition-colors duration-300">
                  &ldquo;
                </span>
                <p className="font-inter text-xs sm:text-sm text-white/80 font-light leading-relaxed italic">
                  {review.quote}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-cinzel text-sm text-white font-semibold group-hover:text-gold transition-colors duration-300">
                      {review.collector}
                    </h4>
                    <p className="font-syne text-[10px] text-gold/75 tracking-wider uppercase mt-0.5">
                      {review.city}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest">
                    {review.code}
                  </span>
                </div>
                <p className="font-syne text-[9px] text-white/40 uppercase tracking-widest mt-2">
                  Eser: {review.piece}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
