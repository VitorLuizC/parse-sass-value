const isColor = require('is-color');
const isLength = require('is-css-length');

/**
 * @typedef Options
 * @type {Object}
 * @property {('single'|'double')} quote
 * @property {('comma'|'space')} separator
 */

/**
 * Default parse options.
 * @type {Options}
 */
const defaultOptions = {
	quote: 'single',
	separator: 'comma'
};

/**
 * Parse to SASS value.
 * @param {any} value
 * @param {Options} [options]
 * @returns {string}
 */
function parse(value, options = {}) {
	options = (options instanceof Object) ? options : {};
	options = Object.assign({}, defaultOptions, options);

	const QUOTE = options.quote === 'single' ? '\'' : '\"';
	const SEPARATOR = options.separator === 'comma' ? ', ' : ' ';

	if (typeof value === 'function' || typeof value === 'undefined' || typeof value === 'symbol')
		throw new Error(`SASS doesn't support "${typeof value}" values.`);

	if (typeof value === 'string') {
		if (isColor(value) || isLength(value))
			return value;
		return `${QUOTE}${value.replace(/\'/g, '\\\'').replace(/\"/g, '\"')}${QUOTE}`;
	}

	if (typeof value === 'number' || typeof value === 'boolean')
		return value.toString();

	if (typeof value === 'object') {
		if (value === null)
			return 'null';

		if (value instanceof Array || value instanceof Set)
			return `(${
				Array
					.from(value)
					.map(value => parse(value, options))
					.join(SEPARATOR)
				})`;

		if (value instanceof Object)
			return `(${
				Object
					.keys(value)
					.map(key => `${key}: ${parse(value[key], options)}`)
					.join(SEPARATOR)
				})`;
	}
}

module.exports = parse;
