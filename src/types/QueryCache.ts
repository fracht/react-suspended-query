import { Fetcher } from './Fetcher';
import { FetchResult } from './FetchResult';
import { Key } from './Key';

export type QueryCache = {
    getValue: <TData, TKey extends Key>(key: TKey, fetcher: Fetcher<TData, TKey>) => FetchResult<TData>;
};
