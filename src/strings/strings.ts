export function hyphenize(text: string): string {
  return text.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function toNumber(text?: string | number | null): number {
  return Number(text?.toString().match(/(-)?\d+/)?.[0] || '')
}

export function isEmpty<T>(value: T): boolean {
  return value === null || value === undefined || value === ''
}
