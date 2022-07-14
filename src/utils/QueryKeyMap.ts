import { Key } from '../types/Key';
import { stringifyKey } from './stringifyKey';

export class QueryKeyMap<TValue> {
    private values: Map<string, TValue> = new Map();

    public get(key: Key): TValue | undefined {
        const stringifiedKey = stringifyKey(key);
        return this.values.get(stringifiedKey);
    }

    public set(key: Key, value: TValue) {
        const stringifiedKey = stringifyKey(key);
        this.values.set(stringifiedKey, value);
    }

    public has(key: Key): boolean {
        const stringifiedKey = stringifyKey(key);
        return this.values.has(stringifiedKey);
    }
}
