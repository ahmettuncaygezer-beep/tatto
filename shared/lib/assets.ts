// shared/lib/assets.ts
// Dynamic asset registry — resolved from public/ inspection
// Confirmed: hero-statue.mp4, statue-core.png, statue-tattooed.png

export const HERO_VIDEO_PATH = '/hero-statue.mp4' as const
export const STATUE_CORE_PATH = '/statue-core.png' as const
export const STATUE_TATTOOED_PATH = '/statue-tattooed.png' as const

export const PORTFOLIO_ASSETS = {
  biomechanicalSleeve: '/portfolio/biomechanical_sleeve.jpg',
  kintsugiSpine: '/portfolio/kintsugi_spine.jpg',
  sculptureChest: '/portfolio/sculpture_chest.jpg',
  cyberneticArm: '/portfolio/cybernetic_arm.jpg',
  neoclassicalSleeve: '/portfolio/neoclassical_sleeve.jpg',
  biomechLeg: '/portfolio/biomech_leg.jpg',
} as const

export interface AssetPaths {
  heroVideo: typeof HERO_VIDEO_PATH
  statueCore: typeof STATUE_CORE_PATH
  statuetattooed: typeof STATUE_TATTOOED_PATH
}

export const ASSET_PATHS: AssetPaths = {
  heroVideo: HERO_VIDEO_PATH,
  statueCore: STATUE_CORE_PATH,
  statuetattooed: STATUE_TATTOOED_PATH,
}

// Type guard — verifies all assets are defined (non-empty strings)
export function verifyAssets(assets: AssetPaths): boolean {
  return Object.values(assets).every(
    (path) => typeof path === 'string' && path.length > 0
  )
}

