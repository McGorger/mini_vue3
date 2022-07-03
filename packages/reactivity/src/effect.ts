// import { extend } from '@vue/shared'
import { extend } from '../../shared/src/index';
let activeEffect;
let shouldTrack;
class ReactiveEffect {
    private _fn: any;
    deps = [];
    active = true;
    onStop?: () => void;
    public scheduler: Function | undefined;
    constructor(fn, scheduler?: Function) {
        this._fn = fn;
        this.scheduler = scheduler;
    }
    run() {
        if(!this.active) {
            return this._fn();
        }
        shouldTrack = true;
        activeEffect = this;
        const result = this._fn();
        shouldTrack = false;
        return result
       
    }
    stop() {
        if(this.active) {
            cleanupEffect(this);
            if(this.onStop) {
                this.onStop();
            }
            this.active = false;
        }

    }
}
const targetMap = new Map();
function cleanupEffect(effect) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect);
    })
    effect.deps.length = 0;
}

export function track(target, key) {
    if(!isTracking()) return;
    // target --> key -- dep
    let depsMap = targetMap.get(target);
    if(!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if(!dep) {
        dep = new Set();
        depsMap.set(key, dep)
    }
    // 已经在dep中
    if(dep.has(activeEffect)) return;
    activeEffect.deps.push(dep);
    dep.add(activeEffect);
}
function isTracking() {
    return shouldTrack && activeEffect !== undefined;
}
export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for(const effect of dep) {
        if(effect.scheduler) {
            effect.scheduler()
        }else {
            effect.run();
        }
    }
}
export function effect(fn, options: any = {}) {
    // fn
    const _effect = new ReactiveEffect(fn, options.scheduler);
    Object.assign(_effect, options);
    // extend
    extend(_effect, options);
    _effect.run();
    const runner: any = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}

export function stop(runner) {
    runner.effect.stop(); 
}