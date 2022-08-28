const extend = Object.assign;
const isObject = (val) => {
    return val !== null && typeof val === 'object';
};
const hasChnange = (val, newValue) => !Object.is(val, newValue);

export { extend, hasChnange, isObject };
//# sourceMappingURL=shared.esm-bundler.js.map
