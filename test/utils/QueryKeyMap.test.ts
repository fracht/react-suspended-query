import { QueryKeyMap } from '../../src/utils/QueryKeyMap';

describe('QueryKeyMap', () => {
    it('should not set rejected or pending value in custom storage', () => {
        const myStorage = new Map();

        const queryMap = new QueryKeyMap(myStorage);

        queryMap.set('test1', {
            status: 'rejected',
            reason: new Error('Testing error'),
        });

        queryMap.set('test2', {
            status: 'pending',
            promise: new Promise((resolve) => {
                setTimeout(resolve, 1000);
            }),
        });

        expect(myStorage.size).toBe(0);

        queryMap.set('test3', {
            status: 'fulfilled',
            value: 42,
        });

        expect(myStorage.size).toBe(1);
        expect(Array.from(myStorage.entries())[0][1]).toStrictEqual({
            status: 'fulfilled',
            value: 42,
        });
    });

    it('should return rejected value from tempStorage', () => {
        const myStorage = new Map();

        const queryMap = new QueryKeyMap(myStorage);

        const storedValue = {
            status: 'rejected' as const,
            reason: new Error('hello!'),
        };

        queryMap.set('test1', storedValue);

        expect(queryMap.get('test1')).toBe(storedValue);
    });

    it('should return pending value from tempStorage', () => {
        const myStorage = new Map();

        const queryMap = new QueryKeyMap(myStorage);

        const storedValue = {
            status: 'pending' as const,
            promise: new Promise((resolve) => {
                setTimeout(resolve, 500);
            }),
        };

        queryMap.set('test1', storedValue);

        expect(queryMap.get('test1')).toBe(storedValue);
    });
});
