import { FetcherResponse } from './FetcherResponse';
import { Key } from './Key';

export type Fetcher<Data = unknown, RSQKey extends Key = Key> = RSQKey extends readonly [...infer Arguments]
    ? (...arguments_: [...Arguments]) => FetcherResponse<Data>
    : never;
