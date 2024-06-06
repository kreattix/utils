import { ISizes } from './types'

export function createSizes(size: number | number[], returnInPixels = true) {
  const currentSize = Array.isArray(size) ? size : [size]

  function _getDiff(value: number, differByAmount: number) {
    const amount = Math.ceil(value / differByAmount)
    return (amount > 1 ? 2 * Math.ceil(amount / 2) : amount) * 2
  }

  const sizeWithUnit = (size: number) => (returnInPixels ? size + 'px' : size)

  function _getSizes(diff: number[]): Record<ISizes, string | number> {
    return {
      large: currentSize.map((size, index) => sizeWithUnit(size + diff[index])).join(' '),
      medium: currentSize.map((size) => sizeWithUnit(size)).join(' '),
      small: currentSize.map((size, index) => sizeWithUnit(size - diff[index])).join(' '),
    }
  }

  return (diffAmount = 20) => {
    const diff = currentSize.map((size) => _getDiff(size, diffAmount))
    return _getSizes(diff)
  }
}
