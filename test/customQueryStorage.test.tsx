import { render, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import { createCacheGroup, QueryStore, useQuery, ValueStore } from '../src';
import '@testing-library/jest-dom';
import { stringifyKey } from '../src/utils/stringifyKey';

class GlobalQueryStore extends QueryStore {
    public constructor(private mockSet: jest.Mock, private mockGet: jest.Mock, private mockHas: jest.Mock) {
        super();
    }

    protected override resultsStore: ValueStore = {
        set: this.mockSet,
        get: this.mockGet,
        has: this.mockHas,
        delete: jest.fn(),
        clear: jest.fn(),
    };
}

const createCustomStore = (set: jest.Mock, get: jest.Mock, has: jest.Mock) => {
    return new GlobalQueryStore(set, get, has);
};

const createDefaultCustomStore = (
    resultsStorage: Record<string, unknown>,
): [GlobalQueryStore, jest.Mock, jest.Mock, jest.Mock] => {
    const set = jest.fn((key: string, value: unknown) => {
        resultsStorage[key] = value;
    });
    const get = jest.fn((key: string) => {
        return resultsStorage[key];
    });
    const has = jest.fn((key: string) => {
        return key in resultsStorage;
    });

    const store = createCustomStore(set, get, has);

    return [store, set, get, has];
};

const CacheGroup = createCacheGroup();

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

        const resultsStorage: Record<string, unknown> = {};

        const [store, set, get] = createDefaultCustomStore(resultsStorage);

        const { getByText } = render(<TestComponent fetcher={mockFetcher} />, {
            wrapper: ({ children }) => (
                <CacheGroup.Provider customStore={store}>
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </CacheGroup.Provider>
            ),
        });

        expect(getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText('Data')).toBeInTheDocument();

            expect(set).toBeCalledTimes(1);
            expect(set.mock.calls[0][0]).toBe(stringifyKey('hello'));
            expect(set.mock.calls[0][1]).toBe('Data');

            expect(get).toBeCalledTimes(1);
            expect(get.mock.calls[0][0]).toBe(stringifyKey('hello'));
        });
    });

    it.only('should change query storage when it changes in CacheGroup.Provider props', async () => {
        const mockFetcher = jest.fn(() => {
            return new Promise<string>((resolve) => setTimeout(() => resolve('Data'), 100));
        });

        const TestComponentDisplay = ({ store }: { store: QueryStore }) => {
            return (
                <CacheGroup.Provider customStore={store}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TestComponent fetcher={mockFetcher} />
                    </Suspense>
                </CacheGroup.Provider>
            );
        };

        const firstStorage: Record<string, unknown> = {};
        const [firstStore, firstSet, firstGet] = createDefaultCustomStore(firstStorage);

        const { rerender, getByText } = render(<TestComponentDisplay store={firstStore} />);

        await waitFor(() => {
            expect(getByText('Data')).toBeInTheDocument();
        });

        const secondStorage: Record<string, unknown> = {};
        const [secondStore, secondSet, secondGet] = createDefaultCustomStore(secondStorage);

        rerender(<TestComponentDisplay store={secondStore} />);

        expect(getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText('Data')).toBeInTheDocument();

            expect(firstSet).toBeCalledTimes(1);
            expect(secondSet).toBeCalledTimes(1);

            expect(firstGet).toBeCalledTimes(1);
            expect(secondGet).toBeCalledTimes(1);
        });
    });
});
