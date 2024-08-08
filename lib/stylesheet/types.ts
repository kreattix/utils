import { CSSProperties } from 'react'

export type ICSSValue = string | number | null
export type ICSSVariables = Record<string, ICSSValue>
export type ICSSProperties = Partial<Record<keyof CSSProperties, ICSSValue>> & ICSSVariables
export type IComponentStyles = Record<string, ICSSProperties>
