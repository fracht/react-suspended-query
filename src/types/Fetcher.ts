import { Key } from './Key';

export type Fetcher<Data, RSQKey extends Key> = RSQKey extends [...infer Args]
    ? (...args: Args) => Promise<Data>
    : RSQKey extends string
    ? (key: string) => Promise<Data>
    : (key: object) => Promise<Data>;
