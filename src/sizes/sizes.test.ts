import { createSizes } from './sizes'

describe('createSizes', () => {
  it('should return sizes with pixels by default', () => {
    const sizes = createSizes(20)
    const result = sizes()
    expect(result).toEqual({
      large: '22px',
      medium: '20px',
      small: '18px',
    })
  })

  it('should return sizes without pixels if returnInPixels is false', () => {
    const sizes = createSizes(20, false)
    const result = sizes()
    expect(result).toEqual({
      large: 22,
      medium: 20,
      small: 18,
    })
  })

  it('should adjust sizes based on diffAmount', () => {
    const sizes = createSizes(20)
    const result = sizes(10)
    expect(result).toEqual({
      large: '24px',
      medium: '20px',
      small: '16px',
    })
  })
  it('should adjust sizes based on diffAmount for null property', () => {
    const sizes = createSizes(20)
    const result = sizes(10)
    expect(result).toEqual({
      large: '24px',
      medium: '20px',
      small: '16px',
    })
  })
})
