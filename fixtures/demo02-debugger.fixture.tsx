import { GenericSolverDebugger } from "@tscircuit/solver-utils/react"
import { useMemo, useState } from "react"
import { ConvexRegionsSolver } from "../lib/ConvexRegionsSolver"
import { DEMO_CONSTANTS } from "../lib/demoConstants"
import type { Via } from "../lib/types"

const W = 450
const H = 450
const BOUNDS = { minX: 0, maxX: W, minY: 0, maxY: H }

export default function Demo02DebuggerFixture() {
  const [vias, setVias] = useState<Via[]>(DEMO_CONSTANTS.INIT_VIAS)
  const [clearance, setClearance] = useState(8)
  const [concavityTolerance, setConcavityTolerance] = useState(0)

  const solver = useMemo(
    () =>
      new ConvexRegionsSolver({
        bounds: BOUNDS,
        vias,
        clearance,
        concavityTolerance,
      }),
    [vias, clearance, concavityTolerance],
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 12,
        background: "#12141a",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          color: "#e6e8ee",
          alignItems: "center",
        }}
      >
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          Clearance
          <input
            type="range"
            min={0}
            max={40}
            value={clearance}
            onChange={(e) => setClearance(Number(e.target.value))}
          />
          <span>{clearance}px</span>
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          Concavity
          <input
            type="range"
            min={0}
            max={80}
            step={0.5}
            value={concavityTolerance}
            onChange={(e) => setConcavityTolerance(Number(e.target.value))}
          />
          <span>{concavityTolerance.toFixed(1)}px</span>
        </label>

        <button
          type="button"
          onClick={() => setVias(DEMO_CONSTANTS.INIT_VIAS)}
          style={{ padding: "6px 10px", cursor: "pointer" }}
        >
          Reset vias
        </button>
      </div>

      <GenericSolverDebugger solver={solver} animationSpeed={25} />
    </div>
  )
}
