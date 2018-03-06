declare module 'object.entries' {
  /**
   * Returns an array of key/values of the enumerable properties of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  function ObjectEntries(o: {}): [string, any][]

  export default ObjectEntries
}
