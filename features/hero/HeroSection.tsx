'use client'

// features/hero/HeroSection.tsx
// Fullscreen cinema-grade video hero with floating manifesto, responsive mobile-docked layout,
// mobile navigation drawer, smooth scroll parallax, and motion entrance transitions

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { AmbientAudio } from '@/features/audio/AmbientAudio'
import { CinemaHeroVideo } from '@/components/CinemaHeroVideo'
import { scrollToElement } from '@/shared/lib/utils'

interface HeroSectionProps {
  onScrollToCanvas: () => void
}

const NAV_ITEMS = [
  {
    roman: 'I',
    title: 'Anatomik Tuval',
    desc: 'Canlı Beden Heykeli',
    href: '#canvas',
  },
  {
    roman: 'II',
    title: 'Başyapıtlar',
    desc: 'Örnek Eserler & Galeri',
    href: '#portfolio',
  },
  {
    roman: 'III',
    title: 'Dönüşüm Ritüeli',
    desc: '4 Aşamalı Süreç & Felsefe',
    href: '#process',
  },
  {
    roman: 'IV',
    title: 'Konsültasyon',
    desc: 'Özel Tuval Başvurusu',
    href: '#consultation',
  },
]

export function HeroSection({ onScrollToCanvas }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll-driven parallax & smooth fade out for foreground typography
  const { scrollY } = useScroll()
  const heroContentY = useTransform(scrollY, [0, 500], [0, 90])
  const heroContentOpacity = useTransform(scrollY, [0, 420], [1, 0])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    scrollToElement(href)
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[640px] bg-black overflow-hidden flex flex-col justify-between"
      aria-label="Hero — Tuncay Gezer Atelier"
    >
      {/* ── 100% Fullscreen High-Definition Cinema Video Engine ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <CinemaHeroVideo>
          {/* Left Side Video Shadow — Precisely covers the Manifesto text zone without touching video center */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-[420px] xl:w-[480px] pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.50) 45%, rgba(0, 0, 0, 0.20) 75%, transparent 100%)',
            }}
          />
          {/* Right Side Video Shadow — Precisely covers the Navigation menu zone without touching video center */}
          <div
            className="hidden lg:block absolute inset-y-0 right-0 w-[380px] xl:w-[440px] pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(to left, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.50) 45%, rgba(0, 0, 0, 0.20) 75%, transparent 100%)',
            }}
          />

          {/* Mobile & Tablet Bottom Vignette Fade — Guarantees bottom typography is ultra-crisp while top 60% statue face remains unobstructed & brilliant */}
          <div
            className="lg:hidden absolute inset-x-0 bottom-0 h-[56%] pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.75) 45%, rgba(0, 0, 0, 0.1) 85%, transparent 100%)',
            }}
          />
        </CinemaHeroVideo>
      </div>

      {/* ── Foreground Content Layer (Smooth Scroll Parallax) ── */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 pointer-events-none"
      >
        {/* Top Header — Monogram & Controls */}
        <motion.header
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between pointer-events-auto"
          role="banner"
        >
          {/* Brand Monogram */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="#hero"
              className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.15em] text-gold hover:opacity-90 transition-opacity drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
              data-interactive="true"
              aria-label="Tuncay Gezer Ana Sayfa"
            >
              TG
            </a>
            <div className="w-px h-6 sm:h-7 bg-white/20" aria-hidden="true" />
            <div className="font-syne text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] text-white/80 uppercase">
              ARTIST OFFICE
            </div>
          </div>

          {/* Right Header Controls: Ambient Audio + Mobile Menu Pill */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <AmbientAudio />

            {/* Mobile / Tablet Menu Button (lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="
                lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full
                liquid-glass border border-white/10 hover:border-gold/40 text-gold
                font-syne text-[8.5px] sm:text-[9px] tracking-[0.25em] uppercase font-semibold
                transition-all duration-200
              "
              aria-label="Atölye Dizin Menüsünü Aç"
              data-interactive="true"
            >
              <span>DİZİN</span>
              <span className="text-xs">☰</span>
            </button>
          </div>
        </motion.header>

        {/* ── DESKTOP MIDDLE AREA (lg:flex) ── */}
        <div className="hidden lg:flex items-center justify-between my-auto w-full gap-6">
          {/* Left-Aligned Floating Manifesto — Pure Floating Typography */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative self-start pointer-events-auto flex flex-col items-start max-w-[280px] sm:max-w-[320px] select-none"
          >
            {/* Localized typography shadow — subtle, strictly behind manifesto text */}
            <div
              className="absolute -inset-6 -z-10 rounded-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 40% 50%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.20) 60%, transparent 100%)',
                filter: 'blur(20px)',
              }}
              aria-hidden="true"
            />
            {/* Atelier Eyebrow */}
            <div className="flex items-center gap-2 mb-2.5 pl-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
              <span className="font-syne text-[8.5px] tracking-[0.35em] text-gold uppercase font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                Anatomik Heykel Atölyesi
              </span>
            </div>

            {/* Vertical Stacked Manifesto Headline */}
            <h1 className="font-cinzel text-base sm:text-lg md:text-[21px] font-semibold tracking-tight text-white leading-[1.25] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              You are<br />
              not just skin.<br />
              <span className="text-gold-gradient italic block mt-0.5 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                You are a living monument.
              </span>
            </h1>

            {/* Harmonious Atelier Divider */}
            <div className="flex items-center gap-3 my-3 pl-0.5 pointer-events-none select-none" aria-hidden="true">
              <span className="h-[1px] w-4 bg-gradient-to-l from-gold/60 to-transparent" />
              <span className="text-[8px] text-gold filter drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]">◈</span>
              <span className="h-[1px] w-24 bg-gradient-to-r from-gold/60 via-gold/25 to-transparent" />
            </div>

            {/* Philosophy Subtitle */}
            <p className="font-inter text-[11px] md:text-[12px] text-white/80 leading-relaxed font-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
              Her beden bir tapınak değil; zamanla aşınan, çatlayan ve sanatla yeniden inşa edilen yaşayan bir heykeldir.
            </p>

            {/* Atelier Disciplines */}
            <div className="flex flex-col gap-1.5 my-3 pl-0.5">
              <div className="flex items-center gap-2.5 text-white/75 text-[10px] md:text-[10.5px] font-syne tracking-wider drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
                <span className="text-gold text-[7.5px]">◈</span>
                <span>Biyomekanik Form</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/75 text-[10px] md:text-[10.5px] font-syne tracking-wider drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
                <span className="text-gold text-[7.5px]">◈</span>
                <span>Antik Heykel Mimarisi</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/75 text-[10px] md:text-[10.5px] font-syne tracking-wider drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
                <span className="text-gold text-[7.5px]">◈</span>
                <span>Kintsugi Altın Felsefesi</span>
              </div>
            </div>

            {/* Harmonious Atelier Divider */}
            <div className="flex items-center gap-3 my-2.5 pl-0.5 pointer-events-none select-none" aria-hidden="true">
              <span className="h-[1px] w-4 bg-gradient-to-l from-gold/60 to-transparent" />
              <span className="text-[8px] text-gold filter drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]">◈</span>
              <span className="h-[1px] w-20 bg-gradient-to-r from-gold/60 via-gold/25 to-transparent" />
            </div>

            {/* Sleek CTA Action Link */}
            <a
              href="#canvas"
              onClick={(e) => {
                e.preventDefault()
                onScrollToCanvas()
              }}
              className="
                group inline-flex items-center gap-2.5 pt-1 pl-0.5
                text-gold font-syne text-[9.5px] tracking-[0.28em] uppercase font-semibold
                transition-all duration-300 hover:text-white hover:translate-x-1.5
              "
              data-interactive="true"
            >
              <span className="drop-shadow-[0_1px_8px_rgba(212,175,55,0.6)]">Tuvali İncele</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-y-0.5 text-gold group-hover:text-white">↓</span>
            </a>

            <span className="font-syne text-[8px] tracking-[0.3em] text-white/40 uppercase pl-0.5 mt-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
              Tuncay Gezer — Artist Office
            </span>
          </motion.div>

          {/* Right-Aligned Vertical Navigation Menu — Visible on lg+ to prevent crowding tablet center */}
          <motion.nav
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex flex-col self-start items-end pointer-events-auto select-none"
            aria-label="Atölye Menüsü"
          >
            {/* Localized typography shadow — subtle, strictly behind nav items */}
            <div
              className="absolute -inset-6 -z-10 rounded-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 50%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.20) 60%, transparent 100%)',
                filter: 'blur(20px)',
              }}
              aria-hidden="true"
            />
            {/* Minimalist Atelier Index Eyebrow */}
            <div className="flex items-center justify-end gap-2.5 mb-4 pr-1">
              <span className="font-syne text-[8.5px] tracking-[0.35em] text-gold uppercase font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                Atölye Dizin
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
            </div>

            {/* Vertical Navigation Items */}
            {NAV_ITEMS.map(({ roman, title, desc, href }, index) => (
              <div key={title} className="flex flex-col items-end">
                {index > 0 && (
                  <div
                    className="flex items-center justify-end gap-3 my-3.5 pr-1 pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    <span className="h-[1px] w-24 bg-gradient-to-l from-gold/60 via-gold/25 to-transparent" />
                    <span className="text-[8px] text-gold filter drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]">◈</span>
                    <span className="h-[1px] w-4 bg-gradient-to-r from-gold/60 to-transparent" />
                  </div>
                )}

                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToElement(href)
                  }}
                  className="
                    group flex flex-col items-end text-right py-1
                    transition-all duration-300 hover:-translate-x-2
                  "
                  data-interactive="true"
                >
                  <div className="flex items-center justify-end gap-3">
                    <span
                      className="
                        font-cinzel text-sm md:text-[15px] tracking-[0.15em] uppercase font-semibold
                        text-white/95 group-hover:text-gold transition-colors duration-300
                        drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]
                      "
                    >
                      {title}
                    </span>
                    <span
                      className="
                        font-cinzel text-xs md:text-sm text-gold font-bold
                        group-hover:text-amber transition-colors duration-300
                        drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]
                      "
                    >
                      {roman}
                    </span>
                  </div>
                  <span
                    className="
                      font-inter text-[10.5px] md:text-[11.5px] text-white/55 group-hover:text-white/90
                      transition-colors duration-300 tracking-wider mt-0.5 font-light
                      drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]
                    "
                  >
                    {desc}
                  </span>
                </a>
              </div>
            ))}
          </motion.nav>
        </div>

        {/* ── MOBILE & TABLET VIEW: Docked Bottom Manifesto Block (lg:hidden) ── */}
        {/* With justify-between, header is at top, manifesto is at bottom, leaving center statue 100% unobstructed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden pointer-events-auto flex flex-col items-start w-full sm:max-w-xl select-none shrink-0 p-4 sm:p-5 rounded-2xl bg-black/55 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] mb-1"
        >
          {/* Atelier Eyebrow */}
          <div className="flex items-center gap-2 mb-1.5 pl-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
            <span className="font-syne text-[8px] sm:text-[8.5px] tracking-[0.35em] text-gold uppercase font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              Anatomik Heykel Atölyesi
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-cinzel text-base sm:text-lg font-semibold tracking-tight text-white leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            You are not just skin.<br />
            <span className="text-gold-gradient italic block mt-0.5 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
              You are a living monument.
            </span>
          </h1>

          {/* Philosophy Subtitle */}
          <p className="font-inter text-[10.5px] sm:text-[11.5px] text-white/80 leading-relaxed font-light mt-1.5 drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
            Her beden bir tapınak değil; zamanla aşınan, çatlayan ve sanatla yeniden inşa edilen yaşayan bir heykeldir.
          </p>

          {/* Disciplines (Compact Horizontal Strip) */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 my-2 pl-0.5 text-[9px] sm:text-[9.5px] font-syne text-white/75 tracking-wider">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-gold text-[7px]">◈</span>Biyomekanik Form
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-gold text-[7px]">◈</span>Antik Heykel
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-gold text-[7px]">◈</span>Kintsugi Altın
            </span>
          </div>

          {/* Action Row & Bottom Indicator */}
          <div className="flex items-center justify-between w-full pt-2 border-t border-white/10 mt-1">
            <a
              href="#canvas"
              onClick={(e) => {
                e.preventDefault()
                onScrollToCanvas()
              }}
              className="
                group inline-flex items-center gap-2 px-4 py-2 rounded-full
                liquid-glass-gold text-gold font-syne text-[9px] sm:text-[9.5px] tracking-[0.25em] uppercase font-semibold
                transition-all duration-300 hover:text-white
                shadow-[0_0_16px_rgba(212,175,55,0.3)]
              "
              data-interactive="true"
            >
              <span>Tuvali Keşfet</span>
              <span className="text-xs group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>

            <span className="font-syne text-[7.5px] sm:text-[8px] tracking-[0.25em] text-white/40 uppercase">
              Tuncay Gezer — Artist Office
            </span>
          </div>
        </motion.div>

        {/* ── DESKTOP BOTTOM SCROLL CUE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col items-center gap-2 pointer-events-auto pb-4"
        >
          <a
            href="#canvas"
            onClick={(e) => {
              e.preventDefault()
              onScrollToCanvas()
            }}
            className="
              flex flex-col items-center gap-2
              font-syne text-[9px] tracking-[0.45em] text-white/60
              hover:text-gold transition-all duration-300
              uppercase group
            "
            aria-label="Tuval bölümüne in"
            data-interactive="true"
          >
            <span className="group-hover:tracking-[0.55em] transition-all duration-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              [ TUVALİ KEŞFET ↓ ]
            </span>
            <span
              className="text-lg animate-bounce"
              style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 10px #D4AF37)' }}
              aria-hidden="true"
            >
              ⌄
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── MOBILE / TABLET FULLSCREEN MENU MODAL ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-cinzel text-2xl font-bold tracking-[0.15em] text-gold">
                  TG
                </span>
                <div className="w-px h-6 bg-white/20" />
                <span className="font-syne text-[10px] tracking-[0.3em] text-white/80 uppercase">
                  ARTIST OFFICE
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center text-white/70 hover:text-white border border-white/10"
                aria-label="Menüyü Kapat"
              >
                ✕
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 my-auto py-6" aria-label="Mobil Dizin">
              <span className="font-syne text-[9px] tracking-[0.4em] text-gold uppercase font-semibold">
                Atölye Dizin Bölümleri
              </span>

              {NAV_ITEMS.map(({ roman, title, desc, href }) => (
                <a
                  key={title}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(href)
                  }}
                  className="group flex items-center justify-between py-2 border-b border-white/5"
                >
                  <div>
                    <p className="font-cinzel text-lg sm:text-xl text-white font-medium group-hover:text-gold transition-colors">
                      {title}
                    </p>
                    <p className="font-inter text-xs text-white/45 mt-0.5">
                      {desc}
                    </p>
                  </div>
                  <span className="font-cinzel text-sm text-gold font-bold">
                    {roman}
                  </span>
                </a>
              ))}
            </nav>

            {/* Menu Footer CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleNavClick('#consultation')}
                className="
                  w-full py-4 rounded-xl
                  bg-gradient-to-r from-gold via-amber to-gold text-black
                  font-syne text-xs tracking-[0.25em] uppercase font-bold
                  shadow-[0_0_25px_rgba(212,175,55,0.35)]
                "
              >
                Tuval Talebi Başlat →
              </button>
              <p className="font-syne text-[8px] tracking-[0.3em] text-white/30 text-center uppercase">
                Tuncay Gezer — Özel Randevu Kabul Protokolü
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
