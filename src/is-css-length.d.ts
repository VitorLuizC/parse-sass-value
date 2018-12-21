declare module 'is-css-length' {
  /**
   * @example
   * isLength('10px')
   * //=> true
   * isLength('10')
   * //=> false
   * isLength('0em')
   * //=> true
   * isLength('0')
   * //=> true
   * @param str
   */
  function isLength (str: string): boolean

  export = isLength
}
