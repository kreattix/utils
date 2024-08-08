import { classnames } from './classnames'

describe('classnames', () => {
  test('should concatenate string arguments', () => {
    expect(classnames('class1', 'class2')).toBe('class1 class2')
  })
  test('should not concatenate booleon arguments', () => {
    expect(classnames('class1', true, false)).toBe('class1')
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
