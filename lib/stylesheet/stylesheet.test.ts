import { StyleSheet, StyleSheetClass } from './stylesheet'
import { ICSSProperties } from './types'

describe('StyleSheetClass', () => {
  let styleSheet: StyleSheetClass

  beforeEach(() => {
    styleSheet = StyleSheet('prefix')
  })

  it('should set prefix correctly', () => {
    styleSheet.setPrefix()
    expect(styleSheet.prefix).toBe('')
  })

  it('should append dependency correctly', () => {
    const styles: ICSSProperties = {
      fontSize: '16px'
    }
    styleSheet.appendDependency(styles)
    expect(styles.lineHeight).toBe('20px')
  })

  it('should append unit correctly', () => {
    expect(styleSheet.appendUnit('fontSize', 16)).toBe('16px')
    expect(styleSheet.appendUnit('color', 'red')).toBe('red')
  })

  it('should get variable name correctly', () => {
    expect(styleSheet.getVariableName('component', 'property')).toBe('--prefix-component-property')
  })

  it('should get variable correctly', () => {
    expect(styleSheet.getVariable('varName')).toBe('var(varName)')
    expect(styleSheet.getVariable('varName', 'defaultValue')).toBe('var(varName, defaultValue)')
  })

  it('should get style correctly', () => {
    const styles: ICSSProperties = {
      fontSize: '16px',
      color: 'red',
      margin: null
    }
    const generatedStyles = styleSheet.createStyle(styles)
    expect(generatedStyles).toEqual({
      'font-size': '16px',
      'line-height': '20px',
      color: 'red'
    })
  })

  it('should get variabled style correctly', () => {
    const styles: ICSSProperties = {
      fontSize: '16px',
      color: 'red'
    }
    const generatedStyles = styleSheet.getVariabledStyle(styles, 'component')
    expect(generatedStyles).toEqual({
      color: 'var(--prefix-component-color, red)',
      'font-size': 'var(--prefix-component-font-size, 16px)'
    })
  })

  it('should create variables correctly', () => {
    const vars: ICSSProperties = {
      fontSize: '16px',
      color: 'red'
    }
    const generatedVariables = styleSheet.createVariables(vars, 'component')
    expect(generatedVariables).toEqual({
      '--prefix-component-color': 'red',
      '--prefix-component-font-size': '16px',
      '--prefix-component-font-size-large': '18px',
      '--prefix-component-font-size-small': '14px',
      '--prefix-component-line-height': '20px',
      '--prefix-component-line-height-large': '22px',
      '--prefix-component-line-height-small': '18px'
    })
  })

  it('should get value correctly', () => {
    expect(styleSheet.getValue('property', 'value', 'component')).toBe(
      'var(--prefix-component-property, value)'
    )
    expect(styleSheet.getValue('property', 16)).toBe(16)
  })

  it('should get CSS properties correctly', () => {
    const styles: ICSSProperties = {
      fontSize: '16px',
      color: 'red'
    }
    const generatedStyles = styleSheet.createCSSObject(styles, '.selector', 'component')
    expect(generatedStyles).toEqual({
      '.selector': {
        'font-size': 'var(--prefix-component-font-size, 16px)',
        color: 'var(--prefix-component-color, red)',
        'line-height': 'var(--prefix-component-line-height, 20px)'
      },
      '.selector.size-small': {
        'font-size': 'var(--prefix-component-font-size-small, 14px)',
        'line-height': 'var(--prefix-component-line-height-small, 18px)'
      },
      '.selector.size-large': {
        'font-size': 'var(--prefix-component-font-size-large, 18px)',
        'line-height': 'var(--prefix-component-line-height-large, 22px)'
      }
    })
  })

  it('should get CSS correctly', () => {
    const styles: ICSSProperties = {
      fontSize: '16px',
      color: 'red'
    }
    const css = styleSheet.createCSS(styles, '.selector', 'component')
    expect(css).toEqual(
      '.selector {\nfont-size: var(--prefix-component-font-size, 16px);\ncolor: var(--prefix-component-color, red);\nline-height: var(--prefix-component-line-height, 20px);\n}\n.selector.size-small {\nfont-size: var(--prefix-component-font-size-small, 14px);\nline-height: var(--prefix-component-line-height-small, 18px);\n}\n.selector.size-large {\nfont-size: var(--prefix-component-font-size-large, 18px);\nline-height: var(--prefix-component-line-height-large, 22px);\n}\n'
    )
  })

  it('should set styles on the element', () => {
    // Arrange
    const element = document.createElement('div')
    const styles = {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold'
    }
    styleSheet.setStyles(element, styleSheet.createStyle(styles))
    expect(element.style.getPropertyValue('color')).toBe('red')
    expect(element.style.getPropertyValue('font-size')).toBe('16px')
    expect(element.style.getPropertyValue('font-weight')).toBe('bold')
  })
})
