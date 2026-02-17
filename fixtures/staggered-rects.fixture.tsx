import { useMemo } from "react"
import { ConvexRegionsSolver } from "../lib/ConvexRegionsSolver"
import { regionPath } from "../lib/regionPath"
import type { Point, Rect } from "../lib/types"
import { createStaggeredRectsInput } from "../tests/staggered-jumpers.shared"

const REGION_FILL = "rgba(56,182,255,0.25)"
const REGION_STROKE = "rgb(56,182,255)"

const getRectCorners = (rect: Rect, inflate = 0): Point[] => {
  const halfWidth = rect.width / 2 + inflate
  const halfHeight = rect.height / 2 + inflate
  const cosTheta = Math.cos(rect.ccwRotation)
  const sinTheta = Math.sin(rect.ccwRotation)

  const toWorld = (x: number, y: number): Point => ({
    x: rect.center.x + x * cosTheta - y * sinTheta,
    y: rect.center.y + x * sinTheta + y * cosTheta,
  })

  return [
    toWorld(-halfWidth, -halfHeight),
    toWorld(halfWidth, -halfHeight),
    toWorld(halfWidth, halfHeight),
    toWorld(-halfWidth, halfHeight),
  ]
}

const polyPoints = (points: Point[]): string =>
  points.map((p) => `${p.x},${p.y}`).join(" ")

export default function StaggeredRectsFixture() {
  const input = useMemo(() => createStaggeredRectsInput(), [])
  const output = useMemo(() => {
    const solver = new ConvexRegionsSolver(input)
    solver.solve()
    return solver.getOutput()
  }, [input])

  if (!output) return null

  const { regions } = output

  return (
    <div style={{ padding: 20, background: "#f6f8fc", minHeight: "100vh" }}>
      <svg
        viewBox={`-20 -20 ${input.bounds.maxX + 40} ${input.bounds.maxY + 40}`}
        style={{ width: "100%", maxWidth: 760, background: "#ffffff" }}
      >
        <rect
          x={input.bounds.minX}
          y={input.bounds.minY}
          width={input.bounds.maxX - input.bounds.minX}
          height={input.bounds.maxY - input.bounds.minY}
          fill="none"
          stroke="#556070"
          strokeWidth={1.5}
          strokeDasharray="6,3"
        />

        {regions.map((region, index) => (
          <path
            key={`region-${index}`}
            d={regionPath(region)}
            fill={REGION_FILL}
            stroke={REGION_STROKE}
            strokeWidth={1.2}
          />
        ))}

        {(input.rects ?? []).map((rect, index) => {
          const clearanceOutline = getRectCorners(rect, input.clearance)
          const body = getRectCorners(rect)

          return (
            <g key={`rect-${index}`}>
              <polygon
                points={polyPoints(clearanceOutline)}
                fill="rgba(255,60,60,0.08)"
                stroke="rgba(255,100,100,0.3)"
                strokeWidth={0.8}
                strokeDasharray="3,2"
              />
              <polygon
                points={polyPoints(body)}
                fill="rgba(200,80,80,0.55)"
                stroke="#ff6b6b"
                strokeWidth={1.2}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
