import { delaunay } from "./delaunay"
import { filterTris } from "./filterTris"
import { genPoints } from "./genPoints"
import { hullIdx } from "./hullIdx"
import { mergeCells } from "./mergeCells"
import type {
  ConvexRegionsComputeInput,
  ConvexRegionsComputeResult,
} from "./types"

const isDefinedPoint = <T>(value: T | undefined): value is T =>
  value !== undefined

export const computeConvexRegions = (
  input: ConvexRegionsComputeInput,
): ConvexRegionsComputeResult => {
  const { bounds, vias, clearance, concavityTolerance } = input
  const pts = genPoints(bounds, vias, clearance)
  const allTriangles = delaunay(pts)
  const validTris = filterTris(allTriangles, pts, bounds, vias, clearance)
  const { cells, depths } = mergeCells(validTris, pts, concavityTolerance)

  const regions = cells.map((cell) =>
    cell.map((i) => pts[i]).filter(isDefinedPoint),
  )
  const hulls = cells.map((cell) =>
    hullIdx(cell, pts)
      .map((i) => pts[i])
      .filter(isDefinedPoint),
  )

  return {
    pts,
    validTris,
    regions,
    hulls,
    depths,
  }
}
