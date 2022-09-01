import { createVNode } from "./vnode"
export function createAppApi(render) {
    return function createApp(rootComponent, rootProps) {
            const app = {
                _props: rootProps,
                _component: rootComponent,
                _container: null,
                mount(container) { // 挂载目的地

                    // 创建虚拟节点
                    const vnode = createVNode(rootComponent, rootProps);
                    
                    // 调用render函数
                    render(vnode, container);
                    app._container = container;
                }
            }
            return app
        }
}