import { addPrefix, joinClass, mapClass } from '../classes'

describe('check class functions', () => {
  describe('check joinClass function', () => {
    it('should return classes saparated by space', () => {
      expect(joinClass(['class1', 'class2'])).toBe('class1 class2')
    })
    it('should return empty class', () => {
      expect(joinClass()).toBe('')
    })
  })

  describe('check addPrefix function', () => {
    it('should return prefixed class', () => {
      expect(addPrefix('prefix', 'class1')).toBe('prefix-class1')
      expect(addPrefix('prefix', ['class1', 'class2'])).toBe('prefix-class1 prefix-class2')
    })
    it('should return empty class', () => {
      expect(addPrefix('prefix')).toBe('')
    })
  })

  describe('check mapClass function', () => {
    it('should return filtered prefixed class', () => {
      const classlist = { class1: true, class2: false }
      expect(mapClass('prefix', classlist)).toBe('prefix-class1')
      expect(mapClass('prefix', classlist, 'staicClass')).toBe('prefix-class1 staicClass')
    })
    it('should return filtered but without prefixed class', () => {
      const classlist = { class1: true, class2: false }
      expect(mapClass(null, classlist)).toBe('class1')
      expect(mapClass(null, classlist, 'staicClass')).toBe('class1 staicClass')
    })
    it('should return prefixed class', () => {
      expect(mapClass('prefix', 'class1')).toBe('prefix-class1')
      expect(mapClass('prefix', 'class1', 'staicClass')).toBe('prefix-class1 staicClass')
    })
    it('should return without prefixed class', () => {
      expect(mapClass(null, 'class1')).toBe('class1')
      expect(mapClass(null, 'class1', 'staicClass')).toBe('class1 staicClass')
    })
  })
})
