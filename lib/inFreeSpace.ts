import type { Bounds, Via } from "./types"

export const inFreeSpace = (
  px: number,
  py: number,
  bounds: Bounds,
  vias: Via[],
  clearance: number,
): boolean => {
  const { minX, maxX, minY, maxY } = bounds
  if (
    px < minX - 0.1 ||
    px > maxX + 0.1 ||
    py < minY - 0.1 ||
    py > maxY + 0.1
  ) {
    return false
  }

  for (const via of vias) {
    const radius = via.diameter / 2 + clearance
    if (
      (px - via.center.x) ** 2 + (py - via.center.y) ** 2 <
      radius * radius - 0.1
    ) {
      return false
    }
  }

  return true
}
