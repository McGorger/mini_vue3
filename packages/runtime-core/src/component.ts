import { isFunction, isObject, ShapeFlags } from "@vue/shared";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
    const instance = {
        vnode,
        type: vnode.type,
        props: {},
        attrs: {},
        slots: {},
        ctx: {},
        data: {},
        setupState: {},
        render: null,
        isMount: false
    }
    instance.ctx = { _: instance}
    return instance
}

export function setupComponent(instance) {
    //initProp()
    //initSlots()
    //
    const {props, children} = instance.vnode;
    // 根据props解析出props 和 attrs ，将其放到instance上
    instance.props = props;
    instance.children = children; // 插槽的解析
    let isStateful = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT;
    if(isStateful) { // 表示现在是一个状态的组件
        setupStatefullComponent(instance);
    }
}
function setupStatefullComponent(instance: any) {
    // 1. 代理 传递给render 函数的参数
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)
    const Component = instance.type;
    const {setup} = Component; 
    if(setup) {    
        const setupContext = createContext(instance);
        const setupResult = setup(instance.props, setupContext);
        // Component.render(instance.proxy)
        handleSetupResult(instance, setupResult);
    } else {
        finishComponentSetup(instance )
    }
}

function createContext(instance) {
    return {
        attrs: instance.attrs,
        slots: instance.slots,
        props: instance.props,
        emit: () => {},
        expose: () => {}
    }
}
function handleSetupResult(instance, setupResult: any) {
    if (isFunction(setupResult)) {
        instance.render = setupResult;
    } else if(isObject(setupResult)) {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}

function finishComponentSetup(instance) {
    const Component = instance.type;
    const {render} = Component;
    if(!instance.render) {
        if(Component.render && Component.template) {
            
        }
        instance.render = Component.render;
 
    }else {
        instance.render = Component.render;
    }
}