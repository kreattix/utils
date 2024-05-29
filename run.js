import { StyleSheet } from './dist/index.es.js'

const defaultRootStyles = {
  fontSize: '16px',
  color: 'red',
}

const styleSheet = StyleSheet('prefix')

console.clear()
console.log('================> Start <================\n')
// console.log(styleSheet.prefix)
// console.log(styleSheet.getVariableName('color', '', 'primary'))
// console.log(styleSheet.getVariable(styleSheet.getVariableName('color', '', 'primary'), 0))
// console.log(styleSheet.getStyle(defaultRootStyles))
// console.log(styleSheet.getVariabledStyle(defaultRootStyles, 'display'))
// console.log(styleSheet.createVariables(defaultRootStyles))
// console.log(styleSheet.createVariables(defaultRootStyles, 'display'))
console.log(styleSheet.getCSS(defaultRootStyles, '.selector', 'component'))
console.log('\n=================> End <=================')
