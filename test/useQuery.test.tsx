import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React, { Component, Fragment, PropsWithChildren, ReactNode, Suspense, useState } from 'react';

import { createCacheGroup, useQuery } from '../src';
import { CacheGroup } from '../src/CacheGroup';
import '@testing-library/jest-dom';

const TestComponent = ({ fetcher, cacheGroup }: { fetcher: jest.Mock<Promise<string>>; cacheGroup: CacheGroup }) => {
    const data = useQuery('/my/api/url', fetcher, cacheGroup);

    return <div>{data}</div>;
};

const EmptyWrapper = ({ children }: PropsWithChildren<{}>) => {
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

    const LocalWrapper = localCache ? cacheGroup.Provider : EmptyWrapper;

    return (
        <cacheGroup.Provider>
            {state && (
                <LocalWrapper>
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
        </cacheGroup.Provider>
    );
};

class ErrorBoundary extends Component<PropsWithChildren<{ fallback: ReactNode }>, { hasError: boolean }> {
    public constructor(props: PropsWithChildren<{ fallback: ReactNode }>) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    public render(): React.ReactNode {
        const { children, fallback } = this.props;

        if(this.state.hasError) {
            return (
                <Fragment>{fallback}</Fragment>
            )
        }

        return <Fragment>{children}</Fragment>
    }
}

describe('useQuery', () => {
    it('should show loading indicator when fetching and render component after fetch', async () => {
        const cacheGroup = createCacheGroup();

        const mockFetcher = jest.fn().mockResolvedValue('Data');

        const { getByText } = render(<TestComponent fetcher={mockFetcher} cacheGroup={cacheGroup} />, {
            wrapper: ({ children }) => (
                <cacheGroup.Provider>
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </cacheGroup.Provider>
            ),
        });

        expect(getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => getByText('Data'));

        expect(getByText('Data')).toBeInTheDocument();
    });

    it('should refetch local cache data on mount', async () => {
        const cacheGroup = createCacheGroup();
        const mockFetcher = jest.fn().mockResolvedValue('Data');

        const { getByText } = render(<App fetcher={mockFetcher} cacheGroup={cacheGroup} localCache />);

        await waitFor(() => getByText('Data'));

        await act(async () => {
            await fireEvent.click(getByText('toggle'));
        });

        await act(async () => {
            await fireEvent.click(getByText('toggle'));
        });

        expect(mockFetcher).toBeCalledTimes(2);
    });

    it('should not refetch global cache data', async () => {
        const cacheGroup = createCacheGroup();
        const mockFetcher = jest.fn().mockResolvedValue('Data');

        const { getByText } = render(<App fetcher={mockFetcher} cacheGroup={cacheGroup} />);

        await waitFor(() => getByText('Data'));

        await act(async () => {
            await fireEvent.click(getByText('toggle'));
        });

        await act(async () => {
            await fireEvent.click(getByText('toggle'));
        });

        expect(mockFetcher).toBeCalledTimes(1);
    });

    it('should not refetch global cache data', async () => {
        const cacheGroup = createCacheGroup();
        const mockFetcher = jest.fn().mockResolvedValue('Data');

        const { getByText } = render(<App fetcher={mockFetcher} cacheGroup={cacheGroup} />);

        await waitFor(() => getByText('Data'));

        await act(async () => {
            await fireEvent.click(getByText('toggle'));
        });

        await act(async () => {
            await fireEvent.click(getByText('toggle'));
        });

        expect(mockFetcher).toBeCalledTimes(1);
    });

    it('should show error boundary content', async () => {
        const cacheGroup = createCacheGroup();
        const mockFetcher = jest.fn().mockRejectedValue('Data');

        const { getByText } = render(<TestComponent fetcher={mockFetcher} cacheGroup={cacheGroup} />, {
            wrapper: ({ children }) => (
                <cacheGroup.Provider>
                    <ErrorBoundary fallback={<div>Error</div>}>
                        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                    </ErrorBoundary>
                </cacheGroup.Provider>
            ),
        });

        expect(getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => getByText('Error'));

        expect(getByText('Error')).toBeInTheDocument();
    });
});
