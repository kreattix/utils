import { Classnames } from './types'

export function classnames(...args: Classnames.ArgumentArray): string {
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
