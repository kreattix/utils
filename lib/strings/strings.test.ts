import { hyphenize, isEmpty, saparateValueAndUnit, toNumber } from './strings'

describe('String utils', () => {
  describe('toNumber', () => {
    it('should return a number when given a string containing a number', () => {
      const text = '10px 20px'
      const result = toNumber(text)
      expect(result).toEqual([10, 20])
    })
    it('should return a number when given a number', () => {
      const number = 42
      const result = toNumber(number)
      expect(result).toEqual([42])
    })
    it('should return 0 when given an empty string', () => {
      const text = ''
      const result = toNumber(text)
      expect(result).toEqual([])
    })
    it('should return 0 when given a string without a number', () => {
      const text = 'No numbers here'
      const result = toNumber(text)
      expect(result).toEqual([])
    })
    it('should return 0 when given null', () => {
      const text = null
      const result = toNumber(text)
      expect(result).toEqual([])
    })
    it('should return 0 when given undefined', () => {
      const text = undefined
      const result = toNumber(text)
      expect(result).toEqual([])
    })
  })

  describe('hyphenize', () => {
    it('should hyphenize a camelCase string', () => {
      const text = 'camelCaseString'
      const result = hyphenize(text)
      expect(result).toEqual('camel-case-string')
    })
    it('should hyphenize a PascalCase string', () => {
      const text = 'PascalCaseString'
      const result = hyphenize(text)
      expect(result).toEqual('pascal-case-string')
    })
    it('should hyphenize a mixedCase string', () => {
      const text = 'mixedCaseString'
      const result = hyphenize(text)
      expect(result).toEqual('mixed-case-string')
    })
    it('should hyphenize a string with numbers', () => {
      const text = 'stringWithNumbers123'
      const result = hyphenize(text)
      expect(result).toEqual('string-with-numbers123')
    })
    it('should hyphenize an empty string', () => {
      const text = ''
      const result = hyphenize(text)
      expect(result).toEqual('')
    })
  })

  describe('isEmpty', () => {
    it('should return true when given null', () => {
      const value = null
      const result = isEmpty(value)
      expect(result).toEqual(true)
    })
    it('should return true when given undefined', () => {
      const value = undefined
      const result = isEmpty(value)
      expect(result).toEqual(true)
    })
    it('should return true when given an empty string', () => {
      const value = ''
      const result = isEmpty(value)
      expect(result).toEqual(true)
    })
    it('should return false when given a non-empty string', () => {
      const value = 'Hello, world!'
      const result = isEmpty(value)
      expect(result).toEqual(false)
    })
    it('should return false when given a number', () => {
      const value = 42
      const result = isEmpty(value)
      expect(result).toEqual(false)
    })
    it('should return false when given an object', () => {
      const value = { name: 'John', age: 30 }
      const result = isEmpty(value)
      expect(result).toEqual(false)
    })
    it('should return false when given an array', () => {
      const value = [1, 2, 3]
      const result = isEmpty(value)
      expect(result).toEqual(false)
    })
  })
  describe('saparateValueAndUnit', () => {
    it('should return the value and unit when given a string with a value and unit', () => {
      const value = '10px'
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([10, 'px'])
    })
    it('should return the value and unit when given, test with em', () => {
      const value = '10em'
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([10, 'em'])
    })
    it('should append empty string unit when given a number', () => {
      const value = 10
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([10, ''])
    })
    it('should return default value for empty string', () => {
      const value = ''
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([0, ''])
    })
    it('should return default value for null', () => {
      const value = null
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([0, ''])
    })
    it('should return correct value if number is passed as string', () => {
      const value = '1'
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([1, ''])
    })
    it('should return correct value if multiple values are passed as string', () => {
      const value = '10px 20em'
      const result = saparateValueAndUnit(value)
      expect(result).toEqual([
        [10, 20],
        ['px', 'em']
      ])
    })
  })
})
