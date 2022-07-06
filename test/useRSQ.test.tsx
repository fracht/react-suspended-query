import React, { Suspense, useEffect, useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { RSQContextProvider, useRSQ } from '../src';

const FETCH_DELAY = 200;

const createMockFetcher = () =>
    jest.fn(async () => {
        await new Promise((res) => setTimeout(res, FETCH_DELAY));

        return 'Data';
    });

describe('useRSQ', () => {
    it('should show loading indicator when fetching and render component after fetch', async () => {
        const TestComponent = ({
            fetcher,
        }: {
            fetcher: jest.Mock<Promise<string>>;
        }) => {
            const data = useRSQ('/my/api/url', fetcher);

            return <div>{data}</div>;
        };

        const mockFetcher = createMockFetcher();

        const { getByText } = render(<TestComponent fetcher={mockFetcher} />, {
            wrapper: ({ children }) => (
                <RSQContextProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </RSQContextProvider>
            ),
        });

        expect(getByText('Loading...')).toBeDefined();

        await waitFor(() => getByText('Data'));

        expect(getByText('Data')).toBeDefined();
    });

    it('should refetch data on mount', async () => {
        const TestComponent = ({
            fetcher,
        }: {
            fetcher: jest.Mock<Promise<string>>;
        }) => {
            const data = useRSQ('/my/api/url', fetcher);

            useEffect(() => {
                console.log('Mount');
                return () => {
                    console.log('Unmount');
                };
            }, []);

            return <div>{data}</div>;
        };

        const App = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
            const [state, setState] = useState(true);

            return (
                <React.Fragment>
                    {state && <TestComponent fetcher={fetcher} />}
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

        const { getByText } = render(<App fetcher={mockFetcher} />, {
            wrapper: ({ children }) => (
                <RSQContextProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </RSQContextProvider>
            ),
        });

        await waitFor(() => getByText('Data'));

        fireEvent.click(getByText('toggle'));
        fireEvent.click(getByText('toggle'));

        // TODO implement revalidateOnMount functionality
        expect(mockFetcher).toBeCalledTimes(2);
    });
});
