import { AddPrefixType, ClassNames, JoinClassType, MapClassType } from './types'

export const joinClass: JoinClassType = (classlist = []) => {
  return classlist.join(' ').trim()
}

export const addPrefix: AddPrefixType = (prefix, classlist = '') => {
  if (!classlist || (classlist && classlist.length <= 0)) return ''
  if (typeof classlist === 'string') {
    return [prefix, classlist].join('-')
  }
  return joinClass(classlist.map((singleClass) => [prefix, singleClass].join('-')))
}

export const mapClass: MapClassType = (prefix, classlist, staticClasses = '') => {
  const classnames: string[] = []

  if (typeof classlist === 'string') {
    classnames.push(classlist)
  } else {
    Object.keys(classlist).forEach((singleClass) => {
      if (classlist[singleClass]) classnames.push(singleClass)
    })
  }

  if (!prefix) {
    return joinClass([...classnames, staticClasses])
  } else {
    return joinClass([addPrefix(prefix, classnames), staticClasses])
  }
}

export function prefixClassnames(prefix: string, ...args: ClassNames.ArgumentArray): string {
  return args
    .flatMap((arg) => {
      if (!arg) return []

      const argType = typeof arg

      if (argType === 'string' || argType === 'number') {
        return [prefix, arg.toString()].join('-')
      } else if (Array.isArray(arg)) {
        return prefixClassnames(prefix, ...arg)
      } else if (argType === 'object') {
        return Object.entries(arg)
          .filter(([, isAllowed]) => isAllowed)
          .map(([classname]) => [prefix, classname].join('-'))
      }
      return []
    })
    .join(' ')
    .trim()
}

export function classnames(...args: ClassNames.ArgumentArray): string {
  return args
    .flatMap((arg) => {
      if (!arg) return []

      const argType = typeof arg

      if (argType === 'string' || argType === 'number') {
        return arg.toString()
      } else if (Array.isArray(arg)) {
        return classnames(...arg)
      } else if (argType === 'object') {
        return Object.entries(arg)
          .filter(([, isAllowed]) => isAllowed)
          .map(([classname]) => classname)
      }
      return []
    })
    .join(' ')
    .trim()
}
