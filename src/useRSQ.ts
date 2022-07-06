import { useRSQContext } from './hooks/useRSQContext';
import { CacheGroup } from './types/CacheGroup';
import { Fetcher } from './types/Fetcher';
import { Key } from './types/Key';

export const useRSQ = <Data, RSQKey extends Key>(
    key: RSQKey,
    fetcher: Fetcher<Data, RSQKey>,
    cacheGroup: CacheGroup,
): Data => {
    const { fetchValue } = useRSQContext(cacheGroup);
    const value = fetchValue<Data, RSQKey>(key, fetcher);

    if (value.type === 'pending') {
        throw value.payload;
    }

    return value.payload;
};
