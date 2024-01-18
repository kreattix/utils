export type JoinClassType = (classlist?: string[]) => string

export type AddPrefixType = (prefix: string, classlist?: string | string[]) => string

export type MapClassType = (
  prefix: string | null,
  classlist: string | { [key: string]: boolean },
  staticClass?: string,
) => string

export declare namespace ClassNames {
  type Value = string | number | boolean | undefined | null
  type Mapping = Record<string, unknown>
  type ArgumentArray = Array<Argument>
  type Argument = Value | Mapping | ArgumentArray
}
