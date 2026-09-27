'use client'

// features/canvas-reveal/InteractiveCanvas.tsx
// Dual-layer cursor mask reveal with 5 anatomical hotspots, instant-dismiss HUD, and portfolio modal

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { STATUE_CORE_PATH, STATUE_TATTOOED_PATH } from '@/shared/lib/assets'
import { ANATOMICAL_HOTSPOTS } from '@/shared/types'
import type { AnatomicalHotspot } from '@/shared/types'
import { isTouchDevice } from '@/shared/lib/utils'
import { PortfolioModal } from './PortfolioModal'

const MASK_RADIUS = 160

interface InteractiveCanvasProps {
  onOpenConsultation?: (zoneId?: string) => void
}

export function InteractiveCanvas({ onOpenConsultation }: InteractiveCanvasProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeHotspot, setActiveHotspot] = useState<AnatomicalHotspot | null>(null)
  const [modalHotspot, setModalHotspot] = useState<AnatomicalHotspot | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [touchRevealPercent, setTouchRevealPercent] = useState(50)
  const isDraggingRef = useRef(false)

  // Framer Motion spring for HUD card
  const hudX = useMotionValue(-300)
  const hudY = useMotionValue(-300)
  const springHudX = useSpring(hudX, { damping: 28, stiffness: 300 })
  const springHudY = useSpring(hudY, { damping: 28, stiffness: 300 })

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  // Global mouse tracking: updates mask & ensures HUD card DISAPPEARS immediately when cursor moves away
  useEffect(() => {
    if (isTouch) return

    const handleWindowMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()

      // Check if mouse is inside container
      const isInside =
        e.clientX >= rect.left - 20 &&
        e.clientX <= rect.right + 20 &&
        e.clientY >= rect.top - 20 &&
        e.clientY <= rect.bottom + 20

      // If mouse left the statue container, instantly dismiss HUD card!
      if (!isInside) {
        setActiveHotspot(null)
        return
      }

      // Update mask position on container
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty('--mouse-x', `${x}px`)
      container.style.setProperty('--mouse-y', `${y}px`)

      // Position HUD near cursor with viewport clamping
      const clampedX = Math.min(Math.max(16, e.clientX + 24), window.innerWidth - 275)
      const clampedY = Math.min(Math.max(16, e.clientY - 60), window.innerHeight - 220)
      hudX.set(clampedX)
      hudY.set(clampedY)

      // Calculate distance to closest hotspot
      const containerWidth = rect.width
      const containerHeight = rect.height
      let closestHotspot: AnatomicalHotspot | null = null
      let closestDist = Infinity

      for (const hotspot of ANATOMICAL_HOTSPOTS) {
        const hx = (parseFloat(hotspot.position.left) / 100) * containerWidth
        const hy = (parseFloat(hotspot.position.top) / 100) * containerHeight
        const dist = Math.hypot(x - hx, y - hy)
        if (dist < closestDist) {
          closestDist = dist
          closestHotspot = hotspot
        }
      }

      // Only show when within 55px of hotspot dot. If user moves away, DISAPPEAR IMMEDIATELY!
      if (closestDist < 55) {
        setActiveHotspot(closestHotspot)
      } else {
        setActiveHotspot(null)
      }
    }

    // Dismiss HUD on any click anywhere
    const handleDismiss = () => {
      setActiveHotspot(null)
    }

    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('click', handleDismiss)
    window.addEventListener('scroll', handleDismiss, { passive: true })
    document.addEventListener('mouseleave', handleDismiss)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
      window.removeEventListener('click', handleDismiss)
      window.removeEventListener('scroll', handleDismiss)
      document.removeEventListener('mouseleave', handleDismiss)
    }
  }, [hudX, hudY, isTouch])

  // Touch drag handler for split-curtain reveal
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const touch = e.touches[0]
    if (!touch) return
    const percent = ((touch.clientY - rect.top) / rect.height) * 100
    setTouchRevealPercent(Math.max(5, Math.min(95, percent)))
  }, [])

  useEffect(() => {
    if (!isTouch) return
    const container = containerRef.current
    if (!container) return
    const onTouchStart = () => {
      isDraggingRef.current = true
    }
    const onTouchEnd = () => {
      isDraggingRef.current = false
    }
    container.addEventListener('touchstart', onTouchStart)
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', onTouchEnd)
    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [isTouch, handleTouchMove])

  const openModal = useCallback((hotspot: AnatomicalHotspot) => {
    setActiveHotspot(null)
    setModalHotspot(hotspot)
    setModalOpen(true)
  }, [])

  return (
    <section
      id="canvas"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#000000' }}
      aria-label="İnteraktif Tuval — Anatomik Harita"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center pt-16 md:pt-20 pb-6 md:pb-8 px-6"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full liquid-glass mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          <span className="font-syne text-[10px] tracking-[0.4em] text-gold/80 uppercase">
            Canlı Beden Tuvali
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-6xl text-white/90">
          Anatomik Dönüşüm
        </h2>
        <p className="font-inter text-xs md:text-sm text-white/40 mt-3 max-w-md mx-auto leading-relaxed">
          {isTouch
            ? 'Mermer heykel ile dövmeli katman arasında geçiş yapmak için çizgiyi sürükleyin. Noktalara dokunarak eser detaylarını inceleyin.'
            : 'İmlecinizi mermer heykel üzerinde gezdirerek yaşayan teni ve biyomekanik hatları keşfedin.'}
        </p>
      </motion.div>

      {/* Dual-Layer Canvas Container — Pixel matched to 1086:1448 statue geometry on all viewports */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        id="statue-canvas-container"
        ref={containerRef}
        className="relative mx-auto mb-16 md:mb-24"
        style={{
          display: 'block',
          margin: '0 auto',
          width: 'min(88vw, calc(60vh * 1086 / 1448), 460px)',
          aspectRatio: '1086 / 1448',
          height: 'auto',
          ['--mouse-x' as string]: '50%',
          ['--mouse-y' as string]: '50%',
        }}
      >
        {/* Layer A — Base Marble Statue with neural crack core */}
        <div className="absolute inset-0">
          <Image
            src={STATUE_CORE_PATH}
            alt="Mermer heykel ve çatlak göğüsteki glowing neural hatlar"
            fill
            className="object-contain object-center select-none"
            priority
            draggable={false}
            sizes="(max-width: 640px) 95vw, (max-width: 1200px) 85vw, 1100px"
          />
        </div>

        {/* Layer B — Tattooed Reveal (Cursor Mask) */}
        {!isTouch ? (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--mouse-x) var(--mouse-y), black 70%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--mouse-x) var(--mouse-y), black 70%, transparent 100%)`,
            }}
          >
            <Image
              src={STATUE_TATTOOED_PATH}
              alt="Baroque blackwork dövmeleri ve Kintsugi altın dikişleri"
              fill
              priority
              className="object-contain object-center select-none"
              draggable={false}
              sizes="(max-width: 640px) 95vw, (max-width: 1200px) 85vw, 1100px"
            />
          </div>
        ) : (
          /* Touch fallback — vertical split curtain */
          <div
            className="absolute inset-0 overflow-hidden select-none"
            style={{ clipPath: `inset(0 0 ${100 - touchRevealPercent}% 0)` }}
          >
            <Image
              src={STATUE_TATTOOED_PATH}
              alt="Baroque blackwork dövmeleri ve Kintsugi altın dikişleri"
              fill
              className="object-contain object-center select-none"
              draggable={false}
              sizes="(max-width: 640px) 95vw, (max-width: 1200px) 85vw, 1100px"
            />
            {/* Touch drag divider */}
            <div
              className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
              style={{
                top: `${touchRevealPercent}%`,
                transform: 'translateY(-50%)',
              }}
            >
              <div className="liquid-glass-gold rounded-full px-4 py-1.5 flex items-center gap-2 shadow-2xl">
                <span className="text-gold text-xs">⇅</span>
                <span className="font-syne text-[8px] tracking-[0.3em] text-gold uppercase font-semibold">
                  Katmanı Sürükle
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── 5 Anatomical Hotspot Buttons ── */}
        {ANATOMICAL_HOTSPOTS.map((hotspot) => (
          <button
            key={hotspot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group p-3 -m-3 touch-manipulation cursor-pointer"
            style={{
              top: hotspot.position.top,
              left: hotspot.position.left,
            }}
            onMouseEnter={() => setActiveHotspot(hotspot)}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={(e) => {
              e.stopPropagation()
              setActiveHotspot(null)
              openModal(hotspot)
            }}
            aria-label={`${hotspot.title} detaylarını görüntüle`}
            data-interactive="true"
          >
            {/* Outer pulse wave */}
            <span
              className="absolute -inset-2 rounded-full animate-ping pointer-events-none"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.35)',
                animationDuration: '2.4s',
              }}
            />
            {/* Target ring */}
            <span
              className="relative flex items-center justify-center h-6 w-6 rounded-full border transition-transform duration-300 group-hover:scale-125"
              style={{
                backgroundColor: 'rgba(5, 5, 5, 0.75)',
                borderColor: '#D4AF37',
                boxShadow: '0 0 14px 3px rgba(212, 175, 55, 0.6)',
              }}
            >
              <span className="h-2 w-2 rounded-full bg-gold" />
            </span>
            {/* Floating label */}
            <span
              className="
                absolute left-8 top-1/2 -translate-y-1/2
                liquid-glass rounded-md px-2.5 py-1
                font-syne text-[8px] tracking-[0.2em] text-gold uppercase
                whitespace-nowrap
                opacity-0 group-hover:opacity-100
                transition-all duration-200
                pointer-events-none
                shadow-xl
              "
            >
              {hotspot.subtitle}
            </span>
          </button>
        ))}
      </motion.div>

      {/* ── Floating HUD Card (Positioned at cursor — Disappears immediately on click or mouse leave) ── */}
      <AnimatePresence>
        {activeHotspot && !isTouch && !modalOpen && (
          <motion.div
            key={activeHotspot.id}
            className="fixed top-0 left-0 z-50 pointer-events-auto"
            style={{
              x: springHudX,
              y: springHudY,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.12 }}
          >
            <div
              className="
                liquid-glass rounded-xl p-4 w-64 shadow-2xl border border-gold/30
                cursor-pointer hover:border-gold/60 transition-colors
              "
              onClick={(e) => {
                e.stopPropagation()
                const target = activeHotspot
                setActiveHotspot(null)
                if (target) openModal(target)
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-syne text-[8px] tracking-[0.3em] text-gold/80 uppercase">
                  {activeHotspot.subtitle}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveHotspot(null)
                  }}
                  className="text-white/40 hover:text-white text-xs px-1 leading-none"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>

              <p className="font-cinzel text-sm text-white font-medium mb-3 leading-snug">
                {activeHotspot.title}
              </p>

              <div className="flex flex-col gap-1.5 py-2 border-y border-white/5">
                <div className="flex justify-between items-center">
                  <span className="font-syne text-[9px] text-white/40 uppercase tracking-wider">Hassasiyet</span>
                  <span className="font-cinzel text-[10px] text-gold font-semibold">
                    {activeHotspot.painLevel.split('—')[0]?.trim()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-syne text-[9px] text-white/40 uppercase tracking-wider">İyileşme</span>
                  <span className="font-cinzel text-[10px] text-gold">
                    {activeHotspot.healingTime}
                  </span>
                </div>
              </div>

              <p className="font-inter text-[10px] text-white/50 italic mt-2.5 leading-relaxed">
                &ldquo;{activeHotspot.note.slice(0, 75)}...&rdquo;
              </p>

              <p className="font-syne text-[8px] text-gold text-right mt-2 uppercase tracking-widest font-semibold">
                [ Tıkla & İncele ] →
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Modal */}
      <PortfolioModal
        hotspot={modalHotspot}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  )
}
