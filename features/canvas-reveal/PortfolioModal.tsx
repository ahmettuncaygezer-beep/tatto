'use client'

// features/canvas-reveal/PortfolioModal.tsx
// Accessible portfolio lightbox with sticky header & footer, data-lenis-prevent, and instant backdrop dismissal

import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import type { AnatomicalHotspot } from '@/shared/types'

interface PortfolioModalProps {
  hotspot: AnatomicalHotspot | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenConsultation?: (zoneId?: string) => void
}

export function PortfolioModal({
  hotspot,
  open,
  onOpenChange,
  onOpenConsultation,
}: PortfolioModalProps) {
  const handleSelectPieceAndConsult = () => {
    const zoneId = hotspot?.id
    onOpenChange(false)
    if (onOpenConsultation) {
      onOpenConsultation(zoneId)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop — Clicking anywhere outside immediately closes */}
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md cursor-pointer"
                  onClick={() => onOpenChange(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </Dialog.Overlay>

              {/* Modal Container */}
              <Dialog.Content asChild forceMount>
                <div
                  className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                  onClick={(e) => {
                    // Close if clicking the wrapper outside the modal box
                    if (e.target === e.currentTarget) {
                      onOpenChange(false)
                    }
                  }}
                >
                  <motion.div
                    className="
                      liquid-glass rounded-2xl md:rounded-3xl
                      w-full max-w-2xl
                      max-h-[85vh] md:max-h-[88vh]
                      flex flex-col
                      pointer-events-auto
                      border border-gold/30
                      shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]
                      overflow-hidden
                    "
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Fixed Modal Header */}
                    <div className="flex items-start justify-between p-4 sm:p-8 pb-3 sm:pb-4 border-b border-white/5 shrink-0 bg-black/40">
                      <div>
                        <p className="font-syne text-[8.5px] sm:text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-1">
                          Atölye Arşivi & Detay
                        </p>
                        <Dialog.Title className="font-cinzel text-lg sm:text-2xl md:text-3xl text-white leading-tight">
                          {hotspot?.title ?? ''}
                        </Dialog.Title>
                        <Dialog.Description className="font-syne text-[9.5px] sm:text-xs tracking-[0.2em] text-gold/70 mt-1 uppercase">
                          {hotspot?.subtitle ?? ''}
                        </Dialog.Description>
                      </div>

                      <Dialog.Close asChild>
                        <button
                          className="
                            liquid-glass rounded-full w-8 h-8 sm:w-9 sm:h-9
                            flex items-center justify-center
                            text-white/60 hover:text-white hover:border-gold/40
                            transition-all duration-200
                            flex-shrink-0 ml-3 sm:ml-4
                          "
                          aria-label="Kapat"
                          onClick={() => onOpenChange(false)}
                          data-interactive="true"
                        >
                          ✕
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Scrollable Modal Body (Lenis-Prevent enables independent smooth scroll) */}
                    <div
                      data-lenis-prevent="true"
                      className="
                        flex-1 overflow-y-auto
                        p-4 sm:p-8 pt-3 sm:pt-4
                        space-y-4 sm:space-y-6
                      "
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#D4AF37 rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {/* Zone Metadata Cards */}
                      {hotspot && (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="liquid-glass rounded-xl p-3.5 sm:p-4 border border-white/5">
                            <p className="font-syne text-[8.5px] tracking-[0.3em] text-white/40 uppercase mb-1">
                              Acı / Hassasiyet
                            </p>
                            <p className="font-cinzel text-xs sm:text-sm text-gold font-semibold">
                              {hotspot.painLevel}
                            </p>
                          </div>
                          <div className="liquid-glass rounded-xl p-3.5 sm:p-4 border border-white/5">
                            <p className="font-syne text-[8.5px] tracking-[0.3em] text-white/40 uppercase mb-1">
                              İyileşme Süresi
                            </p>
                            <p className="font-cinzel text-xs sm:text-sm text-gold font-semibold">
                              {hotspot.healingTime}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Philosopher's Note */}
                      {hotspot && (
                        <blockquote className="border-l-2 border-gold/50 pl-4 py-1 bg-gold/[0.02] rounded-r-xl">
                          <p className="font-inter text-xs sm:text-sm text-white/70 italic leading-relaxed">
                            &ldquo;{hotspot.note}&rdquo;
                          </p>
                        </blockquote>
                      )}

                      {/* Portfolio Pieces Grid — Clickable to select and proceed */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-syne text-[9px] tracking-[0.4em] text-white/40 uppercase">
                            Bu Bölgeden Referans Eserler
                          </p>
                          <span className="font-syne text-[8px] text-gold/60 uppercase tracking-widest">
                            [ Seçmek İçin Tıkla ]
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {hotspot?.portfolioPieces.map((piece) => (
                            <button
                              key={piece.id}
                              type="button"
                              onClick={handleSelectPieceAndConsult}
                              className="
                                liquid-glass rounded-xl p-4 text-left
                                border border-white/5 hover:border-gold/50
                                hover:bg-gold/5 transition-all duration-300
                                group cursor-pointer
                              "
                              data-interactive="true"
                            >
                              {/* Artwork frame */}
                              <div
                                className="w-full h-28 rounded-lg mb-3 flex items-center justify-center transition-all duration-300 group-hover:border-gold/40"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0.4) 100%)',
                                  border: '1px solid rgba(212, 175, 55, 0.15)',
                                }}
                              >
                                <span
                                  className="font-cinzel text-3xl group-hover:scale-110 transition-transform duration-300"
                                  style={{ color: '#D4AF3788' }}
                                >
                                  ❧
                                </span>
                              </div>
                              <p className="font-cinzel text-xs sm:text-sm text-white/90 mb-1 group-hover:text-gold transition-colors font-medium">
                                {piece.label}
                              </p>
                              <p className="font-inter text-[11px] text-white/45">
                                {piece.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fixed Modal Footer CTA — Always visible on screen, never cut off */}
                    <div className="p-3.5 sm:p-6 border-t border-white/10 shrink-0 bg-black/60">
                      <button
                        className="
                          w-full rounded-xl py-3 sm:py-4 px-4 sm:px-6
                          font-syne text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold
                          transition-all duration-300
                          shadow-lg hover:shadow-gold/20
                          flex items-center justify-center gap-2
                        "
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                          color: '#000000',
                        }}
                        onClick={handleSelectPieceAndConsult}
                        data-interactive="true"
                      >
                        <span>Bu Bölge İçin Konsültasyon Talep Et</span>
                        <span className="text-sm">→</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
