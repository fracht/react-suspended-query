import { useCallback, useRef } from 'react';

import { RSQContextType } from '../RSQContext';
import { Arguments } from '../types/Arguments';
import { Fetcher } from '../types/Fetcher';
import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { UnionToIntersection } from '../types/UnionToIntersection';
import { RSQKeyMap } from '../utils/RSQKeyMap';

const normalizeArguments = (key: Key) => {
    const args: Arguments = typeof key === 'function' ? key() : key;
    return (
        Array.isArray(args) ? [...args] : args
    ) as UnionToIntersection<Arguments>;
};

export const useRSQController = (): RSQContextType => {
    const cache = useRef<RSQKeyMap<unknown>>(new RSQKeyMap());

    const fetchValue = useCallback(
        <Data, RSQKey extends Key>(
            key: RSQKey,
            fetcher: Fetcher<Data, RSQKey>
        ): FetchResult<Data> => {
            if (cache.current.has(key)) {
                return {
                    type: 'resolved',
                    payload: cache.current.get(key) as Data,
                };
            }

            const promise = fetcher(normalizeArguments(key)).then((value) => {
                cache.current.set(key, value);
                return value;
            });

            return {
                type: 'pending',
                payload: promise,
            };
        },
        []
    );

    return {
        fetchValue,
    };
};
