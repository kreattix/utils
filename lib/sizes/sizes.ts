import { ISizes } from './types'

export function createSizes(
  size: number | number[],
  sizeUnit: string | null | (string | null)[] = 'px'
) {
  const currentSize = Array.isArray(size) ? size : [size]
  let currentSizeUnit = Array.isArray(sizeUnit) ? sizeUnit : [sizeUnit]

  if (currentSize.length > 1 && currentSizeUnit.length === 1) {
    currentSizeUnit = Array(currentSize.length).fill(currentSizeUnit[0])
  }
  function _getDiff(value: number, differByAmount: number) {
    const amount = Math.ceil(value / differByAmount)
    return (amount > 1 ? 2 * Math.ceil(amount / 2) : amount) * 2
  }

  const sizeWithUnit = (size: number, index: number) =>
    currentSizeUnit[index] !== null ? size + (currentSizeUnit[index] || 'px') : size

  function _getSizes(differByAmount: number[]): Record<ISizes, string | number> {
    let diff = differByAmount
    if (currentSizeUnit.includes('em')) {
      diff = differByAmount.map((size) => size / 16)
    }
    return {
      large: currentSize.map((size, index) => sizeWithUnit(size + diff[index], index)).join(' '),
      medium: currentSize.map((size, index) => sizeWithUnit(size, index)).join(' '),
      small: currentSize.map((size, index) => sizeWithUnit(size - diff[index], index)).join(' ')
    }
  }

  return (diffAmount = 20) => {
    const diff = currentSize.map((size) => _getDiff(size, diffAmount))
    return _getSizes(diff)
  }
}
