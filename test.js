const { assert } = require('chai');

describe('parse-sass-value module test', () => {
	const parse = require('./');

	it('exports a function', () => {
		assert.typeOf(parse, 'function');
	});

	describe('unsupported values', () => {
		assert.typeOf(parse, 'function'); 
	});
});
