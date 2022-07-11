import { Key } from './Key';

export type Fetcher<TData, TKey extends Key> = TKey extends readonly [...infer Arguments]
    ? (...arguments_: [...Arguments]) => Promise<TData>
    : TKey extends infer Argument
    ? (...arguments_: [Argument]) => Promise<TData>
    : never;
