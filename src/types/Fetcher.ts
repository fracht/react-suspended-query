import { Key } from './Key';

export type Fetcher<
    Data = unknown,
    RSQKey extends Key = Key
> = RSQKey extends () => infer Arg
    ? (arg: Arg) => Promise<Data>
    : RSQKey extends infer Arg
    ? (arg: Arg) => Promise<Data>
    : RSQKey extends [...infer Args]
    ? (args: Args) => Promise<Data>
    : RSQKey extends () => [...infer Args]
    ? (args: Args) => Promise<Data>
    : never;
