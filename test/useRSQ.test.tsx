import { render, waitFor } from '@testing-library/react';
import { Suspense } from 'react';

import { RSQContextProvider, useRSQ } from '../src';

const FETCH_DELAY = 200;

const createMockFetcher = () =>
    jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY));

        return 'Data';
    });

describe('useRSQ', () => {
    it('should show loading indicator when fetching and render component after fetch', async () => {
        const TestComponent = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
            const data = useRSQ('/my/api/url', fetcher);

            return <div>{data}</div>;
        };

        const mockFetcher = createMockFetcher();

        const { getByText } = render(<TestComponent fetcher={mockFetcher} />, {
            wrapper: ({ children }) => (
                <RSQContextProvider>
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </RSQContextProvider>
            ),
        });

        expect(getByText('Loading...')).toBeDefined();

        await waitFor(() => getByText('Data'));

        expect(getByText('Data')).toBeDefined();
    });

    // It('should refetch data on mount', async () => {
    //     Const TestComponent = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
    //         Const data = useRSQ('/my/api/url', fetcher);

    //         UseEffect(() => {
    //             Console.log('Mount');
    //             Return () => {
    //                 Console.log('Unmount');
    //             };
    //         }, []);

    //         Return <div>{data}</div>;
    //     };

    //     Const App = ({ fetcher }: { fetcher: jest.Mock<Promise<string>> }) => {
    //         Const [state, setState] = useState(true);

    //         Return (
    //             <React.Fragment>
    //                 {state && <TestComponent fetcher={fetcher} />}
    //                 <button
    //                     OnClick={() => {
    //                         SetState((old) => !old);
    //                     }}
    //                 >
    //                     Toggle
    //                 </button>
    //             </React.Fragment>
    //         );
    //     };

    //     Const mockFetcher = createMockFetcher();

    //     Const { getByText } = render(<App fetcher={mockFetcher} />, {
    //         Wrapper: ({ children }) => (
    //             <RSQContextProvider>
    //                 <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    //             </RSQContextProvider>
    //         ),
    //     });

    //     Await waitFor(() => getByText('Data'));

    //     FireEvent.click(getByText('toggle'));
    //     FireEvent.click(getByText('toggle'));

    //     // TODO implement revalidateOnMount functionality
    //     Expect(mockFetcher).toBeCalledTimes(2);
    // });
});
