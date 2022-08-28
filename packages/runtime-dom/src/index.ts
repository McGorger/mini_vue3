import {extend} from "@vue/shared";
import { nodeOpts } from "./nodeOps";
import { patchProp } from "./patchProp";


const rendererOptions = extend({patchProp}, nodeOpts);
// export function createApp(rootComponent, rootProps = null) {
//     const app = {
        
//     }
//     app.mount = function(container) {

//     }
//     return app;
// }