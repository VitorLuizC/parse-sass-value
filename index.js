const isColor = require('is-color')
const isLength = require('is-css-length')

/**
 * @typedef Options
 * @type {Object}
 * @property {('single'|'double')} quote
 * @property {('comma'|'space')} separator
 */

/**
 * Parse SASS string.
 * @param {string} text
 * @param {string} quote
 * @returns {string}
 */
function parseString (text, quote) {
  const QUOTE = quote === 'single' ? '\'' : '"'

  const textEscaped = text.replace(/'/g, '\\\'').replace(/"/g, '\\"')

  return `${QUOTE}${textEscaped}${QUOTE}`
}

/**
 * Parse to SASS value.
 * @param {any} value
 * @param {Options} [options]
 * @returns {string}
 */
function parse (value, { quote = 'single', separator = 'comma' } = {}) {
  const SEPARATOR = separator === 'comma' ? ', ' : ' '

  if (typeof value === 'string') {
    if (isColor(value) || isLength(value)) {
      return value
    }

    return parseString(value, quote)
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString()
  }

  if (typeof value === 'object') {
    if (value === null) {
      return 'null'
    }

    if (value instanceof Array || value instanceof Set) {
      const list = Array.from(value, value => parse(value, { quote, separator }))
      return `(${list.join(SEPARATOR)})`
    }

    if (value instanceof Object) {
      const createPair = key => {
        const val = value[key]
        const options = { quote, separator }
        const pair = `${parseString(key, quote)}: ${parse(val, options)}`
        return pair
      }

      const map = Object.keys(value).map(createPair).join(SEPARATOR)

      return `(${map})`
    }
  }

  throw new Error(`Can't parse "${typeof value}" values.`)
}

module.exports = parse
