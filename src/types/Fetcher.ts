import { Key } from './Key';

export type Fetcher<Data, RSQKey extends Key> = RSQKey extends [...infer Arguments]
    ? (...arguments_: Arguments) => Promise<Data>
    : RSQKey extends () => [...infer Arguments]
    ? (...arguments_: Arguments) => Promise<Data>
    : (argument: RSQKey) => Promise<Data>;
