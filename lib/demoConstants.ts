import type { Via } from "./types"

const PALETTE_FILL = [
  "rgba(56,182,255,0.3)",
  "rgba(255,107,107,0.3)",
  "rgba(78,205,130,0.3)",
  "rgba(255,193,69,0.3)",
  "rgba(168,130,255,0.3)",
  "rgba(255,140,200,0.3)",
  "rgba(100,220,200,0.3)",
  "rgba(220,180,100,0.3)",
  "rgba(130,160,255,0.3)",
  "rgba(255,160,100,0.3)",
  "rgba(160,255,160,0.3)",
  "rgba(200,130,180,0.3)",
  "rgba(100,200,255,0.3)",
  "rgba(255,220,130,0.3)",
  "rgba(180,130,100,0.3)",
  "rgba(130,255,220,0.3)",
  "rgba(255,130,130,0.3)",
  "rgba(130,180,130,0.3)",
]

const PALETTE_STROKE = [
  "rgb(56,182,255)",
  "rgb(255,107,107)",
  "rgb(78,205,130)",
  "rgb(255,193,69)",
  "rgb(168,130,255)",
  "rgb(255,140,200)",
  "rgb(100,220,200)",
  "rgb(220,180,100)",
  "rgb(130,160,255)",
  "rgb(255,160,100)",
  "rgb(160,255,160)",
  "rgb(200,130,180)",
  "rgb(100,200,255)",
  "rgb(255,220,130)",
  "rgb(180,130,100)",
  "rgb(130,255,220)",
  "rgb(255,130,130)",
  "rgb(130,180,130)",
]

const INIT_VIAS: Via[] = [
  { center: { x: 120, y: 150 }, diameter: 30 },
  { center: { x: 250, y: 100 }, diameter: 25 },
  { center: { x: 200, y: 280 }, diameter: 35 },
  { center: { x: 350, y: 200 }, diameter: 28 },
  { center: { x: 100, y: 350 }, diameter: 22 },
]

export const DEMO_CONSTANTS = {
  PALETTE_FILL,
  PALETTE_STROKE,
  INIT_VIAS,
}
