import type { Bounds, ConvexRegionsComputeInput, Rect, Via } from "../lib/types"

const DEFAULT_ROWS = 4
const DEFAULT_COLUMNS = 4
const DEFAULT_X_SPACING = 75
const DEFAULT_Y_SPACING = 80
const DEFAULT_DIAMETER = 24
const DEFAULT_ORIGIN_X = 90
const DEFAULT_ORIGIN_Y = 90

export const STAGGERED_JUMPERS_BOUNDS: Bounds = {
  minX: 0,
  maxX: 450,
  minY: 0,
  maxY: 450,
}

type StaggeredViaGridOptions = {
  rows?: number
  columns?: number
  xSpacing?: number
  ySpacing?: number
  diameter?: number
  originX?: number
  originY?: number
}

export const createStaggeredJumpersVias = (
  options: StaggeredViaGridOptions = {},
): Via[] => {
  const {
    rows = DEFAULT_ROWS,
    columns = DEFAULT_COLUMNS,
    xSpacing = DEFAULT_X_SPACING,
    ySpacing = DEFAULT_Y_SPACING,
    diameter = DEFAULT_DIAMETER,
    originX = DEFAULT_ORIGIN_X,
    originY = DEFAULT_ORIGIN_Y,
  } = options

  const vias: Via[] = []
  for (let row = 0; row < rows; row += 1) {
    const rowOffset = row % 2 === 1 ? xSpacing / 2 : 0
    for (let column = 0; column < columns; column += 1) {
      vias.push({
        center: {
          x: originX + column * xSpacing + rowOffset,
          y: originY + row * ySpacing,
        },
        diameter,
      })
    }
  }

  return vias
}

export const createStaggeredJumpersInput = (): ConvexRegionsComputeInput => ({
  bounds: STAGGERED_JUMPERS_BOUNDS,
  vias: createStaggeredJumpersVias(),
  clearance: 8,
  concavityTolerance: 0,
})

type StaggeredRectGridOptions = {
  rows?: number
  columns?: number
  xSpacing?: number
  ySpacing?: number
  width?: number
  height?: number
  originX?: number
  originY?: number
  rotationEven?: number
  rotationOdd?: number
}

export const createStaggeredJumpersRects = (
  options: StaggeredRectGridOptions = {},
): Rect[] => {
  const {
    rows = DEFAULT_ROWS,
    columns = DEFAULT_COLUMNS,
    xSpacing = DEFAULT_X_SPACING,
    ySpacing = DEFAULT_Y_SPACING,
    width = 34,
    height = 18,
    originX = DEFAULT_ORIGIN_X,
    originY = DEFAULT_ORIGIN_Y,
    rotationEven = Math.PI / 12,
    rotationOdd = -Math.PI / 16,
  } = options

  const rects: Rect[] = []
  for (let row = 0; row < rows; row += 1) {
    const rowOffset = row % 2 === 1 ? xSpacing / 2 : 0
    for (let column = 0; column < columns; column += 1) {
      rects.push({
        center: {
          x: originX + column * xSpacing + rowOffset,
          y: originY + row * ySpacing,
        },
        width,
        height,
        ccwRotation: (row + column) % 2 === 0 ? rotationEven : rotationOdd,
      })
    }
  }

  return rects
}

export const createStaggeredViasInput = (): ConvexRegionsComputeInput => ({
  bounds: STAGGERED_JUMPERS_BOUNDS,
  vias: createStaggeredJumpersVias(),
  clearance: 8,
  concavityTolerance: 0,
})

export const createStaggeredRectsInput = (): ConvexRegionsComputeInput => ({
  bounds: STAGGERED_JUMPERS_BOUNDS,
  rects: createStaggeredJumpersRects(),
  clearance: 8,
  concavityTolerance: 0,
})
