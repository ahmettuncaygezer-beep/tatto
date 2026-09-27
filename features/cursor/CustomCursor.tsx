'use client'

// features/cursor/CustomCursor.tsx
// Laser needle-point amber spark with trailing particle wake
// Golden reticle on interactive hover with instant click & mouseout dismissal

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { isTouchDevice } from '@/shared/lib/utils'

interface TrailParticle {
  id: number
  x: number
  y: number
  opacity: number
  scale: number
}

const SPRING_CONFIG = { damping: 28, stiffness: 450, mass: 0.4 }
const CURSOR_COLOR = '#D4AF37'
const TRAIL_LENGTH = 8

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [trail, setTrail] = useState<TrailParticle[]>([])
  const trailIdRef = useRef(0)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, SPRING_CONFIG)
  const springY = useSpring(mouseY, SPRING_CONFIG)

  const updateTrail = useCallback((x: number, y: number) => {
    trailIdRef.current += 1
    const id = trailIdRef.current
    setTrail((prev) => {
      const newParticle: TrailParticle = { id, x, y, opacity: 0.65, scale: 1 }
      const updated = [newParticle, ...prev.slice(0, TRAIL_LENGTH - 1)]
      return updated.map((p, i) => ({
        ...p,
        opacity: (1 - i / TRAIL_LENGTH) * 0.5,
        scale: 1 - i * 0.09,
      }))
    })
  }, [])

  useEffect(() => {
    if (isTouchDevice()) {
      setIsTouch(true)
      return
    }

    // Hide native cursor when custom cursor is active
    document.body.classList.add('cursor-none')

    const checkElementUnderCursor = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      // Never show interactive hover reticle over text inputs and textareas
      if (el?.closest('input, textarea, select')) {
        setIsHovering(false)
        return
      }
      if (el && el.closest('button, a, [data-interactive="true"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      updateTrail(e.clientX, e.clientY)
      if (!isVisible) setIsVisible(true)
      checkElementUnderCursor(e.clientX, e.clientY)
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => {
      setIsVisible(false)
      setIsHovering(false)
    }

    // Instantly dismiss reticle on click / mousedown so it never lingers
    const onMouseDown = () => {
      setIsHovering(false)
    }

    const onClick = (e: MouseEvent) => {
      // Re-verify after click in case modal/element closed or changed
      setTimeout(() => {
        checkElementUnderCursor(e.clientX, e.clientY)
      }, 50)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('click', onClick)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('click', onClick)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [mouseX, mouseY, updateTrail, isVisible])

  if (isTouch) return null

  return (
    <>
      {/* Trail particles */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            transform: `translate3d(${particle.x - 2}px, ${particle.y - 2}px, 0) scale(${particle.scale})`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: CURSOR_COLOR,
            opacity: isVisible ? particle.opacity : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          {/* Central needle spark */}
          <div
            style={{
              width: isHovering ? 4 : 6,
              height: isHovering ? 4 : 6,
              borderRadius: '50%',
              backgroundColor: CURSOR_COLOR,
              boxShadow: `0 0 10px 2px ${CURSOR_COLOR}, 0 0 22px 5px ${CURSOR_COLOR}66`,
              transition: 'all 0.15s ease',
            }}
          />

          {/* Reticle ring (hover state) — cleanly disappears on mouseout and click */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: `1.5px solid ${CURSOR_COLOR}`,
                    borderRadius: '50%',
                    boxShadow: `0 0 14px 2px ${CURSOR_COLOR}66`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '7px',
                      fontFamily: 'Cinzel, serif',
                      color: CURSOR_COLOR,
                      letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                      transform: 'translateY(-18px)',
                      fontWeight: 600,
                      textShadow: '0 0 4px #000',
                    }}
                  >
                    İNCELE
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
