import {reactive, computed} from '@vue/reactivity';
describe("computed", () => {
    it("happy path" , () => {
        const value = reactive({
            foo: 1
        })
        const getter = jest.fn(() => {
            return value.foo;
        })
        const cValue = computed(getter)

        // lazy
        expect(getter).not.toHaveBeenCalled();
        expect(cValue.value).toBe(1);
        expect(getter).toHaveBeenCalledTimes(1);

        
    })
})