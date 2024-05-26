import { StyleSheet } from './index'

describe('StyleSheetClass', () => {
  describe('varName', () => {
    it('should return the variable name with prefix', () => {
      const styleSheet = StyleSheet('prefix')
      const varName = styleSheet.varName('color', 'primary')
      expect(varName).toEqual('--prefix-color-primary')
    })

    it('should return the variable name without prefix', () => {
      const styleSheet = StyleSheet()
      const varName = styleSheet.varName('color', 'primary')
      expect(varName).toEqual('--color-primary')
    })
  })

  describe('createVariables', () => {
    it('should create variables with sized properties', () => {
      const styleSheet = StyleSheet()
      const vars = {
        borderRadius: 10,
        lineHeight: 20,
        fontSize: 16,
        padding: 5,
        margin: 10,
      }
      const result = styleSheet.createVariables(vars)
      expect(result).toEqual({
        '--border-radius-small': '8px',
        '--border-radius': '10px',
        '--border-radius-large': '12px',
        '--line-height-small': '18px',
        '--line-height': '20px',
        '--line-height-large': '22px',
        '--font-size-small': '14px',
        '--font-size': '16px',
        '--font-size-large': '18px',
        '--padding-small': '3px',
        '--padding': '5px',
        '--padding-large': '7px',
        '--margin-small': '8px',
        '--margin': '10px',
        '--margin-large': '12px',
      })
    })

    it('should create variables without sized properties', () => {
      const styleSheet = StyleSheet()
      const vars = {
        color: 'red',
        backgroundColor: 'blue',
      }
      const result = styleSheet.createVariables(vars)
      expect(result).toEqual({
        '--color': 'red',
        '--background-color': 'blue',
      })
    })

    it('should create variables with fontSize and lineHeight', () => {
      const styleSheet = StyleSheet()
      const vars = {
        fontSize: 16,
        letterSpacing: 1.5,
      }
      const result = styleSheet.createVariables(vars)
      expect(result).toEqual({
        '--font-size-small': '14px',
        '--font-size': '16px',
        '--font-size-large': '18px',
        '--line-height-small': '18px',
        '--line-height': '20px',
        '--line-height-large': '22px',
        '--letter-spacing': 1.5,
      })
    })
  })
})
