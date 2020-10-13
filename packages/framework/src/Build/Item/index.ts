/**
 * Build Item
 */
export class Item implements Build.Item {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   */
  bud: Framework.Bud

  /**
   * Ident
   */
  ident?: Build.Item['ident']

  /**
   * Loader
   */
  loader?: Build.Item['loader']

  /**
   * Options
   */
  options?: Build.Item['options']

  /**
   * Query
   */
  query?: Build.Item['query']

  /**
   * Creates an instance of Item.
   */
  constructor(bud: Framework.Bud, module: Build.Item.Module) {
    this.bud = bud

    this.set(module)

    this.set = this.set.bind(this)
    this.make = this.make.bind(this)
  }

  /**
   * Prop map
   */
  public propMap: Build.Item['propMap'] = function () {
    return {
      ident: [this.ident, this.bud],
      query: [this.query, this.bud],
      loader: [this.loader, this.bud.build.loaders],
      options: [this.options, this.bud],
    }
  }

  /**
   * Set the loader definition
   */
  public set: Build.Item['set'] = function (
    module: Build.Item.Module,
  ): void {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Get the loader ident
   */
  public getIdent: Build.Item['getIdent'] = function () {
    return this.ident
  }

  /**
   * Set the loader ident
   */
  public setIdent: Build.Item['setIdent'] = function (
    ident: Build.Item.Module.Ident,
  ): void {
    this.ident = ident
  }

  /**
   * Get the loader ident
   */
  public getOptions: Build.Item['getOptions'] = function () {
    return this.options
  }

  /**
   * Set the loader options
   */
  public setOptions: Build.Item['setOptions'] = function (
    options: Build.Item.Module.Options,
  ): void {
    this.options = options
  }

  /**
   * Get the loader ident
   */
  public getQuery: Build.Item['getQuery'] = function () {
    return typeof this.query == 'function'
      ? this.query()
      : this.query
  }

  /**
   * Set the loader query
   */
  public setQuery: Build.Item['setQuery'] = function (
    query: Build.Item.Module.Query,
  ): void {
    this.query = query
  }

  /**
   * Get the loader ident
   */
  public getLoader: Build.Item['getLoader'] = function () {
    return this.loader
  }

  /**
   * Set the loader
   */
  public setLoader: Build.Item['setLoader'] = function (
    loader: Build.Item.Module.Loader,
  ): void {
    this.loader = loader
  }

  /**
   * Make an item for use in a rule.
   */
  public make: Build.Item['make'] = function (this: Build.Item) {
    // Each property is calculated based on its propMap entry.
    const valid: Build.Item.Valid = Object.entries(
      this.propMap(),
    )
      // First out nullish values, etc.
      .filter(
        ([, [value]]: [
          string,
          [Build.Item.Property, unknown],
        ]) => value !== null && value !== undefined,
      )

    // Then, reduce the set, tapping callables in translation
    const product: Build.Item.Product = valid.reduce(
      (
        fields: Build.Item.Product,
        [property, [value, param]]: [
          string,
          [
            Build.Item.MaybeCallable<Build.Item.Property>,
            unknown,
          ],
        ],
      ): Build.Item.Product => {
        /**
         * A property value can be calculated
         * in a couple different ways.
         */
        const computed =
          // For loaders which are specified as a string
          property == 'loader' && typeof value == 'string'
            ? // Set the loader from that string
              this.bud.build.loaders[value]
            : // Otherwise, for functions
            typeof value == 'function'
            ? // Call them with the param from this.propMap
              value(param)
            : // Else, just use the given value
              value

        return {
          ...fields,
          [property]: computed,
        }
      },
      {},
    )

    // Finally, return the computed item for use in a ruleset.
    return product
  }
}