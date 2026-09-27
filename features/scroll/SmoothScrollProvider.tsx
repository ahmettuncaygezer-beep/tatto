'use client'

// features/scroll/SmoothScrollProvider.tsx
// Lenis smooth scroll initialized and synced with GSAP ScrollTrigger
// Includes smooth hash anchor navigation interception

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis
    if (typeof window !== 'undefined') {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    // Sync Lenis with GSAP ScrollTrigger ticker
    lenis.on('scroll', ScrollTrigger.update)

    const gsapTickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(gsapTickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Smooth scroll for in-page anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -30,
            duration: 1.4,
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(gsapTickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
