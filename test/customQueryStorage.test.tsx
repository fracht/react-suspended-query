import { render, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import { createCacheGroup, QueryStore, useQuery } from '../src';
import { FetchResult } from '../src/types/FetchResult';
import '@testing-library/jest-dom';

const object: Record<string, FetchResult<unknown>> = {};

const globalQueryStore: QueryStore<unknown> = {
    get: (key: string) => {
        return object[key];
    },
    set: (key, value) => {
        object[key] = value;
    },
    has: (key) => key in object,
};

const CacheGroup = createCacheGroup(globalQueryStore);

type TestComponentProps = {
    fetcher: () => Promise<string>;
};

const TestComponent = ({ fetcher }: TestComponentProps) => {
    const data = useQuery('hello', fetcher, CacheGroup);

    return <div>{data}</div>;
};

describe('Possibility to provide custom query storage', () => {
    it('should call functions from custom query storage', async () => {
        const mockFetcher = jest.fn(() => {
            return new Promise<string>((resolve) => setTimeout(() => resolve('Data'), 100));
        });

        const { getByText } = render(<TestComponent fetcher={mockFetcher} />, {
            wrapper: ({ children }) => (
                <CacheGroup.Provider>
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </CacheGroup.Provider>
            ),
        });

        expect(getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText('Data')).toBeInTheDocument();
        });
    });
});
