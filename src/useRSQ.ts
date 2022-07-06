import { useEffect, useRef } from 'react';

import { useRSQContext } from './hooks/useRSQContext';
import { Fetcher } from './types/Fetcher';
import { Key } from './types/Key';

export const useRSQ = <Data, RSQKey extends Key>(
    key: RSQKey,
    fetcher: Fetcher<Data, RSQKey>
): Data => {
    const { fetchValue } = useRSQContext();
    const value = fetchValue<Data, RSQKey>(key, fetcher);

    if (value.type === 'pending') {
        throw value.payload;
    }

    return value.payload;
};
