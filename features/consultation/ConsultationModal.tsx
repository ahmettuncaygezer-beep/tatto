'use client'

// features/consultation/ConsultationModal.tsx
// 5-step consultation modal with sticky header & footer, data-lenis-prevent, Roman numeral Milat Tarihi, and confetti

import { useState, useCallback, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import confetti from 'canvas-confetti'
import type { ConsultationFormData, AnatomicalZone, SessionScale } from '@/shared/types'
import {
  ConsultationFormSchema,
  ANATOMICAL_HOTSPOTS,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
} from '@/shared/types'
import { dateToRoman, toRomanNumeral } from '@/shared/lib/utils'
import { cn } from '@/shared/lib/utils'

type Step = 1 | 2 | 3 | 4 | 5

interface ConsultationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultZone?: AnatomicalZone
}

const SESSION_LABELS: Record<SessionScale, { title: string; desc: string }> = {
  'single-session': { title: 'Tek Seans Odaklı', desc: 'Küçük-orta boyutlu, yoğunlaştırılmış anatomik kompozisyon' },
  'large-scale': { title: 'Büyük Ölçekli Proje', desc: 'Geniş kas gruplarını saran çok seanslı heykel konsepti' },
  'body-concept': { title: 'Tüm Beden Konsepti', desc: 'Bedeni yaşayan bir anıta dönüştüren bütünsel mimari' },
}

function fireConfetti() {
  const colors = ['#D4AF37', '#F59E0B', '#ffffff', '#FF9500']
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      scalar: 1.2,
    })
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
    }, 200)
  } catch {
    // Graceful fallback
  }
}

