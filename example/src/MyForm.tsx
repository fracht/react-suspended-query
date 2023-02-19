import { Suspense } from 'react';
import { createCacheGroup, useQuery, QueryStore, ValueStore } from 'react-suspended-query';
import { globalCache } from '.';

const object: Record<string, unknown> = {};

class GlobalQueryStore extends QueryStore {
    protected override resultsStore: ValueStore<unknown> = {
        get: (key: string) => {
            return object[key];
        },
        set: (key, value) => {
            object[key] = value;
        },
        has: (key) => key in object,
    };
}

const localCache = createCacheGroup(new GlobalQueryStore());

const _MyForm = () => {
    const data = useQuery(
        'api/local',
        async () => {
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
