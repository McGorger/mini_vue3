import { createComponentInstance, setupComponent } from "./component";
import { createAppApi } from "./apiCreateApp";
import { ShapeFlags } from "@vue/shared";
import {effect} from '@vue/reactivity'
export function createRenderer(rendererOptions) {
    const {
        insert: hostInsert,
        remove: hostRemove,
        createElement: hostCreateElement,
        patchProp: hostPatchProp,
        setText: hostSetText,
        setElementText: hostSetElementText,
    } = rendererOptions;
    const render = (vnode, container) => {
        debugger
         // 判断vnode是不是一个element
         patch(null, vnode, container)
    }
    const mountChildren = (children, el) => {
        for(let i = 0 ; i < children.length ; i++){

        }
    }

    const mountElement = (vnode, container) => {
        const {props, shapeFlag, type, children} = vnode;
        const el = (vnode.el = hostCreateElement(type))
        if(props) {
            for(const key in props) {
                hostPatchProp(el, key, null, props[key])
            }
        }
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children)
        } else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(children, el);
        }
        hostInsert(el, container);
     }

    function processComponent(n1, n2, container) {
        if(n1 === null) {
            mountComponent(n2, container);
        }else {
            // 元素更新
            // mountElement()
        }
    }
    const setupRenderEffect = (instance: any, container) => {
        // 需要创建一个effect在effect中调用render方法得到返回值, 获得render函数返回值的结果来渲染， 属性更新时自动渲染
        // vode -> patch
        effect(function componentEffect() {
            if(!instance.isMounted) {
                // 初次渲染
                const proxyToUse = instance.proxy;
                const subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse);
                patch(null, subTree, container)
                instance.isMounted = true;
            } else {
                // 更新逻辑
            }
        })
    }
    function mountComponent(initiaVnode, container){
        const instance = (initiaVnode.component = createComponentInstance(initiaVnode));
        // 2. 把需要的数据解析到实例上
        setupComponent(instance);
     
        setupRenderEffect(instance, container);
    }

    // 处理元素
    const processElement = (n1, n2, container) => {
        if(n1 === null) {
            mountElement(n2, container)
        }
        
    }
    function patch(n1, n2, container) {
        const {shapeFlag} = n2;
        if(shapeFlag & ShapeFlags.ELEMENT) {
            processElement(n1, n2, container);
        }else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            processComponent(n1, n2, container);
        }
    }
    return {
        createApp: createAppApi(render)
    }
}