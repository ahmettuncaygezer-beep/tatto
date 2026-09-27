'use client'

// features/portfolio/PortfolioGallery.tsx
// Luxury exhibition gallery showcasing completed anatomical & biomechanical tattoo masterworks
// Features category filtering, hover inspections, and deep-dive collector lightbox

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import {
  PORTFOLIO_MASTERPIECES,
  PORTFOLIO_CATEGORIES,
  type PortfolioMasterpiece,
} from '@/shared/lib/portfolio-data'

interface PortfolioGalleryProps {
  onOpenConsultationWithPiece?: (pieceTitle: string) => void
}

export function PortfolioGallery({ onOpenConsultationWithPiece }: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activePiece, setActivePiece] = useState<PortfolioMasterpiece | null>(null)

  const filteredPieces = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_MASTERPIECES
    return PORTFOLIO_MASTERPIECES.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-black text-white overflow-hidden border-t border-white/5"
      aria-label="Atölye Başyapıtları Galerisi"
    >
      {/* Background Ambient Glow Accents */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[450px] h-[300px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none"
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
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
            <span className="font-syne text-[8.5px] md:text-[9.5px] tracking-[0.35em] text-gold uppercase font-medium">
              Atölye Arşivi · Gerçek Eserler
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight max-w-3xl leading-[1.15]">
            Yaşayan Heykeller & <br className="hidden sm:inline" />
            <span className="text-gold-gradient italic font-medium">Örnek Başyapıtlar</span>
          </h2>

          {/* Subtitle */}
          <p className="font-inter text-xs sm:text-sm md:text-base text-white/60 font-light max-w-2xl mt-4 sm:mt-5 leading-relaxed">
            Her eser, koleksiyonerin yaşayan beden morfolojisine, kas eksenlerine ve kişisel felsefesine özel olarak üretilen 1/1 tek nüsha bir heykeltıraşlık çalışmasıdır.
          </p>

          {/* Elegant Atelier Divider */}
          <div className="flex items-center gap-3 mt-6 sm:mt-8 opacity-75" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-xs text-gold">◈</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-8 sm:mt-10 p-1 sm:p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {PORTFOLIO_CATEGORIES.map(({ id, label }) => {
              const isActive = selectedCategory === id
              return (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`
                    relative px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full
                    font-syne text-[8.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? 'text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                  data-interactive="true"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-amber to-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Gallery Grid with Staggered Scroll Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPieces.map((piece, index) => (
            <motion.article
              key={piece.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: (index % 3) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setActivePiece(piece)}
              className="
                group relative flex flex-col rounded-2xl md:rounded-3xl
                overflow-hidden cursor-pointer
                border border-white/10 hover:border-gold/50
                bg-gradient-to-b from-white/[0.04] to-transparent
                transition-all duration-500
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)]
                hover:-translate-y-1.5
              "
              data-interactive="true"
            >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="
                      object-cover object-center
                      transition-transform duration-700 ease-out
                      group-hover:scale-105
                    "
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/30 text-gold font-mono text-[9px] tracking-widest font-semibold">
                      {piece.collectorCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/80 font-syne text-[8.5px] tracking-wider uppercase">
                      {piece.zone}
                    </span>
                  </div>

                  {/* Hover Inspect Cue */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-gold text-gold font-syne text-[9px] tracking-[0.25em] uppercase font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      <span>ESERİ İNCELE</span>
                      <span>✦</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category & Origin */}
                    <div className="flex items-center justify-between text-white/50 text-[10px] font-syne tracking-wider uppercase mb-2">
                      <span className="text-gold/90 font-medium">{piece.categoryLabel}</span>
                      <span>{piece.origin}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-cinzel text-xl text-white group-hover:text-gold transition-colors duration-300 font-semibold leading-snug">
                      {piece.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="font-inter text-xs text-white/60 font-light mt-1.5 leading-relaxed line-clamp-2">
                      {piece.subtitle}
                    </p>
                  </div>

                  {/* Specs & Sessions Strip */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10.5px]">
                    <span className="font-syne text-white/50 font-medium">
                      ⏱ {piece.sessions}
                    </span>
                    <div className="flex items-center gap-1.5" title="Renk Paleti">
                      {piece.palette.slice(0, 3).map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i === 0
                              ? 'bg-gold'
                              : i === 1
                              ? 'bg-amber-300'
                              : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>

      {/* Deep-Dive Masterpiece Lightbox Dialog */}
      <Dialog.Root open={!!activePiece} onOpenChange={(open) => !open && setActivePiece(null)}>
        <Dialog.Portal>
          <AnimatePresence>
            {activePiece && (
              <>
                {/* Backdrop */}
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md cursor-pointer"
                    onClick={() => setActivePiece(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </Dialog.Overlay>

                {/* Modal Window */}
                <Dialog.Content asChild forceMount>
                  <div
                    className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) setActivePiece(null)
                    }}
                  >
                    <motion.div
                      className="
                        liquid-glass rounded-2xl md:rounded-3xl
                        w-full max-w-4xl max-h-[90vh]
                        flex flex-col md:flex-row
                        pointer-events-auto
                        border border-gold/30
                        shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]
                        overflow-hidden relative
                      "
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.3 }}
                      data-lenis-prevent="true"
                    >
                      {/* Floating Close Button for Mobile & Desktop */}
                      <Dialog.Close asChild>
                        <button
                          onClick={() => setActivePiece(null)}
                          className="absolute top-3 right-3 z-30 liquid-glass rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white border border-white/20 hover:border-gold transition-colors"
                          aria-label="Kapat"
                          data-interactive="true"
                        >
                          ✕
                        </button>
                      </Dialog.Close>

                      {/* Left: Large Image View */}
                      <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto min-h-[220px] sm:min-h-[280px] md:min-h-[480px] max-h-[38vh] md:max-h-none bg-black">
                        <Image
                          src={activePiece.image}
                          alt={activePiece.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center"
                        />
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-gold font-mono text-[10px] sm:text-xs tracking-widest font-semibold">
                            {activePiece.collectorCode}
                          </span>
                        </div>
                      </div>

                      {/* Right: Rich Dossier & Story */}
                      <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-black/60">
                        <div>
                          {/* Dossier Eyebrow */}
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 pr-10 md:pr-0">
                            <span className="font-syne text-[8.5px] sm:text-[9px] tracking-[0.35em] text-gold uppercase font-semibold">
                              Koleksiyoner Arşiv Kartı
                            </span>
                          </div>

                          {/* Title */}
                          <Dialog.Title className="font-cinzel text-2xl sm:text-3xl text-white font-bold leading-tight">
                            {activePiece.title}
                          </Dialog.Title>
                          <Dialog.Description className="font-syne text-xs text-gold/80 tracking-wider mt-1 uppercase">
                            {activePiece.subtitle}
                          </Dialog.Description>

                          {/* Story Narrative */}
                          <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                            <p className="font-syne text-[8.5px] tracking-[0.25em] text-gold/70 uppercase mb-2">
                              Eser Hikayesi & Felsefe
                            </p>
                            <p className="font-inter text-xs text-white/75 leading-relaxed font-light">
                              {activePiece.story}
                            </p>
                          </div>

                          {/* Technical Dossier Grid */}
                          <div className="grid grid-cols-2 gap-3 my-5">
                            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                              <span className="font-syne text-[8px] text-white/40 tracking-wider uppercase block">
                                Anatomik Bölge
                              </span>
                              <span className="font-inter text-xs text-white/90 font-medium mt-0.5 block">
                                {activePiece.zone}
                              </span>
                            </div>
                            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                              <span className="font-syne text-[8px] text-white/40 tracking-wider uppercase block">
                                Koleksiyoner Şehri
                              </span>
                              <span className="font-inter text-xs text-gold/90 font-medium mt-0.5 block">
                                {activePiece.origin}
                              </span>
                            </div>
                            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                              <span className="font-syne text-[8px] text-white/40 tracking-wider uppercase block">
                                Seans Süresi
                              </span>
                              <span className="font-inter text-xs text-white/90 font-medium mt-0.5 block">
                                {activePiece.sessions}
                              </span>
                            </div>
                            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                              <span className="font-syne text-[8px] text-white/40 tracking-wider uppercase block">
                                İğne & Pigment
                              </span>
                              <span className="font-inter text-xs text-white/90 font-medium mt-0.5 block">
                                {activePiece.specs}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Modal Action CTA */}
                        <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                          <button
                            onClick={() => {
                              const pieceTitle = activePiece.title
                              setActivePiece(null)
                              if (onOpenConsultationWithPiece) {
                                onOpenConsultationWithPiece(pieceTitle)
                              } else {
                                const consultationEl = document.getElementById('consultation')
                                if (consultationEl) {
                                  consultationEl.scrollIntoView({ behavior: 'smooth' })
                                }
                              }
                            }}
                            className="
                              w-full py-3.5 px-6 rounded-xl
                              bg-gradient-to-r from-gold via-amber to-gold text-black
                              font-syne text-xs tracking-[0.25em] uppercase font-bold
                              transition-all duration-300 hover:scale-[1.02]
                              shadow-[0_0_25px_rgba(212,175,55,0.35)]
                              flex items-center justify-center gap-2
                            "
                            data-interactive="true"
                          >
                            <span>Bu Konsept İçin Tuval Talebi Başlat</span>
                            <span>→</span>
                          </button>
                          <span className="text-[7.5px] font-syne text-white/30 tracking-widest text-center uppercase">
                            Tuncay Gezer — Özel Randevu Kabul Protokolü
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </Dialog.Content>
              </>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
