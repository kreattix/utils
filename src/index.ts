import { classnames } from './classnames'
import { objectEntries, objectKeys, objectValues } from './objects'
import { hyphenize } from './strings'
import './types'

export * from './classnames'
export * from './objects'
export * from './strings'

const kreattixUtils = {
  hyphenize,
  objectEntries,
  objectKeys,
  objectValues,
  classnames,
}

export default kreattixUtils
