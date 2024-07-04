export type Vector = readonly [number, number, number]
export const X: 0 = 0
export const Y: 1 = 1
export const Z: 2 = 2
export const VectorComponents = [X, Y, Z] as const

export const vmap = (
  vector: Vector,
  componentFn: (value: number, index: number) => number
): Vector => [
  componentFn(vector[X], X),
  componentFn(vector[Y], Y),
  componentFn(vector[Z], Z)
]

export const add = (vectorA: Vector, vectorB: Vector): Vector =>
  vmap(vectorA, (value, index) => value + vectorB[index])

export const scale = (factor: number, vector: Vector): Vector =>
  vmap(vector, (value) => value * factor)
