import { QueryStore } from '../../src/types/QueryStore';

describe('QueryStore functionality', () => {
    it('should store primitive values in resultsStore', () => {
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

    it('should store Promise<primitive value> in pendingResultsStore', () => {
        const store = new QueryStore();

        const numberPromise = Promise.resolve<number>(42);
        const undefinedPromise = Promise.resolve<undefined>(undefined);
        const nullPromise = Promise.resolve<null>(null);
        const booleanPromise = Promise.resolve<boolean>(false);
        const NaNPromise = Promise.resolve<number>(Number.NaN);
        const stringPromise = Promise.resolve<string>('testing string');

        store.set('number', { status: 'pending', promise: numberPromise });
        store.set('undefined', { status: 'pending', promise: undefinedPromise });
        store.set('null', { status: 'pending', promise: nullPromise });
        store.set('boolean', { status: 'pending', promise: booleanPromise });
        store.set('NaN', { status: 'pending', promise: NaNPromise });
        store.set('string', { status: 'pending', promise: stringPromise });

        expect(store.get('number')).toStrictEqual({ status: 'pending', promise: numberPromise });
        expect(store.get('undefined')).toStrictEqual({ status: 'pending', promise: undefinedPromise });
        // eslint-disable-next-line unicorn/no-null
        expect(store.get('null')).toStrictEqual({ status: 'pending', promise: nullPromise });
        expect(store.get('boolean')).toStrictEqual({ status: 'pending', promise: booleanPromise });
        expect(store.get('NaN')).toStrictEqual({ status: 'pending', promise: NaNPromise });
        expect(store.get('string')).toStrictEqual({ status: 'pending', promise: stringPromise });
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

    it('should set values with different types of keys', () => {
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
