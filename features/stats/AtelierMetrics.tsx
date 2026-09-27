'use client'

// features/stats/AtelierMetrics.tsx
// Atelier standards, metrics, and core craftsmanship figures with staggered scroll reveals

import { motion } from 'framer-motion'

const METRICS = [
  {
    value: '1 / 1',
    label: 'TEK NÜSHA',
    sub: 'Asla Kopyalanmayan Eserler',
    desc: 'Her tasarım yalnızca tek bir koleksiyonerin tenine özel üretilir. Katalog veya kopya dövme yapılmaz.',
  },
  {
    value: '14+',
    label: 'YILLIK USTALIK',
    sub: 'Anatomik Heykel & Biyomekanik',
    desc: 'Güzel sanatlar heykeltıraşlık disiplini ile dövme zanaatının 14 yılı aşkın eşsiz sentezi.',
  },
  {
    value: '420+',
    label: 'ÖZEL SEANS',
    sub: 'Uluslararası Koleksiyoner Arşivi',
    desc: 'Monaco, Londra, Zürih, Milano ve İstanbul’dan seçkin sanat koleksiyonerleri.',
  },
  {
    value: '%100',
    label: 'MAHREMİYET',
    sub: 'Tek Kişilik Atölye İzolasyonu',
    desc: 'Seans günü atölye yalnızca size tahsis edilir; dış dünyadan tamamen izole bir sanat deneyimi.',
  },
]

export function AtelierMetrics() {
  return (
    <section
      className="relative py-16 sm:py-20 px-4 sm:px-10 md:px-16 bg-black border-y border-white/5 overflow-hidden"
      aria-label="Atölye Standartları"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 md:gap-10">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl
                bg-white/[0.02] border border-white/5 hover:border-gold/30
                transition-all duration-300 hover:-translate-y-1.5
                hover:shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.1)]
              "
              data-interactive="true"
            >
              <span className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-gold font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300">
                {metric.value}
              </span>
              <span className="font-syne text-[11px] tracking-[0.25em] text-white uppercase font-semibold mt-3 group-hover:text-gold transition-colors">
                {metric.label}
              </span>
              <span className="font-syne text-[9px] tracking-[0.15em] text-gold/75 uppercase mt-1">
                {metric.sub}
              </span>
              <div className="w-8 h-px bg-gold/30 my-3.5 group-hover:w-16 transition-all duration-300" />
              <p className="font-inter text-xs text-white/50 font-light leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
