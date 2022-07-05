import { useCallback, useRef } from 'react';

import { FetchResult, RSQContextType } from '../RSQContext';

export const useRSQController = (): RSQContextType => {
    const cache = useRef<Map<string, unknown>>(new Map());

    const fetchValue = useCallback(
        <Data>(
            key: string,
            fetcher: (key: string) => Promise<Data>
        ): FetchResult<Data> => {
            if (cache.current.has(key)) {
                return {
                    type: 'resolved',
                    payload: cache.current.get(key) as Data,
                };
            }

            const promise = fetcher(key).then((value) => {
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
