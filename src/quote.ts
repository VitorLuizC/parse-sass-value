import { DEFAULT_QUOTE } from './defaults'

type QuoteOption = 'none' | 'single' | 'double'

type QuoteMap = Readonly<{ [ K in QuoteOption ]: string }>

const quotes: QuoteMap = Object.freeze({
  none: '',
  single: '\'',
  double: '\"',
})

const getQuote = (option: QuoteOption = DEFAULT_QUOTE): string => {
  const quote = quotes[option]
  if (quote === undefined)
    throw new Error(`Invalid quote option "${option}".`)
  return quote
}

export { getQuote as default, QuoteOption }
