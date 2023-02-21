# Quick start

## Installation

- Using `npm`:

```shell
npm i react-suspended-query
```

- Using `pnpm`:

```shell
pnpm add react-suspended-query
```

- Using `yarn`:

```shell
yarn add react-suspended-query
```

## Getting started

Firstly, you need to create a `fetcher` function that must return a `Promise` that will get data from your API.

For example:
```tsx
const fetcher = (...args) => fetch(...args).then(res => res.json());
```

Next, you must create a `CacheGroup` using `createCacheGroup()` function and wrap your App with these components:

```tsx
const CacheGroup = createCacheGroup();

export const App = () => {
    return <CacheGroup.Provider>
        <ErrorBoundary>
            <Suspense fallback={<FallbackComponent />}>
                // Your app code
            </Suspense>
        </ErrorBoundary>
    </CacheGroup.Provider>
}
```

- `CacheGroup.Provider` stores fetch results in a context. You can wrap entire App to make globally available cache or wrap only part of your App to make local cache. You are not limited to the number of `CacheGroup` providers in your App.

- `ErrorBoundary` - if an error has occurred while fetching data, you need to use [error boundary](https://beta.reactjs.org/reference/react/Component#catching-rendering-errors-with-an-error-boundary) to render appropriate UI.

- `Suspense` - component to render `fallback` component when data is being fetched.

It is not mandatory to wrap an entire App with these components - you can create the `loading` and `error` rendering logic for each component independently.

Then you can use `useQuery` hook in a component to fetch data. For example:

```tsx
const MyComponent = () => {
    const data = useQuery('https://some-url/data', fetcher, CacheGroup);

    return <div>
        {data.value}
        // Render your UI using data object directly!
    </div>
}
```

Now you are ready to go! 🎉
