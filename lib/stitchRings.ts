const edgeKey = (a: number, b: number) =>
  a < b ? a * 100000 + b : b * 100000 + a

export const stitchRings = (
  ringA: number[],
  ringB: number[],
): number[] | null => {
  const edgeA = ringA.map((v, i) => [v, ringA[(i + 1) % ringA.length]] as const)
  const edgeB = ringB.map((v, i) => [v, ringB[(i + 1) % ringB.length]] as const)

  const sharedKeys = new Set<number>()
  for (const [a1, a2] of edgeA) {
    if (a2 === undefined) continue
    for (const [b1, b2] of edgeB) {
      if (b2 === undefined) continue
      if (a1 === b2 && a2 === b1) sharedKeys.add(edgeKey(a1, a2))
    }
  }
  if (sharedKeys.size === 0) return null

  const remainingEdges: Array<readonly [number, number]> = []
  for (const [a1, a2] of edgeA) {
    if (a2 === undefined) continue
    if (!sharedKeys.has(edgeKey(a1, a2))) remainingEdges.push([a1, a2])
  }
  for (const [b1, b2] of edgeB) {
    if (b2 === undefined) continue
    if (!sharedKeys.has(edgeKey(b1, b2))) remainingEdges.push([b1, b2])
  }

  if (remainingEdges.length === 0) return null

  const adjacency = new Map<number, number>()
  for (const [from, to] of remainingEdges) adjacency.set(from, to)

  const start = remainingEdges[0]?.[0]
  if (start === undefined) return null

  const chain: number[] = [start]
  let current = adjacency.get(start)
  let safety = 0

  while (
    current !== undefined &&
    current !== start &&
    safety++ < remainingEdges.length + 5
  ) {
    chain.push(current)
    current = adjacency.get(current)
  }

  if (current !== start || chain.length !== remainingEdges.length) return null
  return chain
}
