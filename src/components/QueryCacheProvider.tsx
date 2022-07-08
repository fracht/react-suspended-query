import React, { PropsWithChildren } from 'react';

import { useQueryCache } from '../hooks/useQueryCache';
import { CacheGroup } from '../types/CacheGroup';

export type QueryCacheProviderProps = PropsWithChildren<{
    cacheGroup: CacheGroup;
}>;

export const QueryCacheProvider = ({ children, cacheGroup }: QueryCacheProviderProps) => {
    const value = useQueryCache();

    return <cacheGroup.Provider value={value}>{children}</cacheGroup.Provider>;
};
