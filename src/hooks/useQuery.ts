import { useSafeContext } from '@sirse-dev/safe-context';
import { CacheGroup } from '../types/CacheGroup';
import { Fetcher } from '../types/Fetcher';
import { Key } from '../types/Key';

export const useQuery = <Data, RSQKey extends Key>(
    key: RSQKey,
    fetcher: Fetcher<Data, RSQKey>,
    cacheGroup: CacheGroup,
): Data => {
    const { getValue } = useSafeContext(cacheGroup);
    const value = getValue<Data, RSQKey>(key, fetcher);

    if (value.type === 'pending') {
        throw value.payload;
    }

    return value.payload;
};
