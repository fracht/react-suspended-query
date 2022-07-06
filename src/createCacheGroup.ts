import { createContext } from 'react';
import { CacheGroup } from './types/CacheGroup';
import { RSQContextType } from './types/RSQContextType';

export const createCacheGroup = (): CacheGroup => {
    const context = createContext<RSQContextType | undefined>(undefined);

    return {
        context,
        id: Symbol(),
    };
};
