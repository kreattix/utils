import { StyleSheet } from './dist/index.es.js'

const styleSheet = StyleSheet('kd')

const styles = styleSheet.createStyles({
  letterSpacing: 1.5,
  borderRadius: 6,
  fontSize: null,
  color: 'red',
  backgroundColor: null,
})

const variables = styleSheet.createVariables(
  {
    letterSpacing: 1.5,
    borderRadius: 6,
    fontSize: null,
    color: 'red',
    backgroundColor: null,
  },
  'display',
)

const componentStyles = styleSheet.getStyles('h1', 'display', {
  letterSpacing: 1.5,
  borderRadius: 6,
  fontSize: 24,
  color: 'red',
  backgroundColor: null,
})

console.log(styles)
console.log(variables)
console.log(componentStyles)
