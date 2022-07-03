import { reactive } from '../src/index';
import { isReactive, isProxy } from '../src/reactive';
describe('effect', () => {
    it('happy path', () => {
       const original = {foo: 1};
       const observed = reactive(original);
       expect(observed).not.toBe(original);
       expect(observed.foo).toBe(1);
       expect(isReactive(observed)).toBe(true);
       expect(isReactive(original)).toBe(false);
       expect(isProxy(observed)).toBe(true);
       expect(isReactive(original)).toBe(false);
    });
    it('nested reactive', () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{foo: 1}]
        };
        const observed = reactive(original);
        expect(isReactive(observed.nested)).toBe(true);
        expect(isReactive(observed.array)).toBe(true);
        expect(isReactive(observed.array[0])).toBe(true);
     });
})