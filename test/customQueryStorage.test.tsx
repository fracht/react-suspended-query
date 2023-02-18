import { render, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import { createCacheGroup, QueryStore, useQuery } from '../src';
import '@testing-library/jest-dom';
import { ValuesStore } from '../src/types/ValueStore';
import { stringifyKey } from '../src/utils/stringifyKey';

const resultsStorage: Record<string, unknown> = {};

const mockSet = jest.fn((key: string, value: unknown) => {
    resultsStorage[key] = value;
});
const mockGet = jest.fn((key: string) => {
    return resultsStorage[key];
});
const mockHas = jest.fn((key: string) => {
    return key in resultsStorage;
});

class GlobalQueryStore extends QueryStore {
    protected override resultsStore: ValuesStore<unknown> = {
        set: mockSet,
        get: mockGet,
        has: mockHas,
    };
}

const CacheGroup = createCacheGroup(new GlobalQueryStore());

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

            expect(resultsStorage[stringifyKey('hello')]).toBe('Data');

            expect(mockSet.mock.calls.length).toBe(1);
            expect(mockSet.mock.calls[0][0]).toBe(stringifyKey('hello'));
            expect(mockSet.mock.calls[0][1]).toBe('Data');

            expect(mockGet.mock.calls.length).toBe(1);
            expect(mockGet.mock.calls[0][0]).toBe(stringifyKey('hello'));
        });
    });
});
