'use client'

// features/audio/AmbientAudio.tsx
// Controls the ambient soundtrack using the original audio from hero-statue.mp4
// Synchronized with the video playback and persistent across page scroll

import { useState, useEffect, useCallback, useRef } from 'react'
import { HERO_VIDEO_PATH } from '@/shared/lib/assets'

const STORAGE_KEY = 'tg-atelier-audio-state'

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize and check audio availability
  useEffect(() => {
    setIsMounted(true)

    // Pre-create fallback audio element with the video source
    const audio = new Audio(HERO_VIDEO_PATH)
    audio.loop = true
    audio.volume = 0.8
    fallbackAudioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      fallbackAudioRef.current = null
    }
  }, [])

  const handleToggle = useCallback(async () => {
    const audio = fallbackAudioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      try {
        localStorage.setItem(STORAGE_KEY, 'muted')
      } catch {
        // Storage disabled fallback
      }
    } else {
      try {
        audio.volume = 0.75
        await audio.play()
        setIsPlaying(true)
        try {
          localStorage.setItem(STORAGE_KEY, 'playing')
        } catch {
          // Storage disabled fallback
        }
      } catch (err) {
        console.warn('Audio play notice:', err)
      }
    }
  }, [isPlaying])

  if (!isMounted) return null

  return (
    <button
      onClick={() => void handleToggle()}
      aria-label={isPlaying ? 'Ambiyans sesini kapat' : 'Ambiyans sesini aç (Video orijinal sesi)'}
      className="
        liquid-glass
        flex items-center gap-2
        px-3 sm:px-4 py-2 sm:py-2.5
        rounded-full
        text-xs tracking-[0.2em] font-syne uppercase
        text-white/80 hover:text-white
        transition-all duration-300
        hover:border-gold/50
        shadow-xl
        group
      "
      data-interactive="true"
    >
      <span className={`text-sm transition-transform duration-300 ${isPlaying ? 'scale-110' : 'scale-100'}`}>
        {isPlaying ? '🔊' : '🔈'}
      </span>

      <span className="hidden sm:inline font-syne text-[10px] tracking-[0.25em]">
        {isPlaying ? (
          <span className="text-gold font-semibold">SES AÇIK</span>
        ) : (
          <span className="text-white/70 group-hover:text-white">AMBİYANS</span>
        )}
      </span>

      {/* Animated audio frequency bars when playing */}
      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-0.5 bg-gold rounded-full animate-pulse"
              style={{
                height: `${8 + i * 3}px`,
                animationDuration: '0.7s',
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </span>
      )}
    </button>
  )
}
