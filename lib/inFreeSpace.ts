import type { Bounds, Rect, Via } from "./types"

export const inFreeSpace = (
  px: number,
  py: number,
  bounds: Bounds,
  vias: Via[] = [],
  clearance: number,
  rects: Rect[] = [],
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

  for (const rect of rects) {
    const halfWidth = rect.width / 2 + clearance
    const halfHeight = rect.height / 2 + clearance
    const dx = px - rect.center.x
    const dy = py - rect.center.y
    const cosTheta = Math.cos(rect.ccwRotation)
    const sinTheta = Math.sin(rect.ccwRotation)
    const localX = dx * cosTheta + dy * sinTheta
    const localY = -dx * sinTheta + dy * cosTheta

    if (
      Math.abs(localX) < halfWidth - 0.1 &&
      Math.abs(localY) < halfHeight - 0.1
    ) {
      return false
    }
  }

  return true
}
