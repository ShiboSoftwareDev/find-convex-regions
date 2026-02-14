import type { Bounds, Point, Via } from "./types"

export const genPoints = (
  bounds: Bounds,
  vias: Via[],
  clearance: number,
): Point[] => {
  const points: Point[] = []
  const { minX: x0, maxX: x1, minY: y0, maxY: y1 } = bounds

  points.push(
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  )

  const edgeSegments = 10
  for (let i = 1; i < edgeSegments; i++) {
    const t = i / edgeSegments
    points.push({ x: x0 + t * (x1 - x0), y: y0 })
    points.push({ x: x1, y: y0 + t * (y1 - y0) })
    points.push({ x: x1 - t * (x1 - x0), y: y1 })
    points.push({ x: x0, y: y1 - t * (y1 - y0) })
  }

  const viaSegments = 24
  for (const via of vias) {
    const radius = via.diameter / 2 + clearance
    for (let i = 0; i < viaSegments; i++) {
      const angle = (2 * Math.PI * i) / viaSegments
      points.push({
        x: via.center.x + radius * Math.cos(angle),
        y: via.center.y + radius * Math.sin(angle),
      })
    }
  }

  return points.map((point, i) => ({
    x: point.x + ((i % 7) - 3) * 1e-6,
    y: point.y + ((i % 5) - 2) * 1e-6,
  }))
}
