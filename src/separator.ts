import { DEFAULT_SEPARATOR } from './defaults'

type SeparatorOption = 'comma' | 'space'

type SeparatorMap = Readonly<{ [ K in SeparatorOption ]: string }>

const separators: SeparatorMap = Object.freeze({
  comma: ', ',
  space: ' ',
})

const getSeparator = (option: SeparatorOption = DEFAULT_SEPARATOR): string => {
  const separator = separators[option]
  if (separator === undefined)
    throw new Error(`Invalid separator option "${option}".`)
  return separator
}

export { getSeparator as default, SeparatorOption }
