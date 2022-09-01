import { isArray, isObject, isString, ShapeFlags } from "@vue/shared"

export function createVNode(type, props?, children?) {
    const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObject(type) ? ShapeFlags.STATEFUL_COMPONENT : 0;
    // 根据type区分组件还是元素
    const vnode = {
        __v_isVnode: true, // 是一个虚拟node节点
        type,
        props,
        children,
        component: null,
        key: props && props.key,
        el: null,
        shapeFlag
    }
    normalizeChildren(vnode, children);
    return vnode
}
function normalizeChildren(vnode, children) {
    let type = 0;
    if(children === null) {
        
    } else if(isArray(children)) {
        type = ShapeFlags.ARRAY_CHILDREN;
    } else {
        type = ShapeFlags.TEXT_CHILDREN;
    }
    vnode.shapeFlag |= type;
}