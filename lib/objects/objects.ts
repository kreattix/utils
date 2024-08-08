export const objectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

export const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[]
}

export const objectValues = <T extends object>(obj: T) => {
  return Object.values(obj) as T[keyof T][]
}
