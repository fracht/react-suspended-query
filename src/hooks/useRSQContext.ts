import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { RSQContext } from '../RSQContext';

export const useRSQContext = () => {
    const context = useContext(RSQContext);

    invariant(context, 'Your App must be wrapped with RSQContextProvider');

    return context;
};
