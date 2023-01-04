export type JoinClassType = (classlist?: string[]) => string

export type AddPrefixType = (prefix: string, classlist?: string | string[]) => string

export type MapClassType = (
  prefix: string | null,
  classlist: string | { [key: string]: boolean },
  staticClass?: string,
) => string
