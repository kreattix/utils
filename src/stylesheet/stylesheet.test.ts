import { StyleSheet, StyleSheetClass } from './stylesheet'

describe('StyleSheetClass', () => {
  let styleSheet: StyleSheetClass

  beforeEach(() => {
    styleSheet = StyleSheet()
  })

  describe('varName', () => {
    it('should return the variable name with prefix', () => {
      const varName = styleSheet.varName('color')
      expect(varName).toEqual('--color')
    })

    it('should return the variable name without prefix if isStyles is true', () => {
      styleSheet.isStyles = true
      const varName = styleSheet.varName('color')
      expect(varName).toEqual('color')
    })

    it('should return the variable name with prefix and hyphenized arguments', () => {
      styleSheet = StyleSheet('app')
      const varName = styleSheet.varName('background', 'color')
      expect(varName).toEqual('--app-background-color')
    })
  })

  describe('createVariables', () => {
    it('should create CSS variables from the given properties', () => {
      const vars = {
        fontSize: '16px',
        lineHeight: '24px',
        borderRadius: '4px',
        padding: '8px',
        margin: '16px',
        color: '#000',
      }
      const result = styleSheet.createVariables(vars)
      expect(result).toEqual({
        '--border-radius': '4px',
        '--border-radius-large': '6px',
        '--border-radius-small': '2px',
        '--color': '#000',
        '--font-size': '16px',
        '--font-size-large': '18px',
        '--font-size-small': '14px',
        '--line-height': '24px',
        '--line-height-large': '28px',
        '--line-height-small': '20px',
        '--margin': '16px',
        '--margin-large': '18px',
        '--margin-small': '14px',
        '--padding': '8px',
        '--padding-large': '10px',
        '--padding-small': '6px',
      })
    })

    it('should create sized CSS variables from the given properties', () => {
      const vars = {
        fontSize: '16px',
        padding: '8px',
        margin: '16px',
      }
      const result = styleSheet.createVariables(vars)
      expect(result).toEqual({
        '--font-size': '16px',
        '--font-size-large': '18px',
        '--font-size-small': '14px',
        '--line-height': '20px',
        '--line-height-large': '22px',
        '--line-height-small': '18px',
        '--margin': '16px',
        '--margin-large': '18px',
        '--margin-small': '14px',
        '--padding': '8px',
        '--padding-large': '10px',
        '--padding-small': '6px',
      })
    })

    it('should create CSS variables with custom prefix', () => {
      styleSheet.prefix = 'app'
      const vars = {
        color: '#000',
      }
      const result = styleSheet.createVariables(vars)
      expect(result).toEqual({
        '--app-color': '#000',
      })
    })
  })

  describe('createStyles', () => {
    it('should create CSS properties from the given variables', () => {
      const vars = {
        fontSize: '16px',
        lineHeight: '24px',
        borderRadius: '4px',
        padding: '8px',
        margin: '16px',
        color: '#000',
      }
      const result = styleSheet.createStyles(vars)
      expect(result).toEqual({
        'font-size': '16px',
        'line-height': '24px',
        'border-radius': '4px',
        padding: '8px',
        margin: '16px',
        color: '#000',
      })
    })
  })
})
