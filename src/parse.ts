import parse, { ParseOptions } from './index'
import getQuote from './quote'
import getSeparator from './separator'

const toString = (value: string, options: ParseOptions): string => {
  const quote = getQuote(options.quote)
  return quote + value.replace(/('|")/g, '\\$1') + quote
}

const toCompatible = (value: number | boolean | null): string => '' + value

const toMap = (values: { [property: string]: any; }, options: ParseOptions): string => {
  const separator = getSeparator('comma')
  const pairs = Object.keys(values).map((property) => {
    const key = toString(property, options)
    const value = parse(values[property], options)
    return `${key}: ${value}`
  })
  return `(${pairs.join(separator)})`
}

const toList = (values: ArrayLike<any>, options: ParseOptions): string => {
  const separator = getSeparator(options.separator)
  const items = Array.prototype.map.call(values, (value: any) => parse(value, options))
  return `(${items.join(separator)})`
}

export { toMap, toList, toString, toCompatible }
