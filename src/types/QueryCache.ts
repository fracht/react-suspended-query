import { Fetcher } from './Fetcher';
import { FetchResult } from './FetchResult';
import { Key } from './Key';

export type QueryCache = {
    getValue: <Data, QueryKey extends Key>(key: QueryKey, fetcher: Fetcher<Data, QueryKey>) => FetchResult<Data>;
};
