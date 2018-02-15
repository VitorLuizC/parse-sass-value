import { ParseOptions } from './index'
import { QuoteOption } from './quote'
import { SeparatorOption } from './separator'

const DEFAULT_QUOTE: QuoteOption = 'single'

const DEFAULT_SEPARATOR: SeparatorOption = 'comma'

const DEFAULT_OPTIONS: ParseOptions = {
  quote: DEFAULT_QUOTE,
  separator: DEFAULT_SEPARATOR
}

export { DEFAULT_QUOTE, DEFAULT_SEPARATOR, DEFAULT_OPTIONS }
