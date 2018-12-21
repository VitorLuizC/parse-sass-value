import test from 'ava'
import parse from './'

test('module exports a function', (context) => {
  context.is(typeof parse, 'function')
})

test('Throws error trying to parse functions', (context) => {
  context.throws(() => parse(() => undefined))
})

test('Throws error trying to parse undefined values', (context) => {
  context.throws(() => parse(undefined))
})

test('Throws error trying to parse symbols', (context) => {
  context.throws(() => parse(Symbol('Example')))
})

test('parses boolean values', (context) => {
  context.is(parse(true), 'true')
  context.is(parse(false), 'false')
})

test('parses number values', (context) => {
  context.is(parse(16), '16')
  context.is(parse(0.99), '0.99')
})

test('parses string values', (context) => {
  context.is(parse('color-theme'), '\'color-theme\'')
})

test('escape quotes', (context) => {
  context.is(parse('"Open Sans"'), '\'\\"Open Sans\\"\'')
  context.is(parse('\'Open Sans\''), '\'\\\'Open Sans\\\'\'')
})

test('parses unit values without quotes', (context) => {
  context.is(parse('100px'), '100px')
  context.is(parse('10%'), '10%')
  context.is(parse('12rem'), '12rem')
})

test('parses colors values without quotes', (context) => {
  context.is(parse('white'), 'white')
  context.is(parse('#333'), '#333')
  context.is(parse('rgb(0,0,0)'), 'rgb(0,0,0)')
})

test('parses arrays to lists', (context) => {
  context.is(parse([1, 2]), '(1, 2)')
})

test('parses objects to maps', (context) => {
  context.is(parse({a: 1, b: 2}), '(\'a\': 1, \'b\': 2)')
})

test('options quotes define string quote type', (context) => {
  context.is(parse('color-theme', { quote: 'double' }), '"color-theme"')
  context.is(parse('color-theme', { quote: 'single' }), '\'color-theme\'')
})

test('options separator define list and map separator', (context) => {
  context.is(parse(['10px', '20px'], { separator: 'comma' }), '(10px, 20px)')
  context.is(parse(['10px', '20px'], { separator: 'space' }), '(10px 20px)')
})
