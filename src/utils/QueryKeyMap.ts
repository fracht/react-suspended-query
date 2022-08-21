import { Key } from '../types/Key';
import { QueryCache } from '../types/QueryCache';
import { stringifyKey } from './stringifyKey';

export class QueryKeyMap {
    constructor(private cache: QueryCache<unknown> = new Map()) {}

    public get = <TValue>(key: Key): TValue | undefined => {
        const stringifiedKey = stringifyKey(key);
        return this.cache.get(stringifiedKey);
    };

    public set = <TValue>(key: Key, value: TValue) => {
        const stringifiedKey = stringifyKey(key);
        this.cache.set(stringifiedKey, value);
    };

    public has = (key: Key): boolean => {
        const stringifiedKey = stringifyKey(key);
        return this.cache.has(stringifiedKey);
    };
}
