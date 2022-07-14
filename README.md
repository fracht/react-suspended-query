# react-suspended-query

## Inspiration

This package was inspired by [SWR](https://swr.vercel.app/).


## Installation

```bash
npm i react-suspended-query
```

## What is this

This is a react fetching library based on [React Suspense](https://reactjs.org/docs/react-api.html#reactsuspense).

## The problem

The classic way of fetching data in React looks like this:

```jsx
const SomeComponent = () => {
    // Create state for data, error and loading
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create useEffect to fetch data
    useEffect(() => {
        fetch('https://some-url/data')
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    // Make conditional rendering
    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <ErrorMessage error={error} />
    }

    return <div>
        {data}
    </div>
}
```

As you can see, there is a lot of boilerplate code and it is hard to write components like that.

## The solution with Suspense

In React 18 you can use Suspense for data fetching, but be aware that it is still experimental feature.

New API look like this:

```jsx
const App = () => {

    // Wrap your component with ErrorBoundary to handle error state and Suspense to handle loading state
    // Now we can define the error state of our App in one place as well as loading state
    return <CacheGroup.Provider>
        <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
                <SomeComponent />
            </Suspense>
        </ErrorBoundary>
    <CacheGroup.Provider>
}

const SomeComponent = () => {
    const data = useQuery('https://some-url/data', fetch)

    return <div>
        {data}
    </div>
}
```

See [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper) and [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) from React documentation.

## Cache groups

react-suspended-query provides the possibility to define cache groups. By default, you must wrap your component with `CacheGroup.Provider`, which will cache all fetches in children components. In general, some fetches depend on variables and others are consistent. To handle these cases, you can create multiple cache groups in one App.

## API

### useQuery

#### Calls given fetcher and processes the query:
- When promise is pending - renders Suspense.
- When fetcher throws error - passes it up the component tree.
- When promise resolves - returns data.

#### Arguments:
1. `key` - a string or an array of values fetcher depends on.
2. `fetcher` - function, which accepts your `key` in arguments and returns promise.

#### Example usage:
```jsx
const data = useQuery(['https://some-url/data', id], (key, id) => fetch(`${key}/${id}`))
```

<br/>

### createCacheGroup

#### Used to create cache group provider. Returns CacheGroup.

#### Example usage:
```jsx
const CacheGroup = createCacheGroup()

const App = () => {
    return <CacheGroup.Provider>
        {/* JSX */}
    </CacheGroup.Provider>
}
```
<br/>

## License

The MIT License.
