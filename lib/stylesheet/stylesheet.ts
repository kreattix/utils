import { objectEntries } from '../objects/objects'
import { createSizes } from '../sizes/sizes'
import { hyphenize, isEmpty, saparateValueAndUnit } from '../strings'
import { ICSSProperties, ICSSValue, IComponentStyles } from './types'

const diffAmounts: Record<string, number> = {
  borderRadius: 10
}

export class StyleSheetClass {
  prefix = ''

  componentName?: string | null = null
  isStyles = false
  sizedProperties = new Set(['borderRadius', 'lineHeight', 'fontSize', 'padding', 'margin'])

  constructor(prefix?: string) {
    this.setPrefix(prefix)
  }
  setPrefix(prefix = ''): void {
    this.prefix = prefix
  }
  appendDependency(styles: ICSSProperties) {
    if (styles?.fontSize !== undefined && styles?.fontSize !== null && !styles?.lineHeight) {
      styles.lineHeight = createSizes(...saparateValueAndUnit(styles.fontSize))(10).large
    }
  }
  appendUnit<T>(property: string, value: T): T | string {
    if (!isNaN(Number(value)) && this.sizedProperties.has(property)) {
      return `${value}px`
    }
    return value
  }
  getVariableName(...args: (string | undefined)[]): string {
    args.unshift(this.prefix)
    const varname = args.filter((arg) => !isEmpty(arg)).join('-')
    return `--${hyphenize(varname)}`
  }
  getVariable(varName: string, defaultValue?: ICSSValue): string {
    if (isEmpty(defaultValue)) return `var(${varName})`
    return `var(${varName}, ${defaultValue})`
  }
  getValue(property: string, value: ICSSValue, componentName?: string): ICSSValue {
    return componentName === undefined
      ? value
      : this.getVariable(
          this.getVariableName(componentName, property),
          this.appendUnit(property, value)
        )
  }
  createStyle(styles: ICSSProperties) {
    const generatedStyles: ICSSProperties = {}
    this.appendDependency(styles)
    objectEntries(styles).forEach(([property, value]) => {
      if (isEmpty(value)) return
      generatedStyles[hyphenize(property)] = this.appendUnit(property, value)
    })
    return generatedStyles
  }
  getVariabledStyle(styles: ICSSProperties, componentName?: string) {
    const generatedStyles: ICSSProperties = {}
    objectEntries(styles).forEach(([property, value]) => {
      generatedStyles[hyphenize(property)] = this.getVariable(
        this.getVariableName(componentName, property),
        this.appendUnit(property, value)
      )
    })
    return generatedStyles
  }
  createVariables(vars: ICSSProperties, componentName?: string): ICSSProperties {
    this.componentName = componentName
    const result: ICSSProperties = {}
    this.appendDependency(vars)
    objectEntries(vars).forEach(([property, value]) => {
      const varName = this.getVariableName(componentName, property)
      if (this.sizedProperties.has(property) && !isEmpty(value)) {
        const sizedValue = createSizes(...saparateValueAndUnit(value))(diffAmounts[property])
        result[varName] = sizedValue.medium
        if (!this.isStyles) {
          result[`${varName}-small`] = sizedValue.small
          result[`${varName}-large`] = sizedValue.large
        }
      } else if (!isEmpty(value)) {
        result[varName] = String(value)
      }
    })
    this.componentName = null
    return result
  }
  createCSSObject(
    styles: ICSSProperties,
    selector: string,
    componentName?: string
  ): IComponentStyles {
    const generatedStyles: IComponentStyles = { [selector]: {} }
    this.appendDependency(styles)
    objectEntries(styles).forEach(([property, value]) => {
      const hyphenizedProperty = hyphenize(property)

      if (this.sizedProperties.has(property) && !isEmpty(value)) {
        const sizedValue = createSizes(...saparateValueAndUnit(value))(diffAmounts[property])
        if (!generatedStyles[`${selector}.size-small`]) {
          generatedStyles[`${selector}.size-small`] = {}
        }
        if (!generatedStyles[`${selector}.size-large`]) {
          generatedStyles[`${selector}.size-large`] = {}
        }
        generatedStyles[selector][hyphenizedProperty] = this.getValue(
          property,
          sizedValue.medium,
          componentName
        )
        generatedStyles[`${selector}.size-small`][hyphenizedProperty] = this.getValue(
          `${property}-small`,
          sizedValue.small,
          componentName
        )
        generatedStyles[`${selector}.size-large`][hyphenizedProperty] = this.getValue(
          `${property}-large`,
          sizedValue.large,
          componentName
        )
      } else {
        generatedStyles[selector][hyphenizedProperty] = this.getValue(
          property,
          value,
          componentName
        )
      }
    })
    return generatedStyles
  }
  createCSS(styles: ICSSProperties, selector: string, componentName?: string) {
    const generatedStyles = this.createCSSObject(styles, selector, componentName)
    let css = ''
    objectEntries(generatedStyles).forEach(([selector, styles]) => {
      css += `${selector} {\n`
      objectEntries(styles).forEach(([property, value]) => {
        css += `${property}: ${value};\n`
      })
      css += '}\n'
    })
    return css
  }
  setStyles(element: HTMLElement, styles: ICSSProperties) {
    if (element && styles) {
      objectEntries(styles).forEach(([property, value]) => {
        element.style.setProperty(property, String(value))
      })
    }
  }
}

export const StyleSheet = (prefix?: string) => new StyleSheetClass(prefix)
