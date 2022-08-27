import { trackEffects, isTracking, triggerEffects } from './effect';
import { hasChnange, isObject } from '../../shared/src/index';
import { reactive } from './reactive';

class RefImpl {
    private _value: any;
    public dep;
    private _rawValue: any;
    public __v_isRef = true;
    constructor(value) {
        this._rawValue = value;
        this._value = convert(value);
        this.dep  = new Set();
    }
    get value() {
        trackRefValue(this);
        return this._value;
    }
    set value(newValue) {
        // hasChnange
        if(!hasChnange(newValue, this._rawValue)) return; 
        this._rawValue = newValue;
        this._value =  convert(newValue);
        triggerEffects(this.dep);
    }
}
function convert(value) {
    return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
    if(isTracking()) {
        trackEffects(ref.dep);
    }
}
export function ref(value) {
    return new RefImpl(value);
}
export function isRef(value) {
    return  !!value.__v_isRef;
}

export function unRef(ref) {
    // return  !!value.__v_isRef;
    return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRef) {
    return new Proxy(objectWithRef, {
        get(target,key) {
            return unRef(Reflect.get(target,key))
        },
        set(target, key, value) {
            if(isRef(target[key]) && !isRef(value)) {
                return target[key].value = value;
            }else {
                return Reflect.set(target, key, value)
            }
        }
    })
}