declare type QuoteOption = 'none' | 'single' | 'double'

declare type SeparatorOption = 'comma' | 'space'

declare type ParseOptions = {
  quote?: QuoteOption,
  separator?: SeparatorOption
}

declare const parse: (value: any, options?: ParseOptions) => string;

export { parse as default, ParseOptions }
