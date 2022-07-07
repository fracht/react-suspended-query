import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { PropsWithChildren, Suspense, useState } from 'react';

import { createCacheGroup, RSQContextProvider, useRSQ } from '../src';
import { CacheGroup } from '../src/types/CacheGroup';

const FETCH_DELAY = 100;

const createMockFetcher = () =>
    jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY));

        return 'Data';
    });

const TestComponent = ({ fetcher, cacheGroup }: { fetcher: jest.Mock<Promise<string>>; cacheGroup: CacheGroup }) => {
    const data = useRSQ('/my/api/url', fetcher, cacheGroup);

    return <div>{data}</div>;
};

const EmptyWrapper = ({ children }: PropsWithChildren<{ cacheGroup: CacheGroup }>) => {
    return <React.Fragment>{children}</React.Fragment>;
};

const App = ({
    fetcher,
    cacheGroup,
    localCache,
}: {
    fetcher: jest.Mock<Promise<string>>;
    cacheGroup: CacheGroup;
    localCache?: boolean;
}) => {
    const [state, setState] = useState(true);

    const LocalWrapper = localCache ? RSQContextProvider : EmptyWrapper;

    return (
        <RSQContextProvider cacheGroup={cacheGroup}>
            {state && (
                <LocalWrapper cacheGroup={cacheGroup}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TestComponent fetcher={fetcher} cacheGroup={cacheGroup} />
                    </Suspense>
                </LocalWrapper>
            )}

            <button
                onClick={() => {
                    setState((old) => !old);
                }}
            >
                toggle
            </button>
        </RSQContextProvider>
    );
};

describe('useRSQ', () => {
    it('should show loading indicator when fetching and render component after fetch', async () => {
        const cacheGroup = createCacheGroup();

        const mockFetcher = createMockFetcher();

        const { getByText } = render(<TestComponent fetcher={mockFetcher} cacheGroup={cacheGroup} />, {
            wrapper: ({ children }) => (
                <RSQContextProvider cacheGroup={cacheGroup}>
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </RSQContextProvider>
            ),
        });

        expect(getByText('Loading...')).toBeDefined();

        await waitFor(() => getByText('Data'));

        expect(getByText('Data')).toBeDefined();
    });

    it('should refetch local cache data on mount', async () => {
        const cacheGroup = createCacheGroup();
        const mockFetcher = createMockFetcher();

        const { getByText } = render(<App fetcher={mockFetcher} cacheGroup={cacheGroup} localCache />);

        await waitFor(() => getByText('Data'));

        fireEvent.click(getByText('toggle'));
        fireEvent.click(getByText('toggle'));

        expect(mockFetcher).toBeCalledTimes(2);
    });

    it('should not refetch global cache data', async () => {
        const cacheGroup = createCacheGroup();
        const mockFetcher = createMockFetcher();

        const { getByText } = render(<App fetcher={mockFetcher} cacheGroup={cacheGroup} />);

        await waitFor(() => getByText('Data'));

        fireEvent.click(getByText('toggle'));
        fireEvent.click(getByText('toggle'));

        expect(mockFetcher).toBeCalledTimes(1);
    });
});
