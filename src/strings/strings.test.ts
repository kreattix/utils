import { getNumber, hyphenize, isEmpty } from './strings'

describe('String utils', () => {
  describe('getNumber', () => {
    it('should return a number when given a string containing a number', () => {
      const text = 'The number is 42'
      const result = getNumber(text)
      expect(result).toEqual(42)
    })
    it('should return a number when given a number', () => {
      const number = 42
      const result = getNumber(number)
      expect(result).toEqual(42)
    })
    it('should return 0 when given an empty string', () => {
      const text = ''
      const result = getNumber(text)
      expect(result).toEqual(0)
    })
    it('should return 0 when given a string without a number', () => {
      const text = 'No numbers here'
      const result = getNumber(text)
      expect(result).toEqual(0)
    })
    it('should return 0 when given null', () => {
      const text = null
      const result = getNumber(text)
      expect(result).toEqual(0)
    })
    it('should return 0 when given undefined', () => {
      const text = undefined
      const result = getNumber(text)
      expect(result).toEqual(0)
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
})
