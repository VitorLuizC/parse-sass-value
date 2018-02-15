/* eslint-env mocha */

const { assert } = require('chai')

describe('parse-sass-value module test', () => {
  const parse = require('./')

  it('exports a function', () => {
    assert.typeOf(parse, 'function')
  })

  describe('unsupported values', () => {
    it('Throws error trying to parse functions', () => {
      assert.throws(() => parse(() => undefined))
    })
    it('Throws error trying to parse undefined values', () => {
      assert.throws(() => parse(undefined))
    })
    it('Throws error trying to parse symbols', () => {
      assert.throws(() => parse(Symbol('Example')))
    })
  })

  it('parses boolean values', () => {
    assert.equal(parse(true), 'true')
    assert.equal(parse(false), 'false')
  })

  it('parses number values', () => {
    assert.equal(parse(16), '16')
    assert.equal(parse(0.99), '0.99')
  })

  it('parses string values', () => {
    assert.equal(parse('color-theme'), '\'color-theme\'')
  })

  it('escape quotes', () => {
    assert.equal(parse('"Open Sans"'), '\'\\"Open Sans\\"\'')
    assert.equal(parse('\'Open Sans\''), '\'\\\'Open Sans\\\'\'')
  })

  it('parses unit values without quotes', () => {
    assert.equal(parse('100px'), '100px')
    assert.equal(parse('10%'), '10%')
    assert.equal(parse('12rem'), '12rem')
  })

  it('parses colors values without quotes', () => {
    assert.equal(parse('white'), 'white')
    assert.equal(parse('#333'), '#333')
    assert.equal(parse('rgb(0,0,0)'), 'rgb(0,0,0)')
  })

  it('parses arrays to lists', () => {
    assert.equal(parse([1, 2]), '(1, 2)')
  })

  it('parses objects to maps', () => {
    assert.equal(parse({a: 1, b: 2}), '(\'a\': 1, \'b\': 2)')
  })

  describe('options', () => {
    it('quotes define string quote type', () => {
      assert.equal(parse('color-theme', { quote: 'double' }), '"color-theme"')
      assert.equal(parse('color-theme', { quote: 'single' }), '\'color-theme\'')
    })

    it('separator define list and map separator', () => {
      assert.equal(parse({a: 'a', b: 'b'}, { separator: 'comma' }), '(\'a\': \'a\', \'b\': \'b\')')
      assert.equal(parse(['10px', '20px'], { separator: 'space' }), '(10px 20px)')
    })
  })
})
