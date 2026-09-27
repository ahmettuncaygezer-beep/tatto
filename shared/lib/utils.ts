// shared/lib/utils.ts
// cn helper, Roman numeral converter, Simplex noise math utilities

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─────────────────────────────────────────────
// CSS Class Merger
// ─────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ─────────────────────────────────────────────
// Roman Numeral Converter
// Used for "Milat Tarihi" — converts year to Roman numerals
// ─────────────────────────────────────────────

const ROMAN_NUMERALS: ReadonlyArray<[number, string]> = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

export function toRomanNumeral(num: number): string {
  if (num <= 0 || num > 9999) return 'INVALIDA'
  let result = ''
  let remaining = num
  for (const [value, numeral] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }
  return result
}

export function dateToRoman(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'INVALIDA'
  const year = date.getFullYear()
  return toRomanNumeral(year)
}

// ─────────────────────────────────────────────
// Simplex Noise (lightweight 2D implementation)
// Used for Kintsugi gold seam pulsation
// ─────────────────────────────────────────────

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a)
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3
  const u = h < 2 ? x : y
  const v = h < 2 ? y : x
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v)
}

const PERM: number[] = []
const PERM_MOD12: number[] = []

function buildPerm(): void {
  const p: number[] = []
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255]
    PERM_MOD12[i] = PERM[i] % 12
  }
}

buildPerm()

export function simplexNoise2D(xin: number, yin: number): number {
  const F2 = 0.5 * (Math.sqrt(3) - 1)
  const G2 = (3 - Math.sqrt(3)) / 6
  const s = (xin + yin) * F2
  const i = Math.floor(xin + s)
  const j = Math.floor(yin + s)
  const t = (i + j) * G2
  const X0 = i - t
  const Y0 = j - t
  const x0 = xin - X0
  const y0 = yin - Y0
  const i1 = x0 > y0 ? 1 : 0
  const j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1.0 + 2.0 * G2
  const y2 = y0 - 1.0 + 2.0 * G2
  const ii = i & 255
  const jj = j & 255
  let n0 = 0, n1 = 0, n2 = 0
  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 >= 0) {
    t0 *= t0
    n0 = t0 * t0 * grad(PERM[ii + PERM[jj]], x0, y0)
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 >= 0) {
    t1 *= t1
    n1 = t1 * t1 * grad(PERM[ii + i1 + PERM[jj + j1]], x1, y1)
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 >= 0) {
    t2 *= t2
    n2 = t2 * t2 * grad(PERM[ii + 1 + PERM[jj + 1]], x2, y2)
  }
  return 70.0 * (n0 + n1 + n2)
}

// Normalize to [0, 1]
export function simplexNoise2DNormalized(x: number, y: number): number {
  return (simplexNoise2D(x, y) + 1) / 2
}

// ─────────────────────────────────────────────
// Misc Utilities
// ─────────────────────────────────────────────

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp2(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  const isCoarse = window.matchMedia('(pointer: coarse)').matches
  const canHover = window.matchMedia('(hover: hover)').matches
  const hasTouchPoints = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0
  return isCoarse || (hasTouchPoints && !canHover)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function scrollToElement(selectorOrElement: string | HTMLElement, offset = -30) {
  if (typeof window === 'undefined') return
  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, options?: object) => void } }).__lenis
  if (lenis) {
    lenis.scrollTo(selectorOrElement, { offset, duration: 1.2 })
    return
  }
  const el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
