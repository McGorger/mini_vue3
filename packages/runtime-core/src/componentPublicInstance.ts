import { hasOwn } from "@vue/shared"

export const PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
         const {props, setupState, data} = instance
         if(hasOwn(setupState, key)) {
            return setupState[key]
         } else if(hasOwn(props, key)) {
            return props[key]
         } else if(hasOwn(data, key)){
            return data[key]
         } else {
            return undefined;
         }
    },
    set(target, key, value) {

    }
}