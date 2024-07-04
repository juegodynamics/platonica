import { DataInterface } from './types'

export class GaussianFunction {
  public amplitude: number = 1
  public mean: number = 0
  public standardDeviation: number = 1

  constructor(props?: {
    amplitude?: number
    mean?: number
    standardDeviation?: number
  }) {
    if (props) {
      Object.assign(this, props)
    }
  }

  public valueAt(input: number): number {
    return (
      this.amplitude *
      Math.exp(
        (-1 * (input - this.mean) ** 2) / (2 * this.standardDeviation ** 2)
      )
    )
  }

  public get min() {
    return 0
  }

  public get max() {
    return this.amplitude
  }
}
