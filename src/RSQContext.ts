import { createContext } from 'react';

import { Fetcher } from './types/Fetcher';
import { FetchResult } from './types/FetchResult';
import { Key } from './types/Key';

export type RSQContextType = {
    fetchValue: <Data, RSQKey extends Key>(
        key: RSQKey,
        fetcher: Fetcher<Data, RSQKey>
    ) => FetchResult<Data>;
};

export const RSQContext = createContext<RSQContextType | undefined>(undefined);
