import { FetchResult } from './FetchResult';

export type QueryStore<TData> = {
    get: (key: string) => FetchResult<TData> | undefined;
    set: (key: string, value: FetchResult<TData>) => void;
    has: (key: string) => boolean;
};
