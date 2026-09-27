'use client'

// features/manifesto/ManifestoSection.tsx
// Kinetic typography + GSAP ScrollTrigger + Split-Type + SVG monogram signature

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const MANIFESTO_TEXT = `Ben Tuncay Gezer. Bu atölyede dövme, derinin üzerine rastgele işlenen süslemelerden ibaret değildir. Biz burada biyomekanik hatları, antik heykel formlarını ve insan anatomisinin kırılgan noktalarını tek bir yaşayan anıtta buluşturuyoruz. Kintsugi geleneğinde olduğu gibi; kırılan yerleri gizlemiyor, onları altın varakla, gölgeyle ve mürekkeple ölümsüzleştiriyoruz.`

// SVG Monogram Signature Component with dual path stroke animation
function MonogramSignature() {
  const monogramPathRef = useRef<SVGPathElement>(null)
  const flourishPathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const monoPath = monogramPathRef.current
    const flourishPath = flourishPathRef.current
    const container = containerRef.current
    if (!monoPath || !flourishPath || !container) return

    const monoLength = monoPath.getTotalLength()
    const flourishLength = flourishPath.getTotalLength()

    gsap.set(monoPath, {
      strokeDasharray: monoLength,
      strokeDashoffset: monoLength,
    })

    gsap.set(flourishPath, {
      strokeDasharray: flourishLength,
      strokeDashoffset: flourishLength,
    })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(monoPath, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
        })
        gsap.to(flourishPath, {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: 0.8,
          ease: 'power2.out',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center mt-20">
      <svg
        width="320"
        height="130"
        viewBox="0 0 320 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Tuncay Gezer atölye imzası"
        className="w-64 md:w-80 h-auto"
      >
        {/* Tuncay Gezer calligraphic monogram path */}
        <path
          ref={monogramPathRef}
          d="M 30 25 L 130 25 M 80 25 L 80 95 M 145 25 C 145 25 170 18 180 35 C 190 52 178 68 160 72 L 180 100 M 210 25 L 210 95 M 210 60 L 255 60 M 255 25 L 255 95"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Decorative dynamic flourish underline */}
        <path
          ref={flourishPathRef}
          d="M 20 110 Q 160 128 300 105"
          stroke="#D4AF37"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <p className="font-syne text-[8px] tracking-[0.4em] text-white/30 uppercase mt-2">
        Tuncay Gezer — Baş Heykeltıraş & Sanatçı
      </p>
    </div>
  )
}

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const splitRef = useRef<SplitType | null>(null)

  useEffect(() => {
    const textEl = textRef.current
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    if (!textEl || !line1 || !line2) return

    // Heading stagger animation (React-safe without DOM destruction)
    gsap.set([line1, line2], { opacity: 0, y: 35 })
    const headingTrigger = ScrollTrigger.create({
      trigger: line1,
      start: 'top 85%',
      onEnter: () => {
        gsap.to([line1, line2], {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: 'power3.out',
        })
      },
    })

    // Split manifesto text into words
    const splitText = new SplitType(textEl, { types: 'words' })
    splitRef.current = splitText
    const words = splitText.words ?? []

    gsap.set(words, { opacity: 0.08, y: 8 })

    const textTrigger = ScrollTrigger.create({
      trigger: textEl,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          stagger: 0.015,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
    })

    return () => {
      headingTrigger.kill()
      textTrigger.kill()
      splitRef.current?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto"
      aria-label="Manifesto — Tuncay Gezer"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-8 sm:mb-12">
        <div
          className="h-px flex-1 max-w-[80px]"
          style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }}
        />
        <p className="font-syne text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] text-gold/80 uppercase">
          Manifesto & Felsefe
        </p>
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }}
        />
      </div>

      {/* Main Heading */}
      <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white/90 leading-tight mb-10 sm:mb-16">
        <span ref={line1Ref} className="block">
          Yaşayan
        </span>
        <span ref={line2Ref} className="block text-gold-gradient">
          Anıt
        </span>
      </h2>

      {/* Manifesto Blockquote */}
      <blockquote
        className="relative border-l-2 pl-4 sm:pl-6 md:pl-10 mb-12 sm:mb-16 py-2"
        style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}
      >
        <p
          ref={textRef}
          className="font-inter text-sm sm:text-base md:text-xl text-white/80 leading-relaxed font-light"
        >
          {MANIFESTO_TEXT}
        </p>
        <cite className="block font-cinzel text-xs sm:text-sm text-gold mt-6 sm:mt-8 not-italic tracking-wide">
          — Tuncay Gezer
        </cite>
      </blockquote>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
        {[
          {
            icon: '⬡',
            title: 'Biyomekanik Hat',
            desc: 'İnsan anatomisinin mühendislik hassasiyeti ve derin gölgelendirmeyle yeniden yorumlanması.',
          },
          {
            icon: '◈',
            title: 'Antik Heykel Formu',
            desc: 'Klasik Yunan ve Rönesans mermer heykel disiplininin yaşayan tene aktarımı.',
          },
          {
            icon: '✦',
            title: 'Kintsugi Felsefesi',
            desc: 'Kırılan ve aşınan yerleri saklamak yerine, altın varak ve gölgeyle yüceltmek.',
          },
        ].map(({ icon, title, desc }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="liquid-glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.1)]"
          >
            <div
              className="text-2xl sm:text-3xl mb-3 sm:mb-4"
              style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' }}
            >
              {icon}
            </div>
            <h3 className="font-cinzel text-sm sm:text-base text-white/90 mb-1.5 sm:mb-2 font-medium">{title}</h3>
            <p className="font-inter text-xs sm:text-sm text-white/50 leading-relaxed font-light">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* SVG Monogram Signature */}
      <MonogramSignature />
    </section>
  )
}
