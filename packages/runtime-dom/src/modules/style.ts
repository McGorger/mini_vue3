
import { isString, isArray, camelize, hyphenate, capitalize } from '@vue/shared';

type Style = string | Record<string, string | string[]> | null
export function patchStyle (el: Element, prev: Style, next: Style) {
    const style = (el as HTMLElement).style;
    const isCssString = isString(next)
    if (next && !isCssString) {
      for (const key in next) {
        setStyle(style, key, next[key])
      }

      // 老的没有新的有
      if (prev && !isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, '')
          }
        }
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          style.cssText = next as string
        }
      } else if (prev) {
        el.removeAttribute('style')
      }
    }
}
const prefixes = ['Webkit', 'Moz', 'ms']
const prefixCache: Record<string, string> = {}

function setStyle(
    style: CSSStyleDeclaration,
    name: string,
    val: string | string[]
  ) {
    if (isArray(val)) {
        val.forEach(v => setStyle(style, name, v))
      } else {
        if (val == null) val = ''
        if (name.startsWith('--')) {
          // custom property definition
          style.setProperty(name, val)
        } else {
          const prefixed = autoPrefix(style, name)
          if (importantRE.test(val)) {
            // !important
            style.setProperty(
              hyphenate(prefixed),
              val.replace(importantRE, ''),
              'important'
            )
          } else {
            style[prefixed as any] = val
          }
        }
      }
  }

const importantRE = /\s*!important$/
function autoPrefix(style: CSSStyleDeclaration, rawName: string): string {
  const cached = prefixCache[rawName]
  if (cached) {
    return cached
  }
  let name = camelize(rawName)
  if (name !== 'filter' && name in style) {
    return (prefixCache[rawName] = name)
  }
  name = capitalize(name)
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed)
    }
  }
  return rawName
}