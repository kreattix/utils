import { StyleSheet } from './dist/index.es.js'

const defaultRootStyles = {
  fontSize: '16px',
  color: 'red',
}

const styleSheet = StyleSheet('prefix')

console.clear()
console.log('================> Start <================\n')
console.log(styleSheet.createStyle(defaultRootStyles, '.selector', 'component'))
console.log('\n=================> End <=================')
