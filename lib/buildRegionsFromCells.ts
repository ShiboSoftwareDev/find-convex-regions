import { hullIdx } from "./hullIdx"
import { isDefined } from "./isDefined"
import type { MergeCellsStageOutput, Point } from "./types"

export const buildRegionsFromCells = (
  merged: MergeCellsStageOutput,
): { regions: Point[][]; hulls: Point[][] } => {
  const regions = merged.cells.map((cell) =>
    cell.map((i) => merged.pts[i]).filter(isDefined),
  )
  const hulls = merged.cells.map((cell) =>
    hullIdx(cell, merged.pts)
      .map((i) => merged.pts[i])
      .filter(isDefined),
  )
  return { regions, hulls }
}
