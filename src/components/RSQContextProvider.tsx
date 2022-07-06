import React, { PropsWithChildren } from 'react';

import { useRSQController } from '../hooks/useRSQController';
import { CacheGroup } from '../types/CacheGroup';

export type RSQContextProviderProps = PropsWithChildren<{
    cacheGroup: CacheGroup;
}>;

export const RSQContextProvider = ({ children, cacheGroup }: RSQContextProviderProps) => {
    const value = useRSQController();

    return <cacheGroup.Provider value={value}>{children}</cacheGroup.Provider>;
};
