import { StyleSheet, StyleSheetClass } from './stylesheet'

describe('StyleSheetClass', () => {
  let styleSheet: StyleSheetClass

  beforeEach(() => {
    styleSheet = StyleSheet()
  })

  it('should set prefix when provided', () => {
    styleSheet.setPrefix('prefix-')
    expect(styleSheet.prefix).toBe('prefix-')
  })

  it('should not set prefix when not provided', () => {
    styleSheet.setPrefix()
    expect(styleSheet.prefix).toBe('')
  })

  it('should create variable name with prefix', () => {
    styleSheet.setPrefix('prefix-')
    const varName = styleSheet.varName('property')
    expect(varName).toBe('--prefix--property')
  })

  it('should create variable name without prefix', () => {
    const varName = styleSheet.varName('property')
    expect(varName).toBe('--property')
  })

  it('should create variable value with value', () => {
    const varValue = styleSheet.createVarValue('--property', 'value')
    expect(varValue).toBe('var(--property, value)')
  })

  it('should create variable value without value', () => {
    const varValue = styleSheet.createVarValue('--property', '')
    expect(varValue).toBe('var(--property)')
  })

  it('should create variables with sized properties', () => {
    const vars = {
      borderRadius: '10px',
      lineHeight: '20px',
      fontSize: '16px',
      padding: '10px',
      margin: '5px',
    }
    const result = styleSheet.createVariables(vars)
    expect(result).toEqual({
      '--border-radius': '10px',
      '--line-height': '20px',
      '--font-size': '16px',
      '--padding': '10px',
      '--margin': '5px',
      '--border-radius-small': '8px',
      '--border-radius-large': '12px',
      '--line-height-small': '18px',
      '--line-height-large': '22px',
      '--font-size-small': '14px',
      '--font-size-large': '18px',
      '--padding-small': '8px',
      '--padding-large': '12px',
      '--margin-small': '3px',
      '--margin-large': '7px',
    })
  })
  it('should create variables with nulled fontSize', () => {
    const vars = {
      borderRadius: '10px',
      fontSize: null,
      padding: '10px',
      margin: '5px',
    }
    const result = styleSheet.createVariables(vars)
    expect(result).toEqual({
      '--border-radius': '10px',
      '--padding': '10px',
      '--margin': '5px',
      '--border-radius-small': '8px',
      '--border-radius-large': '12px',
      '--padding-small': '8px',
      '--padding-large': '12px',
      '--margin-small': '3px',
      '--margin-large': '7px',
    })
  })

  it('should create variables without lineHeight properties', () => {
    const vars = {
      borderRadius: '10px',
      fontSize: '16px',
      padding: '10px',
      margin: '5px',
    }
    const result = styleSheet.createVariables(vars)
    expect(result).toEqual({
      '--border-radius': '10px',
      '--line-height': '20px',
      '--font-size': '16px',
      '--padding': '10px',
      '--margin': '5px',
      '--border-radius-small': '8px',
      '--border-radius-large': '12px',
      '--line-height-small': '18px',
      '--line-height-large': '22px',
      '--font-size-small': '14px',
      '--font-size-large': '18px',
      '--padding-small': '8px',
      '--padding-large': '12px',
      '--margin-small': '3px',
      '--margin-large': '7px',
    })
  })

  it('should create variables without sized properties', () => {
    const vars = {
      color: 'red',
      background: 'blue',
    }
    styleSheet = StyleSheet('prefix')
    const result = styleSheet.createVariables(vars, 'button')
    expect(result).toEqual({
      '--prefix-button-color': 'red',
      '--prefix-button-background': 'blue',
    })
  })

  it('should create styles with sized properties', () => {
    const vars = {
      borderRadius: '10px',
      fontSize: '16px',
      padding: '10px',
      margin: '5px',
      color: 'red',
    }
    const result = styleSheet.createStyles(vars)
    expect(result).toEqual({
      'border-radius': '10px',
      color: 'red',
      'font-size': '16px',
      'line-height': '20px',
      margin: '5px',
      padding: '10px',
    })
  })

  it('should create styles with nulled fontSize', () => {
    const vars = {
      borderRadius: '10px',
      fontSize: null,
      padding: '10px',
      margin: '5px',
      color: 'red',
    }
    const result = styleSheet.createStyles(vars)
    expect(result).toEqual({
      'border-radius': '10px',
      color: 'red',
      margin: '5px',
      padding: '10px',
    })
  })

  it('should create styles without sized properties', () => {
    const vars = {
      color: 'red',
      background: 'blue',
    }
    const result = styleSheet.createStyles(vars)
    expect(result).toEqual({ background: 'blue', color: 'red' })
  })

  it('should get styles', () => {
    const vars = {
      borderRadius: '10px',
      fontSize: '16px',
      padding: '10px',
      margin: '5px',
      color: 'red',
    }
    const result = styleSheet.getStyles('div', 'component', vars)
    expect(result).toBe(
      'div {' +
        '\n  border-radius: var(--component-border-radius, 10px);' +
        '\n  font-size: var(--component-font-size, 16px);' +
        '\n  padding: var(--component-padding, 10px);' +
        '\n  margin: var(--component-margin, 5px);' +
        '\n  color: var(--component-color, red);' +
        '\n  line-height: var(--component-line-height, 20px);' +
        '\n}\n' +
        'div.size-small {' +
        '\n  border-radius: var(--component-border-radius-small, 8px);' +
        '\n  font-size: var(--component-font-size-small, 14px);' +
        '\n  padding: var(--component-padding-small, 8px);' +
        '\n  margin: var(--component-margin-small, 3px);' +
        '\n  line-height: var(--component-line-height-small, 18px);' +
        '\n}\n' +
        'div.size-large {' +
        '\n  border-radius: var(--component-border-radius-large, 12px);' +
        '\n  font-size: var(--component-font-size-large, 18px);' +
        '\n  padding: var(--component-padding-large, 12px);' +
        '\n  margin: var(--component-margin-large, 7px);' +
        '\n  line-height: var(--component-line-height-large, 22px);' +
        '\n}\n',
    )
  })
})
