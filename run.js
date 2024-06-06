import { StyleSheet } from './dist/index.es.js'

const defaultRootStyles = {
  fontSize: '22px',
  color: 'red',
  padding: '10px 30px',
}

const styleSheet = StyleSheet('prefix')

console.clear()
console.log('================> Start <================\n')
console.log(styleSheet.createCSSObject(defaultRootStyles, 'h1', 'display'))
console.log(styleSheet.createVariables(defaultRootStyles, 'display'))
console.log('\n=================> End <=================')
