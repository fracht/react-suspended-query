# Quick start

## Installation

-   Using `npm`:

```shell
npm i react-suspended-query
```

-   Using `pnpm`:

```shell
pnpm add react-suspended-query
```

-   Using `yarn`:

```shell
yarn add react-suspended-query
```

## Getting started

Firstly, you need to create a `fetcher` function that must return a `Promise` that will get data from your API.

For example:

```jsx
const fetcher = (...args) => fetch(...args).then((res) => res.json());
```

Next, you must create a `CacheGroup` using `createCacheGroup()` function and wrap your App with these components:

```jsx
const CacheGroup = createCacheGroup();

export const App = () => {
    return (
        <CacheGroup.Provider>
            <ErrorBoundary>
                <Suspense fallback={<FallbackComponent />}>
                    // Your app code
                </Suspense>
            </ErrorBoundary>
        </CacheGroup.Provider>
    );
};
```

-   `CacheGroup.Provider` stores fetch results in a context. You can wrap entire App to make globally available cache or wrap only part of your App to make local cache. You are not limited to the number of `CacheGroup` providers.

-   `ErrorBoundary` - if an error has occurred while fetching data, you need to use error boundary to render appropriate UI. See [official documentation](https://beta.reactjs.org/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

-   `Suspense` - component to render `fallback` when data is being fetched. See [official documentation](https://beta.reactjs.org/reference/react/Suspense).

It is not mandatory to wrap an entire App with these components - you can create the `loading` and `error` rendering logic for each component independently.

## Fetch static resource

If you need to fetch some static resource that do not depend on any dynamic data, you can use `useQuery` like this:

```jsx{2}
const MyComponent = () => {
    const data = useQuery('https://some-url/static', fetcher, CacheGroup);

    return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
```

Or, you can pass an array in a first argument that will be passed to the fetcher:

```jsx{2}
const MyComponent = () => {
    const data = useQuery(['https://some-url/static', ...], fetcher, CacheGroup);

    return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
```

## Fetch dynamic data

If you need to fetch data that depends on some dynamic value (for example, current user id), you can use `useQuery` as follows:

```jsx{2}
const MyComponent = ({ userId }) => {
    const data = useQuery(`https://some-url/data?id=${userId}`, fetcher, CacheGroup);

    return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
```

Now every time the `userId` changes, fetcher will be invoked and cache updated automatically!

Now you are ready to get started! 🎉
