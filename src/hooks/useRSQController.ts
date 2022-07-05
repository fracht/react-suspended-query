import { useCallback, useRef } from 'react';

import { RSQContextType } from '../RSQContext';
import { Fetcher } from '../types/Fetcher';
import { FetchResult } from '../types/FetchResult';
import { Key } from '../types/Key';
import { RSQKeyMap } from '../utils/RSQKeyMap';

export const useRSQController = (): RSQContextType => {
    const cache = useRef<RSQKeyMap>(new RSQKeyMap());

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

            // TODO fix fetcher type
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
