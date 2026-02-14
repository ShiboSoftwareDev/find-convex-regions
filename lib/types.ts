export type Point = {
  x: number
  y: number
}

export type Via = {
  center: Point
  diameter: number
}

export type Bounds = {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export type Triangle = [number, number, number]

export type ConvexRegionsComputeInput = {
  bounds: Bounds
  vias: Via[]
  clearance: number
  concavityTolerance: number
}

export type ConvexRegionsComputeResult = {
  pts: Point[]
  validTris: Triangle[]
  regions: Point[][]
  hulls: Point[][]
  depths: number[]
}

export type RegionPort = {
  x: number
  y: number
  region: number
}
