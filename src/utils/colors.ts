import { isInRange } from './numbers'

export interface Color {
  red: number // 0-255
  green: number // 0-255
  blue: number // 0-255
  alpha?: number // 0-1 (optional)
}

// Constants
const MAX_RGB_VALUE = 255
const MAX_ALPHA_VALUE = 1
const MAX_HUE_VALUE = 360
const HEX_BASE = 16
const SEGMENT_60 = 60
const SEGMENT_120 = 120
const SEGMENT_180 = 180
const SEGMENT_240 = 240
const SEGMENT_300 = 300

/**
 * Converts an RGB color to a HEX string.
 * @param color - The RGB color.
 * @returns The HEX string.
 */
export function rgbToHex(color: Color): string {
  const { red, green, blue } = color
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue)
    .toString(HEX_BASE)
    .slice(1)
    .toUpperCase()}`
}

export function blend(
  colorA: Color,
  colorB: Color,
  weight: number = 0.5
): Color {
  return {
    red: colorA.red * (1 - weight) + colorB.red * weight,
    green: colorA.green * (1 - weight) + colorB.green * weight,
    blue: colorA.blue * (1 - weight) + colorB.blue * weight
  }

  // const hsvA = rgbToHsv(colorA)
  // const hsvB = rgbToHsv(colorB)

  // return hsvToRgb(
  //   hsvA.hue * (1 - weight) + hsvB.hue * weight,
  //   hsvA.saturation * (1 - weight) + hsvB.saturation * weight,
  //   hsvA.value * (1 - weight) + hsvB.value * weight
  // )
}

export function getColorFromValue(colors: Color[], weight: number): Color {
  const scaledIndex = weight * (colors.length - 1)
  const colorA = colors[Math.max(Math.floor(scaledIndex), 0)]
  const colorB = colors[Math.min(Math.ceil(scaledIndex), colors.length - 1)]
  const interpolationWeight = scaledIndex - Math.floor(scaledIndex)
  return blend(colorA, colorB, interpolationWeight)
}

/**
 * Converts an RGB color to HSV.
 * @param color - The RGB color.
 * @returns The HSV color.
 */
export function rgbToHsv(color: Color): {
  hue: number
  saturation: number
  value: number
} {
  let { red, green, blue } = color
  red /= MAX_RGB_VALUE
  green /= MAX_RGB_VALUE
  blue /= MAX_RGB_VALUE

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min

  let hue = 0
  if (delta !== 0) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6
    } else if (max === green) {
      hue = (blue - red) / delta + 2
    } else {
      hue = (red - green) / delta + 4
    }
  }

  hue = Math.round(hue * SEGMENT_60)
  if (hue < 0) hue += MAX_HUE_VALUE

  const saturation = max === 0 ? 0 : delta / max
  const value = max

  return {
    hue,
    saturation: parseFloat(saturation.toFixed(2)),
    value: parseFloat(value.toFixed(2))
  }
}

/**
 * Converts an HSV color to RGB.
 * @param hue - The hue (0-360).
 * @param saturation - The saturation (0-1).
 * @param value - The value (0-1).
 * @returns The RGB color.
 */
export function hsvToRgb(
  hue: number,
  saturation: number,
  value: number
): Color {
  const chroma = value * saturation // Chroma is the intensity of the color
  const x = chroma * (1 - Math.abs(((hue / SEGMENT_60) % 2) - 1)) // Secondary intensity of the color
  const m = value - chroma // Match component to adjust to [0,1]

  let red = 0,
    green = 0,
    blue = 0

  if (isInRange(hue, 0, SEGMENT_60)) {
    red = chroma
    green = x
    blue = 0
  } else if (isInRange(hue, SEGMENT_60, SEGMENT_120)) {
    red = x
    green = chroma
    blue = 0
  } else if (isInRange(hue, SEGMENT_120, SEGMENT_180)) {
    red = 0
    green = chroma
    blue = x
  } else if (isInRange(hue, SEGMENT_180, SEGMENT_240)) {
    red = 0
    green = x
    blue = chroma
  } else if (isInRange(hue, SEGMENT_240, SEGMENT_300)) {
    red = x
    green = 0
    blue = chroma
  } else if (isInRange(hue, SEGMENT_300, MAX_HUE_VALUE)) {
    red = chroma
    green = 0
    blue = x
  }

  return {
    red: Math.round((red + m) * MAX_RGB_VALUE),
    green: Math.round((green + m) * MAX_RGB_VALUE),
    blue: Math.round((blue + m) * MAX_RGB_VALUE)
  }
}

/**
 * Gets the color as a string with the specified format.
 * @param color - The color.
 * @param format - The desired format: "rgb", "rgba", "hex".
 * @returns The color string.
 */
export function colorToString(
  color: Color,
  format: 'rgb' | 'rgba' | 'hex'
): string {
  const { red, green, blue, alpha = MAX_ALPHA_VALUE } = color

  switch (format) {
    case 'rgb':
      return `rgb(${red}, ${green}, ${blue})`
    case 'rgba':
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    case 'hex':
      return rgbToHex(color)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

/**
 * Converts a HEX string to an RGB color.
 * @param hex - The HEX string.
 * @returns The RGB color.
 */
export function hexToRgb(hex: string): Color {
  let cleanedHex = hex.replace(/^#/, '')
  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const red = parseInt(cleanedHex.substring(0, 2), HEX_BASE)
  const green = parseInt(cleanedHex.substring(2, 4), HEX_BASE)
  const blue = parseInt(cleanedHex.substring(4, 6), HEX_BASE)

  return { red, green, blue }
}
