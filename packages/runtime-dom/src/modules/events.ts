
import { hyphenate, isArray } from '@vue/shared';
interface Invoker extends EventListener {
    value: EventValue
}  
type EventValue = Function | Function[];
export function addEventListener(
    el: Element,
    event: string,
    handler: EventListener,
    options?: EventListenerOptions
  ) {
    el.addEventListener(event, handler, options)
  }
export function removeEventListener(
    el: Element,
    event: string,
    handler: EventListener,
    options?: EventListenerOptions
) {
    el.removeEventListener(event, handler, options)
}

export function patchEvent(el: Element & { _vei?: Record<string, Invoker | undefined> },
    rawName: string,
    prevValue: EventValue | null,
    nextValue: EventValue | null
) {
    // vei = vue event invokers
    const invokers = el._vei || (el._vei = {})
    const existingInvoker = invokers[rawName]
    if (nextValue && existingInvoker) {
        // patch
        existingInvoker.value = nextValue
    } else {
        const [name, options] = parseName(rawName)
        if (nextValue) {
            const invoker = (invokers[rawName] = createInvoker(nextValue))
            addEventListener(el, name, invoker, options)
        } else if (existingInvoker) {
            removeEventListener(el, name, existingInvoker, options)
            invokers[rawName] = undefined
    }
  }
} 

const optionsModifierRE = /(?:Once|Passive|Capture)$/
function parseName(name: string): [string, EventListenerOptions | undefined] {
    let options: EventListenerOptions | undefined
    if (optionsModifierRE.test(name)) {
      options = {}
      let m
      while ((m = name.match(optionsModifierRE))) {
        name = name.slice(0, name.length - m[0].length)
        ;(options as any)[m[0].toLowerCase()] = true
      }
    }
    return [hyphenate(name.slice(2)), options]
  }


function createInvoker(
    initialValue: EventValue
  ) {
    const invoker: Invoker = (e: Event) => {
        // invoker.value(e)
    }
    invoker.value = initialValue
    return invoker
  }