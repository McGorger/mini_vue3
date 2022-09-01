import { createRenderer } from "@vue/runtime-core";
import {extend} from "@vue/shared";
import { nodeOpts } from "./nodeOps";
import { patchProp } from "./patchProp";


const rendererOptions = extend({patchProp}, nodeOpts);
export function createApp(rootComponent, rootProps = null) {
    // debugger
    const app = createRenderer(rendererOptions).createApp(rootComponent, rootProps);
    let {mount} = app;
    app.mount = function(container) {
        // 清空容器的操作
        container = nodeOpts.querySelector(container);
        container.innerHTML = ''
        mount(container);
    }
    return app;
}

export * from '@vue/runtime-core';