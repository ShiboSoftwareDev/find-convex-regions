import type { Point } from "./types"

export const polyArea = (ring: Point[]): number => {
  let signedArea2 = 0
  for (let i = 0; i < ring.length; i++) {
    const current = ring[i]
    const j = (i + 1) % ring.length
    const next = ring[j]
    if (!current || !next) continue
    signedArea2 += current.x * next.y - next.x * current.y
  }
  return Math.abs(signedArea2) / 2
}
