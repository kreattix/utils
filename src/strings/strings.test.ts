import { hyphenize } from './strings'

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
})
