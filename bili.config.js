const pkg = require('./package')
const typescript = require('rollup-plugin-typescript2')

const banner = `/*!
 * parse-sass-value v${pkg.version}
 * © 2017-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com>
 * Released under the MIT License.
 */
`

module.exports = {
  banner,
  input: 'src/index.ts',
  formats: [ 'cjs', 'es' ],
  plugins: [
    typescript(),
  ],
  external: Object.keys(pkg.dependencies)
}
