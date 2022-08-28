'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const extend = Object.assign;
const isObject = (val) => {
    return val !== null && typeof val === 'object';
};
const hasChnange = (val, newValue) => !Object.is(val, newValue);

exports.extend = extend;
exports.hasChnange = hasChnange;
exports.isObject = isObject;
//# sourceMappingURL=shared.cjs.js.map
