import { objectEntries, objectKeys, objectValues } from './objects'

describe('Object utils', () => {
  describe('objectKeys', () => {
    it('should return an array of object keys', () => {
      const obj = { name: 'John', age: 28 }
      const keys = objectKeys(obj)
      expect(keys).toEqual(['name', 'age'])
    })
    it('should return an empty array if the object is empty', () => {
      const obj = {}
      const keys = objectKeys(obj)
      expect(keys).toEqual([])
    })
  })
  describe('objectValues', () => {
    it('should return an array of object values', () => {
      const obj = { name: 'John', age: 28 }
      const values = objectValues(obj)
      expect(values).toEqual(['John', 28])
    })
    it('should return an empty array if the object is empty', () => {
      const obj = {}
      const values = objectValues(obj)
      expect(values).toEqual([])
    })
  })
  describe('objectEntries', () => {
    it('should return an array of object entries', () => {
      const obj = { name: 'John', age: 28 }
      const entries = objectEntries(obj)
      expect(entries).toEqual([
        ['name', 'John'],
        ['age', 28]
      ])
    })
    it('should return an empty array if the object is empty', () => {
      const obj = {}
      const entries = objectEntries(obj)
      expect(entries).toEqual([])
    })
  })
})
