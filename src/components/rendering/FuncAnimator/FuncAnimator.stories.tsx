import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'

import { fxns, colors } from '../../../utils'
import { FuncAnimator } from './FuncAnimator'
import { ScalarField } from '../../physics'

const meta: Meta<typeof FuncAnimator> = {
  title: 'Rendering/FuncAnimator',
  component: FuncAnimator,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof FuncAnimator>

const simpleGaussian = new fxns.GaussianFunction({ standardDeviation: 1 })

export const Field: Story = {
  args: {
    timeRange: [0, Math.PI * 2],
    loop: true,
    children: ({ time: t }) => (
      <ScalarField
        width={800}
        height={Math.floor(800 * (3 / 4))}
        fieldFunction={(x, y) =>
          simpleGaussian.valueAt(x - 2 * Math.sin(t)) *
          simpleGaussian.valueAt(y)
        }
        options={{
          xRange: [-8, 8],
          yRange: [-6, 6],
          rangeValues: [simpleGaussian.min ** 2, simpleGaussian.max ** 2],
          palette: [colors.hexToRgb('#072E32'), colors.hexToRgb('#E4B781')]
        }}
      />
    )
  }
}
