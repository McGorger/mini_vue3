import { track, trigger } from './effect';
export function reactive(row) {
    return new Proxy(row, {
        get(target, key) {
            const res = Reflect.get(target, key);
            //  todo 依赖收集
            track(target, key);
            return res;
        },
        set(target, key, value) {
            const res = Reflect.set(target, key, value);
            // 
            trigger(target, key);
            return res;
        }
    })
}