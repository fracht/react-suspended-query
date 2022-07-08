import { useCallback, useRef } from 'react';

import { Fetcher } from '../types/Fetcher';
import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { QueryCache } from '../types/QueryCache';
import { convertKeyToArguments } from '../utils/convertKeyToArguments';
import { QueryKeyMap } from '../utils/QueryKeyMap';

export const useQueryCache = (): QueryCache => {
    const cache = useRef<QueryKeyMap<unknown>>(new QueryKeyMap());

    const getValue = useCallback(
        <Data, QueryKey extends Key>(key: QueryKey, fetcher: Fetcher<Data, QueryKey>): FetchResult<Data> => {
            if (cache.current.has(key)) {
                return {
                    type: 'resolved',
                    payload: cache.current.get(key) as Data,
                };
            }

            const promise = (fetcher as (...arguments_: unknown[]) => Promise<Data>)(
                ...convertKeyToArguments(key),
            ).then((value) => {
                cache.current.set(key, value);
                return value;
            });

            return {
                type: 'pending',
                payload: promise,
            };
        },
        [],
    );

    return {
        getValue,
    };
};
