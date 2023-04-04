import { Suspense } from 'react';
import { createCacheGroup, useQuery } from 'react-suspended-query';
import { globalCache } from '.';

const localCache = createCacheGroup();

const _MyForm = () => {
    const data = useQuery(
        'api/local',
        async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return 'local data';
        },
        localCache,
    );

    const global = useQuery(
        'api/global',
        async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return 'global data';
        },
        globalCache,
    );

    return (
        <div>
            <div>{data}</div>
            <div>{global}</div>
        </div>
    );
};

export const MyForm = () => {
    return (
        <localCache.Provider>
            <Suspense fallback={<div>Loading...</div>}>
                <_MyForm />
            </Suspense>
        </localCache.Provider>
    );
};
