import { stringifyKey } from '../utils/stringifyKey';
import { FetchResult } from './FetchResult';
import { Key } from './Key';
import { StrictMap } from './StrictMap';
import { ValueStore } from './ValueStore';

export class QueryStore {
    protected resultsStore: ValueStore<unknown> = new StrictMap<unknown>();
    protected pendingResultsStore: ValueStore<Promise<unknown>> = new StrictMap<Promise<unknown>>();
    protected errorsStore: ValueStore<unknown> = new StrictMap<unknown>();

    public get = (key: Key): FetchResult => {
        const stringifiedKey = stringifyKey(key);

        if (this.resultsStore.has(stringifiedKey)) {
            return {
                status: 'fulfilled',
                value: this.resultsStore.get(stringifiedKey)!.value,
            };
        }

        if (this.pendingResultsStore.has(stringifiedKey)) {
            return {
                status: 'pending',
                promise: this.pendingResultsStore.get(stringifiedKey)!.value,
            };
        }

        if (this.errorsStore.has(stringifiedKey)) {
            return {
                status: 'rejected',
                reason: this.errorsStore.get(stringifiedKey)!.value,
            };
        }

        throw new Error(`Cannot get fetch result from key "${stringifiedKey}".`);
    };

    public set = (key: Key, value: FetchResult): void => {
        const stringifiedKey = stringifyKey(key);

        if (value.status === 'fulfilled') {
            this.resultsStore.set(stringifiedKey, value.value);
        } else if (value.status === 'pending') {
            this.pendingResultsStore.set(stringifiedKey, value.promise);
        } else {
            this.errorsStore.set(stringifiedKey, value.reason);
        }
    };

    public has = (key: Key): boolean => {
        const stringifiedKey = stringifyKey(key);

        return (
            this.resultsStore.has(stringifiedKey) ||
            this.pendingResultsStore.has(stringifiedKey) ||
            this.errorsStore.has(stringifiedKey)
        );
    };
}
