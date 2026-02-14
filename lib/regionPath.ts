import type { Point } from "./types"

export const regionPath = (region: Point[]): string =>
  `${region
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ")} Z`
