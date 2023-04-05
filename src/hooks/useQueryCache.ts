import { useCallback, useMemo } from 'react';

import { Fetcher } from '../Fetcher';
import { FetchResult, PromisePendingResult } from '../FetchResult';
import { Key } from '../Key';
import { QueryCacheBag } from '../QueryCacheBag';
import { QueryStore } from '../QueryStore';
import { convertKeyToArguments } from '../utils/convertKeyToArguments';

export const useQueryCache = (queryStore?: QueryStore): QueryCacheBag => {
    const cache = useMemo(() => queryStore ?? new QueryStore(), [queryStore]);

    const getValue = useCallback(
        <TData, TKey extends Key>(key: TKey, fetcher: Fetcher<TData, TKey>): FetchResult => {
            if (cache.has(key)) {
                return cache.get(key) as FetchResult;
            }

            const promise = (fetcher as (...arguments_: unknown[]) => Promise<TData>)(...convertKeyToArguments(key))
                .then((value) => {
                    cache.set(key, {
                        status: 'fulfilled',
                        value,
                    });

                    return value;
                })
                .catch((error) => {
                    cache.set(key, {
                        status: 'rejected',
                        reason: error,
                    });

                    return error;
                });

            const pendingFetchResult: PromisePendingResult = {
                status: 'pending',
                promise,
            };

            cache.set(key, pendingFetchResult);

            return pendingFetchResult;
        },
        [cache],
    );

    return {
        getValue,
    };
};
