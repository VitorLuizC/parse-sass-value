import parse, { ParseOptions } from './index'
import getQuote, { QuoteOption } from './quote'
import getSeparator from './separator'

const toString = (value: string, options: ParseOptions): string => {
  const quote = getQuote(options.quote)
  const string = quote + value.replace(/('|")/g, '\\$1') + quote
  return string
}

const toCompatible = (value: number | boolean | null): string => '' + value

const createPairMapper = (options: ParseOptions) => {
  return ([ property, value ]: [ string, any ]): string => {
    const key = toString(property, options)
    const val = parse(value, options)
    const pair = `${key}: ${val}`
    return pair
  }
}

const toMap = (values: object, options: ParseOptions): string => {
  const separator = getSeparator('comma')
  const pairs = Object.entries(values).map(createPairMapper(options))
  const map = `(${pairs.join(separator)})`
  return map
}

const toList = (values: ArrayLike<any>, options: ParseOptions): string => {
  const separator = getSeparator(options.separator)
  const items = Array.from(values, (value) => parse(value, options))
  const list = `(${items.join(separator)})`
  return list
}

export { toMap, toList, toString, toCompatible }
