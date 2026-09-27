'use client'

// features/process/AtelierProcess.tsx
// 4-Stage Architectural Transformation Ritual: from psychological milestone to permanent living sculpture

import { motion } from 'framer-motion'

const PROCESS_STEPS = [
  {
    step: '01',
    roman: 'I',
    title: 'Anatomik Tarama & Zihinsel Milat',
    subtitle: 'The Psychological Catalyst',
    desc: 'İlk temas bir dövme randevusu değil, felsefi bir keşiftir. Koleksiyonerin hayatındaki kırılma noktaları, aşınma izleri ve taşımak istediği irade; bedeninin kas morfolojisi ve kemik açılarıyla birlikte analiz edilir.',
    tag: 'Felsefe & Teşhis',
    detail: '120 Dakika Özel Konsültasyon',
  },
  {
    step: '02',
    roman: 'II',
    title: '3D Heykel Çizimi & Beden Haritalama',
    subtitle: 'Freehand Anatomical Sculpting',
    desc: 'Şablon veya hazır dijital kalıplar asla kullanılmaz. Antik mermer drape kumaşları, katedral kemerleri ve biyomekanik hatlar doğrudan koleksiyonerin tenine, kasların esneme ve kasılma dinamiklerine göre canlı olarak çizilir.',
    tag: 'Serbest El (Freehand)',
    detail: '1/1 Özgün Anatomik Taslak',
  },
  {
    step: '03',
    roman: 'III',
    title: 'İğne, Gölge & Altın Füzyonu',
    subtitle: 'The Needle & Kintsugi Ritual',
    desc: 'Mikro-cerrahi hassasiyetindeki tek iğne (1RL/3RL) gravür teknikleriyle derin siyah gölgeler tenin katmanlarına işlenir. Bedenin kırılma hatlarına 24K saf altın pigment dikişleri mühürlenir.',
    tag: 'Mikro-Gravür & Kintsugi',
    detail: 'Özel İzolasyon Seansı',
  },
  {
    step: '04',
    roman: 'IV',
    title: 'Yaşayan Anıt & İyileşme',
    subtitle: 'The Permanent Living Monument',
    desc: 'Deri iyileştikçe pigmentler kas lifleriyle tek vücut haline gelir. Koleksiyoner artık sadece bir dövme taşımaz; zamanla aşınan fakat sanatla ebedi bir güce dönüşen yaşayan bir heykelin koruyucusu olur.',
    tag: 'Ebedi Sanat Eseri',
    detail: 'Kişisel Bakım & Sertifika',
  },
]

export function AtelierProcess() {
  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-deep-obsidian text-white overflow-hidden border-t border-white/5"
      aria-label="Atölye Dönüşüm Süreci"
    >
      {/* Background Subtle Ambience */}
      <div
        className="absolute top-1/2 -left-40 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
            <span className="font-syne text-[8.5px] md:text-[9.5px] tracking-[0.35em] text-gold uppercase font-medium">
              Sanat Yolculuğu · Dönüşüm Ritüeli
            </span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight max-w-3xl leading-[1.15]">
            Taştan Bedenine: <br className="hidden sm:inline" />
            <span className="text-gold-gradient italic font-medium">4 Aşamalı Heykel Protokolü</span>
          </h2>

          <p className="font-inter text-xs sm:text-sm md:text-base text-white/60 font-light max-w-2xl mt-4 sm:mt-5 leading-relaxed">
            Tuncay Gezer atölyesinde dövme bir uygulama değil; zihinsel bir miladın bedende yaşayan bir heykele dönüştürülme ritüelidir.
          </p>

          <div className="flex items-center gap-3 mt-6 sm:mt-8 opacity-75" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-xs text-gold">◈</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>

        {/* 4-Step Process Grid with Staggered Scroll Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group relative flex flex-col justify-between
                p-5 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                bg-gradient-to-b from-white/[0.04] to-transparent
                border border-white/10 hover:border-gold/40
                transition-all duration-500
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.1)]
                hover:-translate-y-2
              "
              data-interactive="true"
            >
              <div>
                {/* Header: Roman Numeral & Step Index */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-cinzel text-2xl text-gold font-bold group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                    {step.roman}
                  </span>
                  <span className="font-mono text-xs tracking-widest text-white/30 group-hover:text-gold transition-colors">
                    AŞAMA {step.step}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <p className="font-syne text-[9px] tracking-[0.25em] text-gold/80 uppercase font-semibold mb-2">
                  {step.subtitle}
                </p>
                <h3 className="font-cinzel text-lg sm:text-xl text-white font-semibold leading-snug group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Narrative description */}
                <p className="font-inter text-xs text-white/60 font-light mt-4 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-syne">
                  <span className="text-white/40 uppercase tracking-wider">Yöntem:</span>
                  <span className="text-gold/90 font-medium">{step.tag}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-syne">
                  <span className="text-white/40 uppercase tracking-wider">Kapsam:</span>
                  <span className="text-white/70">{step.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
