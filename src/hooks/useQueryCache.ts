import { useCallback, useRef } from 'react';

import { Fetcher } from '../types/Fetcher';
import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { QueryCache } from '../types/QueryCache';
import { convertKeyToArguments } from '../utils/convertKeyToArguments';
import { QueryKeyMap } from '../utils/QueryKeyMap';

export const useQueryCache = (): QueryCache => {
    const cache = useRef<QueryKeyMap<FetchResult<unknown>>>(new QueryKeyMap());

    const getValue = useCallback(
        <TData, TKey extends Key>(key: TKey, fetcher: Fetcher<TData, TKey>): FetchResult<TData> => {
            if (cache.current.has(key)) {
                return cache.current.get(key) as FetchResult<TData>;
            }

            const promise = (fetcher as (...arguments_: unknown[]) => Promise<TData>)(...convertKeyToArguments(key))
                .then((value) => {
                    cache.current.set(key, {
                        status: 'fulfilled',
                        value,
                    });

                    return value;
                })
                .catch((error) => {
                    cache.current.set(key, {
                        status: 'rejected',
                        reason: error,
                    });

                    return error;
                });

            return {
                status: 'pending',
                promise,
            };
        },
        [],
    );

    return {
        getValue,
    };
};
