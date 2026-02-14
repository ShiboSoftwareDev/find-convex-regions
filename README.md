# @tscircuit/find-convex-regions

Use `ConvexRegionsSolver` to compute convex regions from your own bounds and vias.

## Usage

```ts
import { ConvexRegionsSolver } from "@tscircuit/find-convex-regions"

const bounds = { minX: 0, maxX: 450, minY: 0, maxY: 450 }

const vias = [
  { center: { x: 120, y: 150 }, diameter: 30 },
  { center: { x: 250, y: 100 }, diameter: 25 },
  { center: { x: 200, y: 280 }, diameter: 35 },
]

const solver = new ConvexRegionsSolver({
  bounds,
  vias,
  clearance: 8,
  concavityTolerance: 0,
})

solver.solve()

const output = solver.getOutput()
if (!output) throw new Error("Failed to compute convex regions")

console.log(output.regions)
```

## Input Shape

```ts
type Point = { x: number; y: number }
type Via = { center: Point; diameter: number }
type Bounds = { minX: number; maxX: number; minY: number; maxY: number }
```

- `bounds`: your board/area rectangle.
- `vias`: your own keepouts (bring your own vias).
- `clearance`: extra radius added around each via.
- `concavityTolerance`: `0` for strict convex regions; higher values allow shallow concavity when merging.
