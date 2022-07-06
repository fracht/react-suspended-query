import { PropsWithChildren } from 'react';

import { useRSQController } from '../hooks/useRSQController';
import { CacheGroup } from '../types/CacheGroup';

export type RSQContextProviderProps = PropsWithChildren<{
    cacheGroup: CacheGroup;
}>;

export const RSQContextProvider = ({ children, cacheGroup }: RSQContextProviderProps) => {
    const value = useRSQController();

    return <cacheGroup.context.Provider value={value}>{children}</cacheGroup.context.Provider>;
};
