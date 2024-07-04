import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'

import { ScalarField } from './ScalarField'
import { fxns, colors } from '../../../utils'

const meta: Meta<typeof ScalarField> = {
  title: 'Physics/ScalarField',
  component: ScalarField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof ScalarField>

const simpleGaussian = new fxns.GaussianFunction({ standardDeviation: 2 })

export const Gaussian: Story = {
  args: {
    width: 800,
    height: Math.floor(800 * (3 / 4)),
    fieldFunction: (x, y) =>
      simpleGaussian.valueAt(x) * simpleGaussian.valueAt(y),
    options: {
      xRange: [-8, 8],
      yRange: [-6, 6],
      rangeValues: [simpleGaussian.min ** 2, simpleGaussian.max ** 2],
      palette: [colors.hexToRgb('#072E32'), colors.hexToRgb('#E4B781')]
    }
  }
}
