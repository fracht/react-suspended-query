import { Fetcher } from './Fetcher';
import { FetchResult } from './FetchResult';
import { Key } from './Key';

export type RSQContextType = {
    fetchValue: <Data, RSQKey extends Key>(key: RSQKey, fetcher: Fetcher<Data, RSQKey>) => FetchResult<Data>;
};
