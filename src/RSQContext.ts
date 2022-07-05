import { createSafeContext } from '@sirse-dev/safe-context';

import { Fetcher } from './types/Fetcher';
import { FetchResult } from './types/FetchResult';
import { Key } from './types/Key';

export type RSQContextType = {
    fetchValue: <Data, RSQKey extends Key>(
        key: RSQKey,
        fetcher: Fetcher<Data, RSQKey>
    ) => FetchResult<Data>;
};

export const RSQContext = createSafeContext<RSQContextType>();
