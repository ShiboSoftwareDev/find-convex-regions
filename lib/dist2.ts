import type { Point } from "./types"

export const dist2 = (a: Point, b: Point): number =>
  (a.x - b.x) ** 2 + (a.y - b.y) ** 2
