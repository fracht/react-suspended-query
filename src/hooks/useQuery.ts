import { useSafeContext } from '@sirse-dev/safe-context';
import { CacheGroup } from '../types/CacheGroup';
import { Fetcher } from '../types/Fetcher';
import { Key } from '../types/Key';

export const useQuery = <TData, TKey extends Key>(
    key: TKey,
    fetcher: Fetcher<TData, TKey>,
    cacheGroup: CacheGroup,
): TData => {
    const { getValue } = useSafeContext(cacheGroup.CacheContext);
    const fetchResult = getValue<TData, TKey>(key, fetcher);

    if (fetchResult.status === 'pending') {
        throw fetchResult.promise;
    }

    if (fetchResult.status === 'rejected') {
        throw fetchResult.reason;
    }

    return fetchResult.value as TData;
};
