## Kreattix Design Utils

Basic Utility functions for Kreattix Design. As kreattix design don't have their own utilities, we are here to help you. You easily can use this library with kreattix design. It is also usable with vanilla javascript or any javascript framework.

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![npm version](https://img.shields.io/npm/v/@kreattix/utils)

## Installation

### using npm

```sh
$ npm install @kreattix/utils
```

### using yarn

```sh
$ yarn add @kreattix/utils
```

## Class Utilities Documentation

### `classnames` Function

The `classnames` function is a utility designed to conditionally join class names together. It is flexible and accepts multiple types of arguments, including strings, numbers, arrays, and objects. This function is particularly useful in front-end development, where it can dynamically generate a class name string based on certain conditions.

#### Usage

The function can be called with various types of arguments:

1. **Strings and Numbers**: Directly passed as class names.

2. **Arrays**: Recursively processed, allowing nested conditions.

3. **Objects**: Keys are used as class names if their corresponding values evaluate to `true`.

#### Examples

```

import { classnames } from '@kreattix/utils';

const className = classnames('btn', 'btn-primary');
// Output: 'btn btn-primary'


const className = classnames({
'btn': true,
'btn-primary': true,
'hidden': false,
});
// Output: 'btn btn-primary'


const isActive = true;
const className = classnames('btn', { 'btn-primary': isActive, 'hidden': !isActive }, ['additional-class']);
// Output: 'btn btn-primary additional-class'

```

## Object Utilities Documentation

This documentation provides details on utility functions designed for object manipulation within TypeScript. These utilities ensure type safety when working with the keys, values, and entries of objects.

### `objectEntries`

Returns the entries (key-value pairs) of the provided object with type safety.

```

import { objectEntries } from '@kreattix/utils';

const user: User = { id: 1, name: 'John Doe' };
const entries = objectEntries(user);
// entries is of type [keyof User, User[keyof User]][], which is [['id', number], ['name', string]]

```

### `objectKeys`

Returns the keys of the provided object with type safety.

```

import { objectKeys } from '@kreattix/utils';

const user: User = { id: 1, name: 'John Doe' };
const keys = objectKeys(user);
// keys is of type (keyof User)[], which is ['id', 'name']

```

### `objectValues`

Returns the values of the provided object with type safety.

## Available Functions

| Function Name | Type                                             | Default |
| ------------- | ------------------------------------------------ | ------- |
| classnames    | `string , { [key: string]: boolean } , string[]` | --      |
| objectEntries | `object`                                         | --      |
| objectKeys    | `object`                                         | --      |
| objectValues  | `object`                                         | --      |

## License

MIT
