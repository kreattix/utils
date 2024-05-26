import { getNumber, hyphenize } from './strings'

describe('String utils', () => {
  describe('hyphenize', () => {
    it('should hyphenize a camelCase string', () => {
      const input = 'helloWorld'
      const output = hyphenize(input)
      expect(output).toEqual('hello-world')
    })
    it('should hyphenize a PascalCase string', () => {
      const input = 'HelloWorld'
      const output = hyphenize(input)
      expect(output).toEqual('hello-world')
    })
    it('should hyphenize a mixedCase string', () => {
      const input = 'helloWorld123'
      const output = hyphenize(input)
      expect(output).toEqual('hello-world123')
    })
    it('should not hyphenize a string with no uppercase letters', () => {
      const input = 'helloworld'
      const output = hyphenize(input)
      expect(output).toEqual('helloworld')
    })
  })

  describe('getNumber', () => {
    it('should return the number from a string containing a number', () => {
      const input = 'abc123def'
      const output = getNumber(input)
      expect(output).toEqual(123)
    })
    it('should return 0 if the string does not contain a number', () => {
      const input = 'abcdef'
      const output = getNumber(input)
      expect(output).toEqual(0)
    })
    it('should return the number if the input is already a number', () => {
      const input = 456
      const output = getNumber(input)
      expect(output).toEqual(456)
    })
  })
})
