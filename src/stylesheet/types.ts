import { CSSProperties } from 'react'

export type ICSSVariables = Record<string, string | number>
export type ICSSProperties = CSSProperties & ICSSVariables
