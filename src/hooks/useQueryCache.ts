import { useCallback, useRef } from 'react';

import { Fetcher } from '../Fetcher';
import { FetchResult, PromisePendingResult } from '../FetchResult';
import { Key } from '../Key';
import { QueryCacheBag } from '../QueryCacheBag';
import { QueryStore } from '../QueryStore';
import { convertKeyToArguments } from '../utils/convertKeyToArguments';

export const useQueryCache = (queryStore?: QueryStore): QueryCacheBag => {
    const cache = useRef<QueryStore>(queryStore ?? new QueryStore());

    const getValue = useCallback(<TData, TKey extends Key>(key: TKey, fetcher: Fetcher<TData, TKey>): FetchResult => {
        if (cache.current.has(key)) {
            return cache.current.get(key) as FetchResult;
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

        const pendingFetchResult: PromisePendingResult = {
            status: 'pending',
            promise,
        };

        cache.current.set(key, pendingFetchResult);

        return pendingFetchResult;
    }, []);

    return {
        getValue,
    };
};
