import { AddPrefixType, JoinClassType, MapClassType } from './types'

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
