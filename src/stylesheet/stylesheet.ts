import { objectEntries } from '../objects'
import { createSizes } from '../sizes'
import { getNumber, hyphenize, isEmpty } from '../strings'
import { ICSSProperties, IComponentStyles } from './types'

const diffAmounts: Record<string, number> = {
  borderRadius: 10,
}

export class StyleSheetClass {
  prefix = ''
  componentName?: string | null = null
  isStyles = false
  sizedProperties = ['borderRadius', 'lineHeight', 'fontSize', 'padding', 'margin']

  constructor(prefix?: string) {
    this.setPrefix(prefix)
  }

  setPrefix(prefix?: string): void {
    if (prefix) {
      this.prefix = prefix
    }
  }

  varName(...args: string[]): string {
    if (this.componentName) {
      args.unshift(this.componentName)
    }
    if (this.prefix && !this.isStyles) {
      args.unshift(this.prefix)
    }
    const varname = hyphenize(args.join('-'))
    return this.isStyles ? varname : `--${varname}`
  }

  createVarValue(varName: string, value?: string | number | null): string {
    if (!value) return `var(${varName})`
    return `var(${varName}, ${value})`
  }

  createVariables(vars: ICSSProperties, componentName?: string): ICSSProperties {
    this.componentName = componentName
    const result: ICSSProperties = {}
    if (vars.fontSize !== undefined && vars.fontSize !== null && !vars.lineHeight) {
      vars.lineHeight = createSizes(getNumber(vars.fontSize), false)(10).large
    }
    objectEntries(vars).forEach(([property, value]) => {
      if (this.sizedProperties.includes(property) && !isEmpty(value)) {
        const sizedValue = createSizes(getNumber(value))(diffAmounts[property])
        result[this.varName(property)] = sizedValue.medium
        if (!this.isStyles) {
          result[this.varName(property, 'small')] = sizedValue.small
          result[this.varName(property, 'large')] = sizedValue.large
        }
      } else if (!isEmpty(value)) {
        result[this.varName(property)] = value
      }
    })
    this.componentName = null
    return result
  }

  createStyles(vars: ICSSProperties): ICSSProperties {
    this.isStyles = true
    const styles = this.createVariables(vars)
    this.isStyles = false
    return styles
  }

  getStyledObject(tagName: string, componentName: string, vars: ICSSProperties): IComponentStyles {
    const styles: IComponentStyles = { [tagName]: {} }
    if (vars.fontSize !== undefined && vars.fontSize !== null && !vars.lineHeight) {
      vars.lineHeight = createSizes(getNumber(vars.fontSize), false)(10).large
    }
    objectEntries(vars).forEach(([property, value]) => {
      if (this.sizedProperties.includes(property) && !isEmpty(value)) {
        const sizedValue = createSizes(getNumber(value))(diffAmounts[property])
        if (!styles[`${tagName}.size-small`]) styles[`${tagName}.size-small`] = {}
        if (!styles[`${tagName}.size-large`]) styles[`${tagName}.size-large`] = {}

        styles[tagName][property] = this.createVarValue(
          this.varName(componentName, property),
          sizedValue.medium,
        )
        styles[`${tagName}.size-small`][property] = this.createVarValue(
          this.varName(componentName, property, 'small'),
          sizedValue.small,
        )
        styles[`${tagName}.size-large`][property] = this.createVarValue(
          this.varName(componentName, property, 'large'),
          sizedValue.large,
        )
      } else {
        styles[tagName][property] = styles[tagName][property] = this.createVarValue(
          this.varName(componentName, property),
          value,
        )
      }
    })
    return styles
  }

  getStyles(tagName: string, componentName: string, vars: ICSSProperties): string {
    const styledObject = this.getStyledObject(tagName, componentName, vars)

    let styles = ``
    objectEntries(styledObject).forEach(([selector, properties]) => {
      styles += `${String(selector)} {\n`
      objectEntries(properties).forEach(([property, value]) => {
        styles += `  ${hyphenize(property)}: ${value};\n`
      })
      styles += '}\n'
    })
    return styles
  }
}

export const StyleSheet = (prefix?: string) => new StyleSheetClass(prefix)
