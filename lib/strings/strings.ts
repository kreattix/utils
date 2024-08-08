export function hyphenize(text: string): string {
  return text.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function toNumber(text?: string | number | null): number[] {
  if (text === null || text === undefined) return []
  return (text.toString().match(/-?\d+(?:\s+\d+)?/g) || []).map(Number)
}

export function saparateValueAndUnit(
  value: string | number | null
): [number | number[], string | string[]] {
  if (value === null) return [0, '']
  if (typeof value === 'number') return [value, '']

  const values = value.split(' ')
  const numbers: number[] = []
  const units: string[] = []

  for (const val of values) {
    const match = val.match(/^(-?\d*\.?\d+)([a-zA-Z]*)$/)
    if (match) {
      numbers.push(Number(match[1]))
      units.push(match[2] || '')
    } else {
      numbers.push(0)
      units.push('')
    }
  }

  return [numbers.length === 1 ? numbers[0] : numbers, units.length === 1 ? units[0] : units]
}

export function isEmpty<T>(value: T): boolean {
  return value === null || value === undefined || value === ''
}
