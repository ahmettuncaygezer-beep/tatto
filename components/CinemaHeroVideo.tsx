'use client'

// components/CinemaHeroVideo.tsx
// High-Definition Cinema Video Engine (Next.js 14+ / App Router, TypeScript, Tailwind CSS)
// Optical-grade background video viewport with hardware acceleration, procedural SVG film grain,
// museum vignette, and seamless horizon fade to pure obsidian.

import React, { useRef, useEffect } from 'react'
import { FilmGrainOverlay } from './FilmGrainOverlay'

export interface CinemaHeroVideoProps {
  children?: React.ReactNode
  className?: string
  webmSrc?: string
  mp4Src?: string
  objectFit?: 'contain' | 'cover'
  style?: React.CSSProperties
}

export function CinemaHeroVideo({
  children,
  className = '',
  webmSrc,
  mp4Src = '/hero-statue.mp4',
  objectFit = 'cover',
  style,
}: CinemaHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = React.useState(false)

  // Ensure seamless inline playback on iOS / Safari / Chromium without native controls
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.muted = true

    if (video.readyState >= 2) {
      setIsVideoReady(true)
    }

    // Safe autoplay handling against strict browser interaction policies
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoReady(true))
        .catch(() => {
          // Autoplay restricted — first high-definition frame remains pinned cleanly
        })
    }
  }, [])

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
      style={{ backgroundColor: '#000000', ...style }}
    >
      {/* Zero-flash black curtain: guarantees seamless obsidian black on F5 / initial decode */}
      <div
        className={`absolute inset-0 bg-black pointer-events-none z-20 transition-opacity duration-300 ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: '#000000' }}
        aria-hidden="true"
      />

      {/* ── 1. GPU-Accelerated Optical Video Layer ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        onLoadedData={() => setIsVideoReady(true)}
        onPlaying={() => setIsVideoReady(true)}
        className={`w-full h-full bg-black ${
          objectFit === 'cover'
            ? 'object-cover object-[center_20%] lg:object-center'
            : 'object-contain object-center'
        } transform-gpu will-change-transform`}
        style={{
          backgroundColor: '#000000',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
        aria-hidden="true"
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
      </video>

      {/* ── 2. Procedural Anti-Banding SVG Film Grain Overlay ── */}
      <FilmGrainOverlay />

      {/* ── 3. Museum Vignette & Seamless Horizon Fade ── */}
      {/* 3A: Radial Museum Vignette — Gentle peripheral focus without darkening the video */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 3B: Seamless Horizon Bottom Fade — 0% visible edge transitioning to following section */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 w-full pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 65%, #000000 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── 4. Optional Foreground Slot (Pass-through for interactive UI / Typography) ── */}
      {children && (
        <div className="relative z-30 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  )
}

export default CinemaHeroVideo
