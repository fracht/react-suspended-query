import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { QueryStore } from '../types/QueryStore';
import { stringifyKey } from './stringifyKey';

export class QueryKeyMap<TData> {
    constructor(private storage: QueryStore<TData> = new Map<string, FetchResult<TData>>()) {}

    public get = (key: Key): FetchResult<TData> => {
        const stringifiedKey = stringifyKey(key);

        return this.storage.get(stringifiedKey) as FetchResult<TData>;
    };

    public set = (key: Key, value: FetchResult<TData>): void => {
        const stringifiedKey = stringifyKey(key);

        this.storage.set(stringifiedKey, value);
    };

    public has = (key: Key): boolean => {
        const stringifiedKey = stringifyKey(key);

        return this.storage.has(stringifiedKey);
    };
}
