import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { CacheGroup } from '../types/CacheGroup';

export const useRSQContext = (cacheGroup: CacheGroup) => {
    const context = useContext(cacheGroup.context);

    invariant(
        context,
        `Wrap your component with RSQContextProvider using cacheGroup ${cacheGroup.context.displayName}`,
    );

    return context;
};
