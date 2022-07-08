import { stringifyKey } from '../../src/utils/stringifyKey';

describe('Stringify key', () => {
    it('should stringify string', () => {
        expect(stringifyKey('asdf')).toBe(stringifyKey('asdf'));
        expect(typeof stringifyKey('asdf')).toBe('string');
    });

    it('should stringify object', () => {
        expect(stringifyKey({ key: 'api/url', payload: { value: 42 } })).toBe(
            stringifyKey({ payload: { value: 42 }, key: 'api/url' }),
        );
        expect(typeof stringifyKey({ key: 'api/url', payload: { value: 42 } })).toBe('string');
    });
});
