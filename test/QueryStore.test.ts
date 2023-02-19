import { QueryStore } from '../src/QueryStore';

describe('QueryStore functionality', () => {
    it('should store primitive values', () => {
        const store = new QueryStore();

        store.set('number', { status: 'fulfilled', value: 42 });
        store.set('undefined', { status: 'fulfilled', value: undefined });
        store.set('null', { status: 'fulfilled', value: null });
        store.set('boolean', { status: 'fulfilled', value: false });
        store.set('NaN', { status: 'fulfilled', value: Number.NaN });
        store.set('string', { status: 'fulfilled', value: 'testing string' });

        expect(store.get('number')).toStrictEqual({ status: 'fulfilled', value: 42 });
        expect(store.get('undefined')).toStrictEqual({ status: 'fulfilled', value: undefined });
        expect(store.get('null')).toStrictEqual({ status: 'fulfilled', value: null });
        expect(store.get('boolean')).toStrictEqual({ status: 'fulfilled', value: false });
        expect(store.get('NaN')).toStrictEqual({ status: 'fulfilled', value: Number.NaN });
        expect(store.get('string')).toStrictEqual({ status: 'fulfilled', value: 'testing string' });
    });

    it('should store promises', () => {
        const store = new QueryStore();

        const numberPromise = Promise.resolve<number>(42);
        const objectPromise = Promise.resolve({ hello: 'hello' });

        store.set('number', { status: 'pending', promise: numberPromise });
        store.set('obj', { status: 'pending', promise: objectPromise });

        expect(store.get('number')).toStrictEqual({ status: 'pending', promise: numberPromise });
        expect(store.get('obj')).toStrictEqual({ status: 'pending', promise: objectPromise });
    });

    it('should store objects', () => {
        const store = new QueryStore();

        // Simple object
        store.set('test1', { status: 'fulfilled', value: { id: 24, name: 'John' } });
        expect(store.has('test1')).toBeTruthy();
        expect(store.get('test1')).toStrictEqual({ status: 'fulfilled', value: { id: 24, name: 'John' } });

        // Class instance
        class MyClass {
            value = 21;
            name = 'John';
            surname = 'Watson';
        }
        store.set('test2', { status: 'fulfilled', value: new MyClass() });
        expect(store.has('test2')).toBeTruthy();
        expect(store.get('test2')).toStrictEqual({ status: 'fulfilled', value: new MyClass() });

        // Circular object
        type A = {
            a: A;
        };

        const a: A = {} as A;
        a.a = a;
        store.set('test3', { status: 'fulfilled', value: a });
        expect(store.has('test3')).toBeTruthy();
        expect(store.get('test3')).toStrictEqual({ status: 'fulfilled', value: a });
    });

    it('should set values with different types of key', () => {
        // Simple class case
        class MyClass {
            public value = 42;
        }

        const store = new QueryStore();

        store.set([new MyClass()], { status: 'fulfilled', value: 42 });
        expect(store.has([new MyClass()])).toBeTruthy();

        // Circular object case
        type A = {
            a: A;
        };

        const a: A = {} as A;
        a.a = a;

        store.set([a], { status: 'fulfilled', value: 42 });
        expect(store.has([a])).toBeTruthy();

        // Null / undefined case
        store.set([null, undefined], { status: 'fulfilled', value: 42 });
        expect(store.has([null, undefined])).toBeTruthy();
        expect(store.has([undefined, null])).toBeFalsy();

        // With NaN
        store.set([Number.NaN], { status: 'fulfilled', value: 42 });
        expect(store.has([Number.NaN])).toBeTruthy();

        // With everything together
        store.set([new MyClass(), a, null, undefined, Number.NaN], { status: 'fulfilled', value: 42 });
        expect(store.has([new MyClass(), a, null, undefined, Number.NaN])).toBeTruthy();
    });
});
