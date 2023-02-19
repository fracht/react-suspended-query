import { StrictMap } from '../src/StrictMap';

describe('StrictMap functionality', () => {
    it('should throw error when getting not existing value', () => {
        const map = new StrictMap();

        expect(() => map.get('hello')).toThrow();
    });

    it('should not throw an error when getting existing value', () => {
        const map = new StrictMap();

        map.set('hello', 42);

        expect(() => map.get('hello')).not.toThrow();
        expect(map.get('hello')).toBe(42);
    });
});
