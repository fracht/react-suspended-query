import { Suspense } from 'react';
import { createCacheGroup, useQuery } from 'react-suspended-query';
import { globalCache } from '.';

const localCache = createCacheGroup();

const _MyForm = () => {
    const data = useQuery(
        'api/local',
        async () => {
            console.log('Fetching local data...');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Await new Promise((resolve, reject) => {
            //     Reject('asdf');
            // });
            return 'local data';
        },
        localCache,
    );

    const global = useQuery(
        'api/global',
        async () => {
            console.log('Fetching global data...');
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
