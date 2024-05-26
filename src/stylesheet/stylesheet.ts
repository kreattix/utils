import { objectEntries } from '../objects'
import { createSizes } from '../sizes'
import { getNumber, hyphenize } from '../strings'
import { ICSSProperties, ICSSVariables } from './types'

export class StyleSheetClass {
  prefix = ''
  isStyles = false
  sizedProperties = ['borderRadius', 'lineHeight', 'fontSize', 'padding', 'margin']

  constructor(prefix?: string) {
    this._setPrefix(prefix)
  }

  private _setPrefix(prefix?: string): void {
    if (prefix) {
      this.prefix = prefix
    }
  }

  public varName(...args: string[]): string {
    if (this.prefix && !this.isStyles) {
      args.unshift(this.prefix)
    }
    const varname = hyphenize(args.join('-'))
    return this.isStyles ? varname : `--${varname}`
  }

  public createVariables(vars: ICSSProperties): ICSSVariables {
    const result: ICSSVariables = {}
    if (vars.fontSize && !vars.lineHeight) {
      vars.lineHeight = createSizes(getNumber(vars.fontSize), false)('fontSize', 10).large
    }
    objectEntries(vars).forEach(([property, value]) => {
      if (this.sizedProperties.includes(property)) {
        const sizedValue = createSizes(getNumber(value))(property)
        result[this.varName(property)] = sizedValue.medium
        if (!this.isStyles) {
          result[this.varName(property, 'small')] = sizedValue.small
          result[this.varName(property, 'large')] = sizedValue.large
        }
      } else {
        result[this.varName(property)] = value
      }
    })
    return result
  }

  public createStyles(vars: ICSSVariables): ICSSProperties {
    this.isStyles = true
    const styles = this.createVariables(vars)
    this.isStyles = false
    return styles
  }
}

export const StyleSheet = (prefix?: string) => new StyleSheetClass(prefix)
