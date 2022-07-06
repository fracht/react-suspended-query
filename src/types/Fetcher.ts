import { Key } from './Key';

export type Fetcher<Data = unknown, RSQKey extends Key = Key> = RSQKey extends () => infer Argument
    ? (argument: Argument) => Promise<Data>
    : RSQKey extends infer Argument
    ? (argument: Argument) => Promise<Data>
    : RSQKey extends [...infer Arguments]
    ? (arguments_: Arguments) => Promise<Data>
    : RSQKey extends () => [...infer Arguments]
    ? (arguments_: Arguments) => Promise<Data>
    : never;
