import { createSafeContext } from '@sirse-dev/safe-context';

import { Fetcher } from './types/Fetcher';
import { FetcherResponse } from './types/FetcherResponse';
import { Key } from './types/Key';

export type RSQContextType = {
    fetchValue: <Data, RSQKey extends Key>(
        key: RSQKey,
        fetcher: Fetcher<Data, RSQKey>
    ) => FetcherResponse<Data>;
};

export const RSQContext = createSafeContext<RSQContextType>();
