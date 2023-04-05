/* eslint-disable @typescript-eslint/naming-convention */
import { SafeContext } from '@sirse-dev/safe-context';
import React, { PropsWithChildren } from 'react';
import { QueryCacheBag } from './QueryCacheBag';
import { QueryStore } from './QueryStore';

export type CacheGroup = {
    Provider: React.ComponentType<PropsWithChildren<{ customStore?: QueryStore }>>;
    CacheContext: SafeContext<QueryCacheBag>;
};
