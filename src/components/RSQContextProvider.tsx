import React, { PropsWithChildren, useCallback, useRef } from 'react';

import { RSQContext } from '../RSQContext';
import { Fetcher } from '../types/Fetcher';
import { Key } from '../types/Key';

export const RSQContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const cache = useRef<Record<string, unknown>>({});

    const fetchValue = useCallback(
        <Data, RSQKey extends Key>(
            key: RSQKey,
            fetcher: Fetcher<Data, RSQKey>
        ) => {
            const stringifiedKey = 
        },
        []
    );

    return (
        <RSQContext.Provider
            value={{
                fetchValue,
            }}
        >
            {children}
        </RSQContext.Provider>
    );
};
