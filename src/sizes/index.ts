import { ISizes } from './types'

export function createSizes(size: number, returnInPixels = true) {
  const currentSize = size

  function _getDiff(value: number, differByAmount: number) {
    const amount = Math.ceil(value / differByAmount)
    return (amount > 1 ? 2 * Math.ceil(amount / 2) : amount) * 2
  }

  const sizeWithUnit = (size: number) => (returnInPixels ? size + 'px' : size)

  function _getSizes(diff: number): Record<ISizes, string | number> {
    return {
      large: sizeWithUnit(currentSize + diff),
      medium: sizeWithUnit(currentSize),
      small: sizeWithUnit(currentSize - diff),
    }
  }

  return (propertyName?: string, diffAmount = 20) => {
    if (['borderRadius'].includes(propertyName || '')) {
      diffAmount = 10
    }
    const diff = _getDiff(currentSize, diffAmount)
    return _getSizes(diff)
  }
}
