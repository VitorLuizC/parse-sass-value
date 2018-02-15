const commonJS = require('rollup-plugin-commonjs')
const typescript = require('rollup-plugin-typescript')

const namedExports = {
  'is-color': [ 'default' ],
  'is-css-length': [ 'default' ]
}

module.exports = {
  input: 'src/index.ts',
  format: [ 'cjs', 'es' ],
  plugins: [
    commonJS({ namedExports }),
    typescript({
      typescript: require('typescript'),
      declaration: true
    })
  ],
  external: Object.keys(namedExports),
}