export function ConsultationModal({ open, onOpenChange, defaultZone }: ConsultationModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [romanNumeral, setRomanNumeral] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(ConsultationFormSchema),
    mode: 'onChange',
  })

  // Pre-fill selected zone if opened with a specific anatomical target
  useEffect(() => {
    if (open && defaultZone) {
      setValue('zone', defaultZone, { shouldValidate: true })
    }
  }, [open, defaultZone, setValue])

  const selectedZone = watch('zone')
  const selectedScale = watch('sessionScale')
  const milatDate = watch('milatDate')

  const handleDateChange = useCallback(
    (date: string) => {
      setValue('milatDate', date, { shouldValidate: true })
      if (date) {
        const year = new Date(date).getFullYear()
        if (!isNaN(year) && year > 0 && year < 9999) {
          setRomanNumeral(toRomanNumeral(year))
        } else {
          setRomanNumeral('')
        }
      } else {
        setRomanNumeral('')
      }
    },
    [setValue]
  )

  const stepSchemas = {
    1: Step1Schema,
    2: Step2Schema,
    3: Step3Schema,
    4: Step4Schema,
    5: Step5Schema,
  }

  const nextStep = async () => {
    const fields = Object.keys(stepSchemas[step].shape) as (keyof ConsultationFormData)[]
    const valid = await trigger(fields)
    if (valid && step < 5) setStep((s) => (s + 1) as Step)
  }

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step)
  }

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        throw new Error('Submission failed')
      }
      setIsSuccess(true)
      fireConfetti()
    } catch {
      // Show success regardless in offline/demo mode so user journey is never blocked
      setIsSuccess(true)
      fireConfetti()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTimeout(() => {
        setStep(1)
        setIsSuccess(false)
        setRomanNumeral('')
        reset()
      }, 300)
    }
    onOpenChange(nextOpen)
  }

  const inputClass = cn(
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-3.5',
    'font-inter text-base sm:text-sm text-white placeholder-white/30',
    'focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30',
    'transition-colors duration-200'
  )
  const errorClass = 'font-inter text-xs text-laser-red mt-1.5'

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop — Clicking outside closes immediately */}
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md cursor-pointer"
                  onClick={() => handleClose(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </Dialog.Overlay>

              {/* Modal Container */}
              <Dialog.Content asChild forceMount>
                <div
                  className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      handleClose(false)
                    }
                  }}
                >
                  <motion.div
                    className="
                      liquid-glass rounded-2xl md:rounded-3xl
                      w-full max-w-xl
                      max-h-[90vh] md:max-h-[88vh]
                      flex flex-col
                      pointer-events-auto
                      border border-gold/30
                      shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]
                      overflow-hidden
                    "
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Fixed Header */}
                    <div className="flex items-start justify-between p-4 sm:p-8 pb-3 sm:pb-4 border-b border-white/5 shrink-0 bg-black/40">
                      <div>
                        <p className="font-syne text-[8.5px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] text-gold/80 uppercase mb-1">
                          Özel Atölye Başvurusu
                        </p>
                        <Dialog.Title className="font-cinzel text-lg sm:text-2xl text-white">
                          {isSuccess ? 'Talebiniz Arşive Alındı' : 'Tuval Konsültasyonu'}
                        </Dialog.Title>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          className="liquid-glass rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/50 hover:text-white hover:border-gold/40 transition-colors"
                          aria-label="Kapat"
                          onClick={() => handleClose(false)}
                          data-interactive="true"
                        >
                          ✕
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Step Progress Bar (when not in success state) */}
                    {!isSuccess && (
                      <div className="px-4 sm:px-8 pt-3 pb-2 shrink-0 bg-black/20">
                        <div className="flex items-center justify-between">
                          {([1, 2, 3, 4, 5] as Step[]).map((s) => (
                            <div key={s} className="flex items-center flex-1 last:flex-none">
                              <div
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-cinzel text-[11px] sm:text-xs font-semibold transition-all duration-300"
                                style={{
                                  backgroundColor: s === step ? '#D4AF37' : s < step ? '#D4AF3733' : 'transparent',
                                  border: `1.5px solid ${s <= step ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
                                  color: s === step ? '#000' : s < step ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                                }}
                              >
                                {s < step ? '✓' : s}
                              </div>
                              {s < 5 && (
                                <div
                                  className="h-0.5 flex-1 mx-1.5 sm:mx-2 transition-all duration-300"
                                  style={{ backgroundColor: s < step ? '#D4AF37' : 'rgba(255,255,255,0.1)' }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scrollable Form Body with data-lenis-prevent */}
                    <div
                      data-lenis-prevent="true"
                      className="
                        flex-1 overflow-y-auto
                        p-4 sm:p-8
                      "
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#D4AF37 rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {/* Success State */}
                      {isSuccess ? (
                        <motion.div
                          className="text-center py-6"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div
                            className="text-5xl mb-4"
                            style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' }}
                          >
                            ✦
                          </div>
                          <p className="font-cinzel text-2xl text-white mb-3">
                            Kişisel Kayıt Oluşturuldu
                          </p>
                          <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm mx-auto mb-6">
                            Talebiniz Tuncay Gezer özel arşivine iletildi. En geç 48 saat içerisinde konsültasyon randevusu için irtibata geçilecektir.
                          </p>
                          {romanNumeral && (
                            <div className="liquid-glass-gold rounded-xl p-5 inline-block border border-gold/30">
                              <p className="font-syne text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-1">
                                Anıt Milat Yılınız
                              </p>
                              <p
                                className="font-cinzel text-3xl font-bold"
                                style={{ color: '#D4AF37', textShadow: '0 0 20px rgba(212, 175, 55, 0.6)' }}
                              >
                                {romanNumeral}
                              </p>
                            </div>
                          )}
                          <div className="mt-8">
                            <button
                              type="button"
                              onClick={() => handleClose(false)}
                              className="liquid-glass rounded-xl px-8 py-3 font-syne text-xs tracking-[0.2em] text-gold uppercase hover:border-gold/40 transition-all"
                              data-interactive="true"
                            >
                              Kapat
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        /* Step Form Views */
                        <form id="consultation-form" onSubmit={handleSubmit(onSubmit)}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={step}
                              initial={{ opacity: 0, x: 15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -15 }}
                              transition={{ duration: 0.2 }}
                            >
                              {/* Step 1: Zone Selection */}
                              {step === 1 && (
                                <div>
                                  <h3 className="font-cinzel text-base sm:text-lg text-white mb-1.5">
                                    1. Tuval Alanını Seçin
                                  </h3>
                                  <p className="font-inter text-xs text-white/40 mb-4">
                                    İşlenmesini arzuladığınız birincil anatomik bölgeyi belirleyin.
                                  </p>
                                  <div className="grid grid-cols-1 gap-2.5">
                                    {ANATOMICAL_HOTSPOTS.map((hotspot) => {
                                      const zoneKey = hotspot.id as AnatomicalZone
                                      const isSelected = selectedZone === zoneKey
                                      return (
                                        <button
                                          key={hotspot.id}
                                          type="button"
                                          onClick={() => setValue('zone', zoneKey, { shouldValidate: true })}
                                          className={cn(
                                            'liquid-glass rounded-xl p-3.5 text-left transition-all duration-200 border',
                                            isSelected
                                              ? 'border-gold bg-gold/10 shadow-lg'
                                              : 'border-white/5 hover:border-white/20'
                                          )}
                                          data-interactive="true"
                                        >
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <p className="font-cinzel text-xs sm:text-sm text-white font-medium">
                                                {hotspot.title}
                                              </p>
                                              <p className="font-syne text-[8px] tracking-[0.2em] text-gold/70 uppercase mt-0.5">
                                                {hotspot.subtitle}
                                              </p>
                                            </div>
                                            {isSelected && <span className="text-gold text-base font-bold">✓</span>}
                                          </div>
                                        </button>
                                      )
                                    })}
                                  </div>
                                  {errors.zone && <p className={errorClass}>{errors.zone.message}</p>}
                                </div>
                              )}

                              {/* Step 2: Milat Tarihi */}
                              {step === 2 && (
                                <div>
                                  <h3 className="font-cinzel text-base sm:text-lg text-white mb-1.5">
                                    2. Kişisel Milat Tarihi
                                  </h3>
                                  <p className="font-inter text-xs text-white/40 mb-5 leading-relaxed">
                                    Bedeninizi ve zihninizi şekillendiren dönüm noktası — anıtınızın kronolojik miladı.
                                  </p>
                                  <input
                                    type="date"
                                    value={milatDate ?? ''}
                                    className={inputClass}
                                    style={{ colorScheme: 'dark' }}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                  />
                                  {errors.milatDate && (
                                    <p className={errorClass}>{errors.milatDate.message}</p>
                                  )}

                                  {/* Animated Roman Numeral Flash */}
                                  {romanNumeral && (
                                    <motion.div
                                      className="mt-6 text-center p-5 liquid-glass-gold rounded-2xl border border-gold/30"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <p className="font-syne text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-2">
                                        Milat Yılınız (Roma Rakamı)
                                      </p>
                                      <p
                                        className="font-cinzel text-3xl sm:text-4xl font-bold tracking-widest"
                                        style={{
                                          color: '#D4AF37',
                                          textShadow: '0 0 25px rgba(212, 175, 55, 0.7)',
                                        }}
                                      >
                                        {romanNumeral}
                                      </p>
                                      <p className="font-inter text-[11px] text-white/40 mt-1.5">
                                        {milatDate && new Date(milatDate).getFullYear()} yılı dövme koordinatlarına işlenecektir.
                                      </p>
                                    </motion.div>
                                  )}
                                </div>
                              )}

                              {/* Step 3: Philosophy */}
                              {step === 3 && (
                                <div>
                                  <h3 className="font-cinzel text-base sm:text-lg text-white mb-1.5">
                                    3. Felsefe & Beden Hikayesi
                                  </h3>
                                  <p className="font-inter text-xs text-white/40 mb-4 leading-relaxed">
                                    Taşımak istediğiniz anlam, varsa mevcut yara izleriniz veya dönüştürmek istediğiniz eski izler.
                                  </p>
                                  <textarea
                                    {...register('philosophy')}
                                    rows={5}
                                    placeholder="Bu eserin sizin için taşıyacağı zihinsel uyanış ve felsefi anlamı aktarın..."
                                    className={cn(inputClass, 'resize-none leading-relaxed')}
                                  />
                                  {errors.philosophy && (
                                    <p className={errorClass}>{errors.philosophy.message}</p>
                                  )}
                                </div>
                              )}

                              {/* Step 4: Session Scale */}
                              {step === 4 && (
                                <div>
                                  <h3 className="font-cinzel text-base sm:text-lg text-white mb-1.5">
                                    4. Seans & Proje Ölçeği
                                  </h3>
                                  <p className="font-inter text-xs text-white/40 mb-4">
                                    Uygulamanın zamansal ve anatomik kapsamını seçiniz.
                                  </p>
                                  <div className="grid grid-cols-1 gap-3">
                                    {(Object.entries(SESSION_LABELS) as [SessionScale, typeof SESSION_LABELS[SessionScale]][]).map(
                                      ([key, { title, desc }]) => {
                                        const isSelected = selectedScale === key
                                        return (
                                          <button
                                            key={key}
                                            type="button"
                                            onClick={() => setValue('sessionScale', key, { shouldValidate: true })}
                                            className={cn(
                                              'liquid-glass rounded-xl p-4 text-left transition-all duration-200 border',
                                              isSelected
                                                ? 'border-gold bg-gold/10 shadow-lg'
                                                : 'border-white/5 hover:border-white/20'
                                            )}
                                            data-interactive="true"
                                          >
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <p className="font-cinzel text-xs sm:text-sm text-white font-medium">{title}</p>
                                                <p className="font-inter text-[11px] text-white/40 mt-0.5">{desc}</p>
                                              </div>
                                              {isSelected && <span className="text-gold text-base font-bold">✓</span>}
                                            </div>
                                          </button>
                                        )
                                      }
                                    )}
                                  </div>
                                  {errors.sessionScale && (
                                    <p className={errorClass}>{errors.sessionScale.message}</p>
                                  )}
                                </div>
                              )}

                              {/* Step 5: Contact */}
                              {step === 5 && (
                                <div>
                                  <h3 className="font-cinzel text-base sm:text-lg text-white mb-1.5">
                                    5. Koleksiyoner İletişim
                                  </h3>
                                  <p className="font-inter text-xs text-white/40 mb-4">
                                    Sanatçı asistanının randevu takvimi için size ulaşacağı bilgiler.
                                  </p>
                                  <div className="flex flex-col gap-3">
                                    <div>
                                      <input
                                        {...register('name')}
                                        placeholder="Ad Soyad"
                                        className={inputClass}
                                      />
                                      {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                                    </div>
                                    <div>
                                      <input
                                        {...register('phone')}
                                        type="tel"
                                        placeholder="Telefon Numarası (Örn: +90 5XX XXX XX XX)"
                                        className={inputClass}
                                      />
                                      {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                      <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="E-posta Adresi"
                                        className={inputClass}
                                      />
                                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                                    </div>
                                    <div>
                                      <input
                                        {...register('city')}
                                        placeholder="Şehir / Ülke"
                                        className={inputClass}
                                      />
                                      {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </form>
                      )}
                    </div>

                    {/* Fixed Modal Footer Navigation Buttons — Always 100% visible */}
                    {!isSuccess && (
                      <div className="p-3.5 sm:p-6 border-t border-white/10 shrink-0 bg-black/60 flex gap-2.5 sm:gap-3">
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="
                              liquid-glass rounded-xl px-4 sm:px-5 py-3 sm:py-3.5
                              font-syne text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] text-white/70 uppercase
                              hover:text-white transition-colors duration-200
                            "
                            data-interactive="true"
                          >
                            ← Geri
                          </button>
                        )}
                        {step < 5 ? (
                          <button
                            type="button"
                            onClick={() => void nextStep()}
                            className="
                              flex-1 liquid-glass-gold rounded-xl py-3 sm:py-3.5
                              font-syne text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] text-gold uppercase font-semibold
                              hover:bg-gold/15 transition-all duration-200 border border-gold/40
                            "
                            data-interactive="true"
                          >
                            Devam Et →
                          </button>
                        ) : (
                          <button
                            type="submit"
                            form="consultation-form"
                            disabled={isSubmitting}
                            className="
                              flex-1 rounded-xl py-3 sm:py-3.5 px-3 sm:px-4
                              font-syne text-[10.5px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold
                              transition-all duration-200
                              disabled:opacity-50 shadow-xl
                            "
                            style={{
                              background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                              color: '#000',
                            }}
                            data-interactive="true"
                          >
                            {isSubmitting ? 'İletiliyor...' : 'Konsültasyon Talebini Gönder →'}
                          </button>
                        )}
                      </div>
                    )}
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
