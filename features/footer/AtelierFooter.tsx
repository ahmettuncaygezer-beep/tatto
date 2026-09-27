'use client'

// features/footer/AtelierFooter.tsx
// Comprehensive luxury footer with atelier ethics, navigation, studio location, and contact protocol

import { motion } from 'framer-motion'

export function AtelierFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-black text-white border-t border-white/10 pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-10 md:px-16"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Column (2 cols wide) */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-cinzel text-3xl font-bold tracking-[0.15em] text-gold">
                TG
              </span>
              <div className="w-px h-7 bg-white/20" aria-hidden="true" />
              <div className="font-syne text-xs tracking-[0.3em] text-white/80 uppercase">
                ARTIST OFFICE
              </div>
            </div>

            <p className="font-cinzel text-sm text-gold/90 italic mt-2">
              &ldquo;You are not just skin. You are a living monument.&rdquo;
            </p>

            <p className="font-inter text-xs text-white/50 font-light leading-relaxed max-w-sm mt-1">
              Antik mermer heykel disiplini, Kintsugi felsefesi ve sibernetik biyomekanik anatomiyi insan teninde birleştiren özel heykeltıraşlık atölyesi.
            </p>

            <div className="flex items-center gap-2 mt-4 text-[10px] font-syne text-gold/80 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>2026 Sezonu Sınırlı Kabul Açık</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-syne text-[10px] tracking-[0.3em] text-gold uppercase font-semibold mb-2">
              Keşfet
            </h4>
            <a href="#hero" className="font-inter text-xs text-white/60 hover:text-gold transition-colors">
              Giriş & Ambiyans
            </a>
            <a href="#canvas" className="font-inter text-xs text-white/60 hover:text-gold transition-colors">
              Anatomik Tuval (Reveal)
            </a>
            <a href="#portfolio" className="font-inter text-xs text-white/60 hover:text-gold transition-colors">
              Başyapıtlar Galerisi
            </a>
            <a href="#process" className="font-inter text-xs text-white/60 hover:text-gold transition-colors">
              4 Aşamalı Ritüel
            </a>
            <a href="#manifesto" className="font-inter text-xs text-white/60 hover:text-gold transition-colors">
              Atölye Manifestosu
            </a>
            <a href="#faq" className="font-inter text-xs text-white/60 hover:text-gold transition-colors">
              Koleksiyoner SSS
            </a>
          </div>

          {/* Disciplines Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-syne text-[10px] tracking-[0.3em] text-gold uppercase font-semibold mb-2">
              Disiplinler
            </h4>
            <span className="font-inter text-xs text-white/60">
              Biyomekanik Form
            </span>
            <span className="font-inter text-xs text-white/60">
              Antik Mermer Rölyef
            </span>
            <span className="font-inter text-xs text-white/60">
              Kintsugi Altın Felsefesi
            </span>
            <span className="font-inter text-xs text-white/60">
              Serbest El (Freehand)
            </span>
            <span className="font-inter text-xs text-white/60">
              Büyük Ölçekli Heykel
            </span>
          </div>

          {/* Location & Studio Hours Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-syne text-[10px] tracking-[0.3em] text-gold uppercase font-semibold mb-2">
              Özel Ofis
            </h4>
            <p className="font-inter text-xs text-white/60 leading-relaxed">
              Nişantaşı / Beşiktaş<br />
              İstanbul, Türkiye
            </p>
            <p className="font-inter text-xs text-white/40 mt-1">
              Yalnızca randevu ile kabul edilen tek kişilik çalışma mahremiyeti.
            </p>
            <p className="font-syne text-[10px] text-gold/80 tracking-wider uppercase mt-2">
              Salı – Pazar · 11:00 – 19:00
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p className="font-inter text-[11px]">
            © {new Date().getFullYear()} Tuncay Gezer — Artist Office. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 font-syne text-[10px] tracking-widest uppercase">
            <a href="#consultation" className="hover:text-gold transition-colors">
              Gizlilik & Mahremiyet
            </a>
            <span className="text-white/20">·</span>
            <a href="#consultation" className="hover:text-gold transition-colors">
              Kabul Protokolü
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
