import { Key } from './Key';

export type Fetcher<TData, TKey extends Key> = TKey extends [...infer Arguments]
    ? (...arguments_: Arguments) => Promise<TData>
    : TKey extends () => [...infer Arguments]
    ? (...arguments_: Arguments) => Promise<TData>
    : (argument: TKey) => Promise<TData>;
