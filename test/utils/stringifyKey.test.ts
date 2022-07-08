import { stringifyKey } from '../../src/utils/stringifyKey';

describe('Stringify key', () => {
    it('should stringify string', () => {
        console.log(stringifyKey('asdf'));
    });

    it('should stringify object', () => {
        console.log(stringifyKey({ key: 'api/url', payload: { value: 42 } }));
    });
});
