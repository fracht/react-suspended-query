import { createSafeContext } from '@sirse-dev/safe-context';
import React from 'react';
import { CacheGroup } from './CacheGroup';
import { useQueryCache } from './hooks/useQueryCache';
import { QueryCacheBag } from './QueryCacheBag';

export const createCacheGroup = (): CacheGroup => {
    const CacheContext = createSafeContext<QueryCacheBag>();

    return {
        CacheContext,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Provider: ({ children, customStore }) => {
            const cacheController = useQueryCache(customStore);

            return <CacheContext.Provider value={cacheController}>{children}</CacheContext.Provider>;
        },
    };
};
