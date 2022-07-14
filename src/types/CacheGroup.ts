/* eslint-disable @typescript-eslint/naming-convention */
import { SafeContext } from '@sirse-dev/safe-context';
import React, { PropsWithChildren } from 'react';
import { QueryCache } from './QueryCache';

export type CacheGroup = {
    Provider: React.ComponentType<PropsWithChildren<{}>>;
    CacheContext: SafeContext<QueryCache>;
};
