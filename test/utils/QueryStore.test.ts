import { QueryStore } from '../../src/types/QueryStore';

describe('QueryKeyMap', () => {
    it('should throw error when getting not existing query result', () => {
        const map = new QueryStore();

        expect(() => map.get('test')).toThrow();
    });

    it('should set fulfilled value', () => {
        const map = new QueryStore();

        map.set('test', { status: 'fulfilled', value: 42 });

        expect(map.has('test')).toBeTruthy();
        expect(map.get('test')).toStrictEqual({
            status: 'fulfilled',
            value: 42,
        });
    });

    it('should set pending promise', () => {
        const map = new QueryStore();

        const promise = new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000));

        map.set('test', {
            status: 'pending',
            promise,
        });

        expect(map.has('test')).toBeTruthy();
        expect(map.get('test')).toStrictEqual({
            status: 'pending',
            promise,
        });
    });

    it('should set query error', () => {
        const map = new QueryStore();

        map.set('test', { status: 'rejected', reason: 42 });

        expect(map.has('test')).toBeTruthy();
        expect(map.get('test')).toStrictEqual({
            status: 'rejected',
            reason: 42,
        });
    });
});
