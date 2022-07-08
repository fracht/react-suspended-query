import { Key } from './Key';

export type Fetcher<Data, QueryKey extends Key> = QueryKey extends [...infer Arguments]
    ? (...arguments_: Arguments) => Promise<Data>
    : QueryKey extends () => [...infer Arguments]
    ? (...arguments_: Arguments) => Promise<Data>
    : (argument: QueryKey) => Promise<Data>;
