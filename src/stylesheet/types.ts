import { CSSProperties } from 'react'

export type ICSSVariables = Record<string, string | number | null>
export type ICSSProperties = Partial<Record<keyof CSSProperties, string | number | null>> &
  ICSSVariables
export type IComponentStyles = Record<string, ICSSProperties>
