import { StyleSheet } from './dist/index.es.js'

const styleSheet = StyleSheet('kd')

const variables = styleSheet.createVariables({
  letterSpacing: 1.5,
  borderRadius: 11,
})

console.log(variables)
