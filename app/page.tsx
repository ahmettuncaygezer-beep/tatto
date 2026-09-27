'use client'

// app/page.tsx
// Master page orchestrator — assembles all feature sections with smooth scroll animations

import { useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from '@/features/hero/HeroSection'
import { InteractiveCanvas } from '@/features/canvas-reveal/InteractiveCanvas'
import { PortfolioGallery } from '@/features/portfolio/PortfolioGallery'
import { AtelierProcess } from '@/features/process/AtelierProcess'
import { ManifestoSection } from '@/features/manifesto/ManifestoSection'
import { AtelierMetrics } from '@/features/stats/AtelierMetrics'
import { CollectorReviews } from '@/features/testimonials/CollectorReviews'
import { AtelierFAQ } from '@/features/faq/AtelierFAQ'
import { AtelierFooter } from '@/features/footer/AtelierFooter'
import { ConsultationModal } from '@/features/consultation/ConsultationModal'
import { scrollToElement } from '@/shared/lib/utils'
import type { AnatomicalZone } from '@/shared/types'

export default function Page() {
  const canvasSectionRef = useRef<HTMLDivElement>(null)
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [selectedZone, setSelectedZone] = useState<AnatomicalZone | undefined>(undefined)

  const handleOpenConsultation = useCallback((zoneId?: string) => {
    if (zoneId) {
      setSelectedZone(zoneId as AnatomicalZone)
    }
    setConsultationOpen(true)
  }, [])

  const scrollToCanvas = useCallback(() => {
    scrollToElement('#canvas')
  }, [])

  return (
    <main className="bg-obsidian min-h-screen">
      {/* 1. Hero Section (Fullscreen Video + Parallax + Motion Entrance) */}
      <HeroSection onScrollToCanvas={scrollToCanvas} />

      {/* 2. Interactive Anatomical Canvas */}
      <div ref={canvasSectionRef} id="canvas">
        <InteractiveCanvas onOpenConsultation={handleOpenConsultation} />
      </div>

      {/* 3. Portfolio & Real Completed Tattoo Masterpieces */}
      <PortfolioGallery
        onOpenConsultationWithPiece={() => {
          setSelectedZone(undefined)
          setConsultationOpen(true)
        }}
      />

      {/* 4. Atelier Transformation Process & Ritual */}
      <AtelierProcess />

      {/* 5. Manifesto & Philosophy Section */}
      <ManifestoSection />

      {/* 6. Atelier Metrics & Exclusivity Standards */}
      <AtelierMetrics />

      {/* 7. Collector Testimonials & Reviews */}
      <CollectorReviews />

      {/* 8. Collector FAQ & Preparation Guide */}
      <AtelierFAQ />

      {/* 9. Consultation CTA Section with Staggered Scroll Entrance */}
      <motion.section
        id="consultation"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 text-center bg-black overflow-hidden border-t border-white/5"
        aria-label="Konsültasyon talebi"
      >
        {/* Ambient Gold Glow with Breathing Pulse */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] h-[350px] bg-gold/[0.05] rounded-full blur-[140px] pointer-events-none animate-pulse"
          style={{ animationDuration: '4s' }}
          aria-hidden="true"
        />

        {/* Decorative expanding line */}
        <div className="flex items-center gap-4 sm:gap-8 justify-center mb-10 sm:mb-16 relative z-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-px flex-1 max-w-[80px] sm:max-w-[120px] origin-right"
            style={{ background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5))' }}
          />
          <div
            className="text-xl sm:text-2xl animate-pulse"
            style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 10px #D4AF37)' }}
          >
            ✦
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-px flex-1 max-w-[80px] sm:max-w-[120px] origin-left"
            style={{ background: 'linear-gradient(to left, transparent, rgba(212, 175, 55, 0.5))' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-syne text-[8.5px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] text-gold/80 uppercase mb-4 sm:mb-6 relative z-10"
        >
          Özel Rezervasyonlu Atölye · 2026 Sezonu
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-cinzel text-3xl sm:text-4xl md:text-6xl text-white/95 mb-4 sm:mb-6 relative z-10"
        >
          Dönüşümünüzün<br />
          <span className="text-gold-gradient font-medium italic">Mimarı Olun</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-inter text-xs sm:text-sm md:text-base text-white/50 max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed relative z-10 font-light"
        >
          Her talebi Tuncay Gezer kişisel olarak değerlendirmektedir. Sadece sınırlı sayıda koleksiyoner kabul edilmektedir.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          onClick={() => setConsultationOpen(true)}
          className="
            relative z-10
            inline-flex items-center gap-3
            px-8 sm:px-12 py-4 sm:py-5 rounded-full
            font-syne text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold
            transition-all duration-300
            hover:scale-105 active:scale-95
            cursor-pointer
          "
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
            color: '#000',
            boxShadow: '0 0 50px rgba(212, 175, 55, 0.4)',
          }}
          data-interactive="true"
          aria-label="Konsültasyon talebini aç"
        >
          <span>Tuval Talebi Başlat</span>
          <span className="text-sm">→</span>
        </motion.button>
      </motion.section>

      {/* 10. Comprehensive Luxury Atelier Footer */}
      <AtelierFooter />

      {/* Consultation Modal — Portal renders outside DOM tree */}
      <ConsultationModal
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        defaultZone={selectedZone}
      />
    </main>
  )
}
