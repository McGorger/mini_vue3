export const extend = Object.assign;
export const isObject = (val) =>  {
    return val !== null && typeof val === 'object';
}
export const hasChange = (val, newValue) => !Object.is(val, newValue);
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isArray = Array.isArray;
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
    const cache: Record<string, string> = Object.create(null)
    return ((str: string) => {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    }) as any
  }
  
const camelizeRE = /-(\w)/g
/**
 * @private
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

const hyphenateRE = /\B([A-Z])/g
/**
 * @private
 */
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()
)
/**
 * @private
 */
 export const capitalize = cacheStringFunction(
    (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
)

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export * from './shapeFlags'; 