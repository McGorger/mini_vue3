export function createComponentInstance(vnode) {
    const component = {
        vnode
    }
    return component
}

export function setupComponent(instance) {
    //initProp()
    //initSlots()
    //
    setupStatefullComponent(instance)
}
function setupStatefullComponent(instance: any) {
    const Component = instance.vnode.type;
    const {setup} = Component;
    if(setup) {
        const setupResult = setup();
    }
}