import { createSafeContext } from '@sirse-dev/safe-context';
import React from 'react';
import { useQueryCache } from './hooks/useQueryCache';
import { CacheGroup } from './types/CacheGroup';
import { QueryCache } from './types/QueryCache';

export const createCacheGroup = (): CacheGroup => {
    const CacheContext = createSafeContext<QueryCache>();

    return {
        CacheContext,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Provider: ({ children }) => {
            const cacheController = useQueryCache();

            return <CacheContext.Provider value={cacheController}>{children}</CacheContext.Provider>;
        },
    };
};
