import isColor from 'is-color'
import isLength from 'is-css-length'
import { toMap, toList, toString, toCompatible } from './parse'
import { QuoteOption } from './quote'
import { SeparatorOption } from './separator'
import { DEFAULT_OPTIONS } from './defaults'

export type ParseOptions = {
  quote?: QuoteOption,
  separator?: SeparatorOption
}

export default (value: any, options: ParseOptions = DEFAULT_OPTIONS): string => {
  if (typeof value === 'string' && (isColor(value) || isLength(value)))
    return value

  if (typeof value === 'string')
    return toString(value, options)

  if (typeof value === 'number' || typeof value === 'boolean' || value === null)
    return toCompatible(value)

  if (value && typeof value === 'object' && value.length)
    return toList(value, options)

  if (value && typeof value === 'object')
    return toMap(value, options)

  throw new Error(`Can't parse value "${value}".`)
}
