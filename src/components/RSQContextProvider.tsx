import React, { PropsWithChildren } from 'react';

import { useRSQController } from '../hooks/useRSQController';
import { RSQContext } from '../RSQContext';

export const RSQContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const value = useRSQController();

    return <RSQContext.Provider value={value}>{children}</RSQContext.Provider>;
};
