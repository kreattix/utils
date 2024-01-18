import { addPrefix, classnames, joinClass, mapClass, prefixClassnames } from '../classes'

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

describe('prefixClassnames', () => {
  test('should prefix a single string argument', () => {
    expect(prefixClassnames('prefix', 'classname')).toBe('prefix-classname')
  })

  test('should not concatenate booleon arguments', () => {
    expect(prefixClassnames('prefix', true, false)).toBe('')
  })

  test('should prefix multiple string arguments', () => {
    expect(prefixClassnames('prefix', 'class1', 'class2')).toBe('prefix-class1 prefix-class2')
  })

  test('should ignore falsy arguments', () => {
    expect(prefixClassnames('prefix', 'class1', null, 'class2', undefined)).toBe(
      'prefix-class1 prefix-class2',
    )
  })

  test('should recursively prefix nested arrays', () => {
    expect(prefixClassnames('prefix', ['class1', ['class2', 'class3']])).toBe(
      'prefix-class1 prefix-class2 prefix-class3',
    )
  })

  test('should prefix object keys with truthy values', () => {
    expect(prefixClassnames('prefix', { class1: true, class2: false, class3: true })).toBe(
      'prefix-class1 prefix-class3',
    )
  })
})

describe('classnames', () => {
  test('should concatenate string arguments', () => {
    expect(classnames('class1', 'class2')).toBe('class1 class2')
  })

  test('should not concatenate booleon arguments', () => {
    expect(classnames(true, false)).toBe('')
  })

  test('should ignore falsy arguments', () => {
    expect(classnames('class1', null, 'class2', undefined)).toBe('class1 class2')
  })

  test('should recursively concatenate nested arrays', () => {
    expect(classnames(['class1', ['class2', 'class3']])).toBe('class1 class2 class3')
  })

  test('should concatenate object keys with truthy values', () => {
    expect(classnames({ class1: true, class2: false, class3: true })).toBe('class1 class3')
  })
})
