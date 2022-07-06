import { useCallback, useRef } from 'react';

import { RSQContextType } from '../RSQContext';
import { Arguments } from '../types/Arguments';
import { Fetcher } from '../types/Fetcher';
import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { UnionToIntersection } from '../types/UnionToIntersection';
import { RSQKeyMap } from '../utils/RSQKeyMap';

const normalizeArguments = (key: Key) => {
    const normalizedArguments: Arguments = typeof key === 'function' ? key() : key;
    return (
        Array.isArray(normalizedArguments) ? [...normalizedArguments] : normalizedArguments
    ) as UnionToIntersection<Arguments>;
};

export const useRSQController = (): RSQContextType => {
    const cache = useRef<RSQKeyMap<unknown>>(new RSQKeyMap());
    const hasResolved = useRef<RSQKeyMap<boolean>>(new RSQKeyMap());

    const fetchValue = useCallback(
        <Data, RSQKey extends Key>(key: RSQKey, fetcher: Fetcher<Data, RSQKey>): FetchResult<Data> => {
            if (cache.current.has(key)) {
                return {
                    type: 'resolved',
                    payload: cache.current.get(key) as Data,
                };
            }

            hasResolved.current.set(key, false);
            const promise = fetcher(normalizeArguments(key)).then((value) => {
                cache.current.set(key, value);
                hasResolved.current.set(key, true);
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
        fetchValue,
    };
};
