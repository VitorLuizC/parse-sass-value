const pkg = require('./package')
const typescript = require('rollup-plugin-typescript2')

module.exports = {
  input: 'src/index.ts',
  formats: [ 'cjs', 'es' ],
  plugins: [
    typescript(),
  ],
  external: Object.keys(pkg.dependencies)
}
