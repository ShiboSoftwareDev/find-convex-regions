import { BaseSolver } from "@tscircuit/solver-utils"
import type { GraphicsObject } from "graphics-debug"
import { computeConvexRegions } from "./computeConvexRegions"
import type {
  ConvexRegionsComputeInput,
  ConvexRegionsComputeResult,
} from "./types"

export class ConvexRegionsSolver extends BaseSolver {
  private readonly input: ConvexRegionsComputeInput
  private result: ConvexRegionsComputeResult | null = null

  constructor(input: ConvexRegionsComputeInput) {
    super()
    this.input = input
    this.MAX_ITERATIONS = 8
  }

  override _step(): void {
    this.result = computeConvexRegions(this.input)
    this.stats = {
      vias: this.input.vias.length,
      triangles: this.result.validTris.length,
      regions: this.result.regions.length,
    }
    this.solved = true
  }

  override getConstructorParams(): [ConvexRegionsComputeInput] {
    return [this.input]
  }

  override getOutput(): ConvexRegionsComputeResult | null {
    return this.result
  }

  override visualize(): GraphicsObject {
    if (!this.result) {
      return { points: [], lines: [], rects: [], circles: [], texts: [] }
    }

    return {
      points: this.result.pts.map((pt) => ({
        x: pt.x,
        y: pt.y,
        color: "#38b6ff",
      })),
      lines: this.result.regions.flatMap((region) =>
        region.map((p, i) => {
          const next = region[(i + 1) % region.length] ?? p
          return {
            points: [
              { x: p.x, y: p.y },
              { x: next.x, y: next.y },
            ],
            strokeColor: "#4ecb82",
          }
        }),
      ),
      rects: [],
      circles: this.input.vias.map((via) => ({
        center: { x: via.center.x, y: via.center.y },
        radius: via.diameter / 2,
        stroke: "#ff6b6b",
      })),
      texts: [
        {
          x: this.input.bounds.minX + 8,
          y: this.input.bounds.minY + 16,
          text: `regions=${this.result.regions.length}`,
          color: "#ffffff",
        },
      ],
    }
  }
}
