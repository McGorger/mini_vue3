import { createComponentInstance, setupComponent } from "./component";
import { createAppApi } from "./apiCreateApp";
import { ShapeFlags } from "@vue/shared";







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
        const subtree = instance.type.render(instance.proxy);
        // vode -> patch
        patch(null, subtree, container)
    }    
    function mountComponent(initiaVnode, container){
        const instance = (initiaVnode.component = createComponentInstance(initiaVnode));
        // 2. 把需要的数据解析到实例上
        setupComponent(instance);
     
        // setupRenderEffect(instance, container);
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