import { createSafeContext } from '@sirse-dev/safe-context';
import React from 'react';
import { useQueryCache } from './hooks/useQueryCache';
import { CacheGroup } from './types/CacheGroup';
import { QueryCache } from './types/QueryCache';
import { QueryCacheBag } from './types/QueryCacheBag';

export const createCacheGroup = (customCache?: QueryCache<unknown>): CacheGroup => {
    const CacheContext = createSafeContext<QueryCacheBag>();

    return {
        CacheContext,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Provider: ({ children }) => {
            const cacheController = useQueryCache(customCache);

            return <CacheContext.Provider value={cacheController}>{children}</CacheContext.Provider>;
        },
    };
};
