import { createComponentInstance, setupComponent } from "./component";
import { createAppApi } from "./apiCreateApp";
import { ShapeFlags } from "@vue/shared";
import {effect} from '@vue/reactivity'
export function createRenderer(rendererOptions) {
    const render = (vnode, container) => {
         // 判断vnode是不是一个element
         patch(null, vnode, container)
    }

    function processComponent(n1, n2, container) {
        if(n1 === null) {
            mountComponent(n2, container);
        }else {

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
                console.log(subTree);
                
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

    function patch(n1, n2, container) {
        const {shapeFlag} = n2;
        if(shapeFlag & ShapeFlags.ELEMENT) {

        }else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            processComponent(n1, n2, container);
        }
    }
    return {
        createApp: createAppApi(render)
    }
}