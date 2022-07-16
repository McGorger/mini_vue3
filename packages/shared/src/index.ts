export const extend = Object.assign;
export const isObject = (val) =>  {
    return val !== null && typeof val === 'object';
} 
export const hasChnange = (val, newValue) => !Object.is(val, newValue);