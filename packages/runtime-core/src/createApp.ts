import { createVNode } from "./createVNode";
import { render } from "./renderer";

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    }
}
