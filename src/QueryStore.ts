import { FetchResult } from './FetchResult';
import { Key } from './Key';
import { stringifyKey } from './utils/stringifyKey';
import { ValueStore } from './ValueStore';

export class QueryStore {
    protected resultsStore: ValueStore<unknown> = new ValueStore<unknown>();
    protected pendingResultsStore: ValueStore<Promise<unknown>> = new ValueStore<Promise<unknown>>();
    protected errorsStore: ValueStore<unknown> = new ValueStore<unknown>();

    public get = (key: Key): FetchResult => {
        const stringifiedKey = stringifyKey(key);

        if (this.resultsStore.has(stringifiedKey)) {
            return {
                status: 'fulfilled',
                value: this.resultsStore.get(stringifiedKey)!,
            };
        }

        if (this.errorsStore.has(stringifiedKey)) {
            return {
                status: 'rejected',
                reason: this.errorsStore.get(stringifiedKey)!,
            };
        }

        if (this.pendingResultsStore.has(stringifiedKey)) {
            return {
                status: 'pending',
                promise: this.pendingResultsStore.get(stringifiedKey)!,
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
