import { useRSQContext } from './hooks/useRSQContext';
import { Fetcher } from './types/Fetcher';
import { Key } from './types/Key';

export const useRSQ = <Data, RSQKey extends Key>(
    key: RSQKey,
    fetcher: Fetcher<Data, RSQKey>
) => {
    const { fetchValue } = useRSQContext();
    const value = fetchValue(key, fetcher);

    if (value.type === 'pending') {
        throw value.payload;
    }

    return value.payload;
};
