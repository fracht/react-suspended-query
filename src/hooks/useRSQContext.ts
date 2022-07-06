import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { CacheGroup } from '../types/CacheGroup';

export const useRSQContext = (cacheGroup: CacheGroup) => {
    const context = useContext(cacheGroup);

    invariant(context, `Wrap your component with RSQContextProvider using cacheGroup ${cacheGroup.displayName}`);

    return context;
};
