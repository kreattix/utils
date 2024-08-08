import { toNumber } from '../strings'
import { createSizes } from './sizes'

describe('createSizes', () => {
  it('should return sizes with pixels by default', () => {
    const sizes = createSizes([20, 10])
    const result = sizes()
    expect(result).toEqual({
      large: '22px 12px',
      medium: '20px 10px',
      small: '18px 8px'
    })
  })

  it('should return sizes without pixels if sizeUnit is null', () => {
    const sizes = createSizes(toNumber('20px 10px'), null)
    const result = sizes()
    expect(result).toEqual({
      large: '22 12',
      medium: '20 10',
      small: '18 8'
    })
  })

  it('should adjust sizes based on diffAmount', () => {
    const sizes = createSizes(20)
    const result = sizes(10)
    expect(result).toEqual({
      large: '24px',
      medium: '20px',
      small: '16px'
    })
  })
  it('should adjust sizes based on diffAmount for null property', () => {
    const sizes = createSizes(20)
    const result = sizes(10)
    expect(result).toEqual({
      large: '24px',
      medium: '20px',
      small: '16px'
    })
  })
  it('should return sizes with em', () => {
    const sizes = createSizes(1, 'em')
    const result = sizes()
    expect(result).toEqual({
      large: '1.125em',
      medium: '1em',
      small: '0.875em'
    })
  })
})
