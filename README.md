# @kreattix/utils

A collection of utility functions for various common tasks.

## Installation

```sh
npm install @kreattix/utils
```

## Usage

### Classnames Utilities

#### `classnames`

Combines multiple class names into a single string.

```typescript
import { classnames } from '@kreattix/utils'

const result = classnames(
  'btn',
  'btn-primary',
  ['btn-large', 'btn-disabled']
)
console.log(result) // 'btn btn-primary btn-large btn-disabled'

const isActive = true
const isDisabled = false
const result = conditionalClassNames({
  btn: true,
  'btn-active': isActive,
  'btn-disabled': isDisabled
})
console.log(result) // 'btn btn-active'
```

### Sizes Utilities

#### `createSizes`

Generates size variations (small, medium, large) based on a given size.

```typescript
import { createSizes } from '@kreattix/utils'

const sizes = createSizes([20, 10])
const result = sizes()
console.log(result) // { large: '22px 12px', medium: '20px 10px', small: '18px 8px' }
```

### Stylesheet Utilities

#### `StyleSheet.createStyle`

Creates a style object with hyphenated properties and appended units.

```typescript
import { StyleSheet } from '@kreattix/utils'

styleSheet = StyleSheet('prefix')
const styles = {
  fontSize: '16px',
  color: 'red'
}
const generatedStyles = styleSheet.createStyle(styles)
console.log(generatedStyles)
// { 'font-size': '16px', 'line-height': '20px', color: 'red' }
```

#### `StyleSheet.getVariabledStyle`

Generates a style object with CSS variables.

```typescript
import { StyleSheet } from '@kreattix/utils'

styleSheet = StyleSheet('prefix')
const styles = {
  fontSize: '16px',
  color: 'red'
}
const generatedStyles = styleSheet.getVariabledStyle(styles, 'component')
console.log(generatedStyles)
// { 'font-size': 'var(--prefix-component-font-size, 16px)', color: 'var(--prefix-component-color, red)' }
```

#### `StyleSheet.createVariables`

Creates CSS variables for the given styles.

```typescript
import { StyleSheet } from '@kreattix/utils'

styleSheet = StyleSheet('prefix')
const vars = {
  fontSize: '16px',
  color: 'red'
}
const generatedVariables = styleSheet.createVariables(vars, 'component')
console.log(generatedVariables)
// { '--prefix-component-font-size': '16px', '--prefix-component-color': 'red', '--prefix-component-font-size-large': '18px', '--prefix-component-font-size-small': '14px', '--prefix-component-line-height': '20px', '--prefix-component-line-height-large': '22px', '--prefix-component-line-height-small': '18px' }
```

#### `StyleSheet.createCSSObject`

Creates a CSS object for a given selector and styles.

```typescript
import { StyleSheet } from '@kreattix/utils'

styleSheet = StyleSheet('prefix')
const styles = {
  fontSize: '16px',
  color: 'red'
}
const generatedStyles = styleSheet.createCSSObject(styles, '.selector', 'component')
console.log(generatedStyles)
// { '.selector': { 'font-size': 'var(--prefix-component-font-size, 16px)', color: 'var(--prefix-component-color, red)', 'line-height': 'var(--prefix-component-line-height, 20px)' }, '.selector.size-small': { 'font-size': 'var(--prefix-component-font-size-small, 14px)', 'line-height': 'var(--prefix-component-line-height-small, 18px)' }, '.selector.size-large': { 'font-size': 'var(--prefix-component-font-size-large, 18px)', 'line-height': 'var(--prefix-component-line-height-large, 22px)' } }
```

#### `StyleSheet.createCSS`

Generates a CSS string for a given selector and styles.

```typescript
import { StyleSheet } from '@kreattix/utils'

styleSheet = StyleSheet('prefix')
const styles = {
  fontSize: '16px',
  color: 'red'
}
const css = styleSheet.createCSS(styles, '.selector', 'component')
console.log(css)
// .selector {\nfont-size: var(--prefix-component-font-size, 16px);\ncolor: var(--prefix-component-color, red);\nline-height: var(--prefix-component-line-height, 20px);\n}\n.selector.size-small {\nfont-size: var(--prefix-component-font-size-small, 14px);\nline-height: var(--prefix-component-line-height-small, 18px);\n}\n.selector.size-large {\nfont-size: var(--prefix-component-font-size-large, 18px);\nline-height: var(--prefix-component-line-height-large, 22px);\n}\n
```

#### `StyleSheet.setStyles`

Sets styles on a given HTML element.

```typescript
import { StyleSheet } from '@kreattix/utils'

styleSheet = StyleSheet('prefix')
const element = document.createElement('div')
const styles = {
  color: 'red',
  fontSize: 16,
  fontWeight: 'bold'
}
StyleSheet.setStyles(element, styleSheet.createStyle(styles))
console.log(element.style.getPropertyValue('color')) // 'red'
console.log(element.style.getPropertyValue('font-size')) // '16px'
console.log(element.style.getPropertyValue('font-weight')) // 'bold'
```

### Object Utilities

#### `objectKeys`

Returns an array of the keys of an object.

```typescript
import { objectKeys } from '@kreattix/utils'

const obj = { name: 'John', age: 28 }
const keys = objectKeys(obj)
console.log(keys) // ['name', 'age']
```

#### `objectValues`

Returns an array of the values of an object.

```typescript
import { objectValues } from '@kreattix/utils'

const obj = { name: 'John', age: 28 }
const values = objectValues(obj)
console.log(values) // ['John', 28]
```

#### `objectEntries`

Returns an array of the key-value pairs of an object.

```typescript
import { objectEntries } from '@kreattix/utils'

const obj = { name: 'John', age: 28 }
const entries = objectEntries(obj)
console.log(entries) // [['name', 'John'], ['age', 28]]
```

### String Utilities

#### `toNumber`

Converts a string containing numbers into an array of numbers.

```typescript
import { toNumber } from '@kreattix/utils'

const text = '10px 20px'
const result = toNumber(text)
console.log(result) // [10, 20]
```

#### `hyphenize`

Converts a camelCase or PascalCase string to a hyphenated string.

```typescript
import { hyphenize } from '@kreattix/utils'

const text = 'camelCaseString'
const result = hyphenize(text)
console.log(result) // 'camel-case-string'
```
