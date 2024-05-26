import { objectEntries } from '../objects'
import { createSizes } from '../sizes'
import { hyphenize } from '../strings'
import { ICSSProperties, ICSSVariables } from './types'

class StyleSheetClass {
  prefix = ''
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
    if (this.prefix) {
      args.unshift(this.prefix)
    }
    return `--${hyphenize(args.join('-'))}`
  }

  public createVariables(vars: ICSSProperties): ICSSVariables {
    const result: ICSSVariables = {}
    if (vars.fontSize && !vars.lineHeight) {
      vars.lineHeight = createSizes(Number(vars.fontSize), false)('fontSize', 10).large
    }
    objectEntries(vars).forEach(([property, value]) => {
      if (this.sizedProperties.includes(property)) {
        const sizedValue = createSizes(Number(value))(property)
        result[this.varName(property, 'small')] = sizedValue.small
        result[this.varName(property)] = sizedValue.medium
        result[this.varName(property, 'large')] = sizedValue.large
      } else {
        result[this.varName(property)] = value
      }
    })
    return result
  }
}

export const StyleSheet = (prefix?: string) => new StyleSheetClass(prefix)
