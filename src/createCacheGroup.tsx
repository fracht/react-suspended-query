import { createSafeContext } from '@sirse-dev/safe-context';
import React from 'react';
import { useQueryCache } from './hooks/useQueryCache';
import { CacheGroup } from './types/CacheGroup';
import { QueryCacheBag } from './types/QueryCacheBag';
import { QueryStore } from './types/QueryStore';

export const createCacheGroup = (customStore?: QueryStore<unknown>): CacheGroup => {
    const CacheContext = createSafeContext<QueryCacheBag>();

    return {
        CacheContext,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Provider: ({ children }) => {
            const cacheController = useQueryCache(customStore);

            return <CacheContext.Provider value={cacheController}>{children}</CacheContext.Provider>;
        },
    };
};
