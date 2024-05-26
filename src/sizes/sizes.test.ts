import { createSizes } from './index'

describe('createSizes', () => {
  it('should return sizes with default properties', () => {
    const sizes = createSizes(100)
    const result = sizes()
    expect(result).toEqual({
      large: '112px',
      medium: '100px',
      small: '88px',
    })
  })

  it('should return sizes with custom diff amount', () => {
    const sizes = createSizes(100)
    const result = sizes(undefined, 30)
    expect(result).toEqual({
      large: '108px',
      medium: '100px',
      small: '92px',
    })
  })

  it('should return sizes with custom property name', () => {
    const sizes = createSizes(110)
    const result = sizes('borderRadius')
    expect(result).toEqual({
      large: '134px',
      medium: '110px',
      small: '86px',
    })
  })

  it('should return sizes without returning in pixels', () => {
    const sizes = createSizes(100, false)
    const result = sizes()
    expect(result).toEqual({
      large: 112,
      medium: 100,
      small: 88,
    })
  })
})
