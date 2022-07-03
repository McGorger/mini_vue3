import {readonly} from '../src/index';
describe('readonly', () => {
    it("happy path", () => {
        const original = {foo: 1, bar: {baz:2}};
        const wrapper = readonly(original);
        expect(wrapper).not.toBe(original);
        expect(wrapper.foo).toBe(1);
    })

    it("warn when call set", () => {
        // console.w
        console.warn = jest.fn();
        const user = readonly({age:10});
        user.age = 11;
        expect(console.warn).toBeCalled();
    })
})