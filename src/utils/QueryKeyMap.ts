import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { QueryStore } from '../types/QueryStore';
import { stringifyKey } from './stringifyKey';

export class QueryKeyMap<TData> {
    private tempStorage = new Map<string, FetchResult<TData>>();

    constructor(private storage?: QueryStore<TData>) {}

    public get = (key: Key): FetchResult<TData> => {
        const stringifiedKey = stringifyKey(key);

        return (this.storage?.get(stringifiedKey) as FetchResult<TData>) ?? this.tempStorage.get(stringifiedKey);
    };

    public set = (key: Key, value: FetchResult<TData>): void => {
        const stringifiedKey = stringifyKey(key);

        if (this.storage && value.status === 'fulfilled') {
            this.storage.set(stringifiedKey, value);
        } else {
            this.tempStorage.set(stringifiedKey, value);
        }
    };

    public has = (key: Key): boolean => {
        const stringifiedKey = stringifyKey(key);

        return this.storage?.has(stringifiedKey) ?? this.tempStorage.has(stringifiedKey);
    };
}
