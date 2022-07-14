import { createSafeContext } from '@sirse-dev/safe-context';
import { CacheGroup } from './types/CacheGroup';
import { QueryCache } from './types/QueryCache';

export const createCacheGroup = (): CacheGroup => {
    const context = createSafeContext<QueryCache>();

    return context;
};
