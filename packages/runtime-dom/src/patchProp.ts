import { patchClass } from './modules/class'
import { patchStyle } from './modules/style'
import { patchAttr } from './modules/attrs'
import { patchEvent } from './modules/events'

export const patchProp = (el, key, preValue, nextValue) => {
    switch (key) {
        case "class":
            patchClass(el, nextValue);
            break;
        case "style":
            patchStyle(el, preValue, nextValue);
        default:
            if(/^on[^a-z]/.test(key)) {
                patchEvent(el, key,  preValue, nextValue);
            }else {
                patchAttr(el, key, nextValue)
            }
            break
    }
}