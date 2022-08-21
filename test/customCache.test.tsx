import { createCacheGroup } from "../src";
import { Key } from "../src/types/Key";

describe('Possibility to provide custom cache', () => {
    it('should call functions from custom cache', () => {
        const obj: Record<string, any> = {}

        const get = jest.fn((key: Key) => obj[key]);
        const set = jest.fn((key: Key, value: any) => {
            obj[key] = value
        });
        const has = jest.fn((key: Key) => key in obj);

        const CacheGroup = createCacheGroup({
            get,
            set,
            has
        });


    })
})