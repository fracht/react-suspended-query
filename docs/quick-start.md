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
                <Suspense fallback={<FallbackComponent />}>// Your app code</Suspense>
            </ErrorBoundary>
        </CacheGroup.Provider>
    );
};
```

-   `CacheGroup.Provider` stores fetch results in a context. You can wrap entire App to make globally available cache or wrap only part of your App to make local cache. You are not limited to the number of `CacheGroup` providers in your App.

-   `ErrorBoundary` - if an error has occurred while fetching data, you need to use error boundary to render appropriate UI. See [official documentation](https://beta.reactjs.org/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

-   `Suspense` - component to render `fallback` when data is being fetched. See [official documentation](https://beta.reactjs.org/reference/react/Suspense).

It is not mandatory to wrap an entire App with these components - you can create the `loading` and `error` rendering logic for each component independently.

Then you can use `useQuery` hook in a component to fetch data. For example:

```jsx
const MyComponent = () => {
    const data = useQuery('https://some-url/data', fetcher, CacheGroup);

    return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
```

Now you are ready to go! 🎉
