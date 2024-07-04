import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import 'katex/dist/katex.min.css'
import { colors, numbers } from '../../../utils'
import 'katex/dist/katex.min.css'
import katex from 'katex'

export interface ScalarFieldProps {
  width: number
  height: number
  fieldFunction: (x: number, y: number) => number
  options?: Partial<ScalarFieldOptions>
}

export interface ScalarFieldOptions {
  xRange: [number, number]
  yRange: [number, number]
  rangeValues: [number, number]
  palette: colors.Color[]
}

export const defaultScalarFieldOptions: ScalarFieldOptions = {
  xRange: [-10, 10],
  yRange: [-8, 8],
  rangeValues: [-1, 1],
  palette: [
    colors.hexToRgb('#ff0000'),
    colors.hexToRgb('#000000'),
    colors.hexToRgb('#0000ff')
  ]
}

export const fillOptionDefaults = <T extends Record<string, any>>(
  options: Partial<T>,
  defaults: T
): T =>
  Object.entries(defaults).reduce(
    (partial, [key, defaultValue]) => ({
      ...partial,
      [key]:
        options[key as keyof T] !== undefined
          ? options[key as keyof T]
          : defaultValue
    }),
    {} as T
  )

export const ScalarField: React.FC<ScalarFieldProps> = ({
  width,
  height,
  fieldFunction,
  options
}) => {
  const { xRange, yRange, rangeValues, palette } = options
    ? fillOptionDefaults(options, defaultScalarFieldOptions)
    : defaultScalarFieldOptions

  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const imageData = context.createImageData(width, height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const xScaled = (1 - x / width) * xRange[0] + (x / width) * xRange[1]
        const yScaled = (1 - y / height) * yRange[0] + (y / height) * yRange[1]
        const value = numbers.clamp(
          fieldFunction(xScaled, yScaled),
          rangeValues[0],
          rangeValues[1]
        )
        const normalizedValue =
          (value - rangeValues[0]) / (rangeValues[1] - rangeValues[0])
        const color = colors.getColorFromValue(palette, normalizedValue)
        const index = (y * width + x) * 4
        imageData.data.set([color.red, color.green, color.blue, 255], index)
      }
    }
    context.putImageData(imageData, 0, 0)
  }, [width, height, fieldFunction, xRange, yRange, rangeValues, palette])

  const [mousePos, setMousePos] = React.useState<{
    x: number
    y: number
  } | null>(null)
  const [fieldValue, setFieldValue] = React.useState<number | null>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(event.clientX - rect.left)
    const y = Math.floor(event.clientY - rect.top)

    if (x >= 0 && x < width && y >= 0 && y < height) {
      setMousePos({ x, y })

      const xScaled = (1 - x / width) * xRange[0] + (x / width) * xRange[1]
      const yScaled = (1 - y / height) * yRange[0] + (y / height) * yRange[1]
      const value = numbers.clamp(
        fieldFunction(xScaled, yScaled),
        rangeValues[0],
        rangeValues[1]
      )
      setFieldValue(value)
    } else {
      setMousePos(null)
      setFieldValue(null)
    }
  }

  const renderLatex = (x: number, y: number, value: number) => {
    return katex.renderToString(
      `\\left(${x.toFixed(2)}, ${y.toFixed(2)}\\right) \\mapsto ${value.toFixed(
        2
      )}`
    )
  }

  return (
    <Box position='relative'>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setMousePos(null)
          setFieldValue(null)
        }}
        style={{ cursor: 'crosshair', borderRadius: '16px' }}
      />
      {mousePos && fieldValue !== null ? (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            left: mousePos?.x + 4,
            top: mousePos?.y + 4,
            px: 0.5,
            py: 0.5,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            opacity: 0.8
          }}
        >
          <Typography
            variant='body1'
            dangerouslySetInnerHTML={{
              __html: renderLatex(
                (1 - mousePos.x / width) * xRange[0] +
                  (mousePos.x / width) * xRange[1],

                (1 - mousePos.y / height) * yRange[0] +
                  (mousePos.y / height) * yRange[1],
                fieldValue
              )
            }}
          />
        </Paper>
      ) : null}
    </Box>
  )
}
