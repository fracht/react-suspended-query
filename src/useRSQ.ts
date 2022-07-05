import { useContext, useEffect } from 'react';

export type Key = [string, ...unknown[]] | readonly [string, ...unknown[]];

export type FetcherResponse<Data = unknown> = Data | Promise<Data>;

export type Fetcher<Data = unknown, RSQKey extends Key = Key> = RSQKey extends readonly [...infer Arguments]
    ? (...arguments_: [...Arguments]) => FetcherResponse<Data>
    : never;

export const useRSQ = <Data, RSQKey extends Key>(key: RSQKey, fetcher: Fetcher<Data, RSQKey>) => {
    const { fetchValue, revalidate } = useContext();
    const value = fetchValue(key, fetcher);

    useEffect(() => {
        return () => revalidate(key);
    }, []);

    if (value.status === 'pending' || value.status === 'rejected') {
        throw value.payload;
    }

    return value.payload;
};
