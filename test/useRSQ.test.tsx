import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { Suspense, useState } from 'react';

import { createCacheGroup, RSQContextProvider, useRSQ } from '../src';

const FETCH_DELAY = 100;

const createMockFetcher = () =>
    jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY));

        return 'Data';
    });

describe('useRSQ', () => {
    it('should show loading indicator when fetching and render component after fetch', async () => {
        const cacheGroup = createCacheGroup();

        const TestComponent = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
            const data = useRSQ('/my/api/url', fetcher, cacheGroup);

            return <div>{data}</div>;
        };

        const mockFetcher = createMockFetcher();

        const { getByText } = render(<TestComponent fetcher={mockFetcher} />, {
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

    it('should refetch data on mount', async () => {
        const cacheGroup = createCacheGroup();

        const TestComponent = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
            const data = useRSQ('/my/api/url', fetcher, cacheGroup);

            return <div>{data}</div>;
        };

        const App = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
            const [state, setState] = useState(true);

            return (
                <React.Fragment>
                    {state && (
                        <RSQContextProvider cacheGroup={cacheGroup}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <TestComponent fetcher={fetcher} />
                            </Suspense>
                        </RSQContextProvider>
                    )}

                    <button
                        onClick={() => {
                            setState((old) => !old);
                        }}
                    >
                        toggle
                    </button>
                </React.Fragment>
            );
        };

        const mockFetcher = createMockFetcher();

        const { getByText } = render(<App fetcher={mockFetcher} />);

        await waitFor(() => getByText('Data'));

        fireEvent.click(getByText('toggle'));
        fireEvent.click(getByText('toggle'));

        expect(mockFetcher).toBeCalledTimes(2);
    });
});
