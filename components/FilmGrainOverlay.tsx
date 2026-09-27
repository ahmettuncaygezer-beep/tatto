'use client'

// components/FilmGrainOverlay.tsx
// Procedural SVG Film Grain Overlay
// Eliminates dark gradient banding / 8-bit quantization artifacts with zero CPU load

import React from 'react'

export function FilmGrainOverlay() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.038,
        }}
      >
        <filter id="cinema-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinema-grain)" />
      </svg>
    </div>
  )
}
