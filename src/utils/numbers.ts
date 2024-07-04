/**
 * Checks if a number is within a range [min, max).
 * @param num - The number to check.
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (exclusive).
 * @returns True if the number is within the range, false otherwise.
 */
export function isInRange(num: number, min: number, max: number): boolean {
  return min <= num && num < max
}

/**
 * Checks if a number is within a range [min, max].
 * @param num - The number to check.
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns True if the number is within the range, false otherwise.
 */
export function isOrIsInRange(num: number, min: number, max: number): boolean {
  return min <= num && num <= max
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param num - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped number.
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(num, max))
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param num - The number to round.
 * @param decimalPlaces - The number of decimal places.
 * @returns The rounded number.
 */
export function roundToDecimalPlaces(
  num: number,
  decimalPlaces: number
): number {
  const factor = 10 ** decimalPlaces
  return Math.round(num * factor) / factor
}

/**
 * Checks if a number is an integer.
 * @param num - The number to check.
 * @returns True if the number is an integer, false otherwise.
 */
export function isInteger(num: number): boolean {
  return Number.isInteger(num)
}

/**
 * Checks if a number is even.
 * @param num - The number to check.
 * @returns True if the number is even, false otherwise.
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}

/**
 * Checks if a number is odd.
 * @param num - The number to check.
 * @returns True if the number is odd, false otherwise.
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max.
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Converts a number to a string with commas as thousand separators.
 * @param num - The number to format.
 * @returns The formatted string.
 */
export function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Finds the greatest common divisor (GCD) of two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The GCD of the two numbers.
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

/**
 * Finds the least common multiple (LCM) of two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The LCM of the two numbers.
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

/**
 * Converts a number to its ordinal form (e.g., 1 to 1st, 2 to 2nd).
 * @param num - The number to convert.
 * @returns The ordinal string.
 */
export function toOrdinal(num: number): string {
  const s = ['th', 'st', 'nd', 'rd'],
    v = num % 100
  return num + (s[(v - 20) % 10] || s[v] || s[0])
}

/**
 * Calculates the factorial of a number.
 * @param num - The number to calculate the factorial of.
 * @returns The factorial of the number.
 */
export function factorial(num: number): number {
  if (num < 0) return NaN
  if (num === 0) return 1
  return num * factorial(num - 1)
}
