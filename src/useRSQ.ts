import { useRSQContext } from './hooks/useRSQContext';

export const useRSQ = <Data>(
    key: string,
    fetcher: (key: string) => Promise<Data>
) => {
    const { fetchValue } = useRSQContext();
    const value = fetchValue(key, fetcher);

    if (value.type === 'pending') {
        throw value.payload;
    }

    return value.payload;
};
