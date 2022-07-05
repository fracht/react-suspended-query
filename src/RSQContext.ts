import { createSafeContext } from '@sirse-dev/safe-context';

type Resolved<Data> = {
    type: 'resolved';
    payload: Data;
};

type Pending<Data> = {
    type: 'pending';
    payload: Promise<Data>;
};

export type FetchResult<Data> = Resolved<Data> | Pending<Data>;

export type RSQContextType = {
    fetchValue: <Data>(
        key: string,
        fetcher: (key: string) => Promise<Data>
    ) => FetchResult<Data>;
};

export const RSQContext = createSafeContext<RSQContextType>();
