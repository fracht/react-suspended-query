import { convertKeyToArguments } from '../../src/utils/convertKeyToArguments';

describe('normalize arguments to be passed in fetcher', () => {
    it('should normalize single string', () => {
        expect(convertKeyToArguments('asdf')).toStrictEqual(['asdf']);
    });

    it('should normalize array', () => {
        const object = {};
        expect(convertKeyToArguments(['single string', 42, object])).toStrictEqual(['single string', 42, object]);
    });
});
