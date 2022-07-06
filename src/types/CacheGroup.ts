import { Context } from 'react';
import { RSQContextType } from './RSQContextType';

export type CacheGroup = {
    id: symbol;
    context: Context<RSQContextType | undefined>;
};
