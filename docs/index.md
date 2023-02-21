# React suspended query

## What is it?

- React fetching library
- Uses [Suspense API](https://beta.reactjs.org/reference/react/Suspense)
- Has `cache groups` system to cache fetched values
- Inspired by [swr](https://swr.vercel.app/)

## The classic way to fetch data

The standard way of fetching data in React looks like this:

```jsx{2,7,15}
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
        return <ErrorMessage error={error} /> // [!code  focus]
    }

    return <pre>
        {JSON.stringify(data, undefined, 2)}
    </pre>
}
```

As you can see, there is a lot of boilerplate code and it is hard to write components like that.

## The solution with Suspense

In React 18 you can use [Suspense](https://beta.reactjs.org/reference/react/Suspense) to render fallback until component is loading. In addition, you can wrap your component with [ErrorBoundary]() and handle fetch error there.

With these features we can get rid of unnecessary states and conditions that were supposed to handle loading and error states. In addition, value for `data` moves up in a cache.

```jsx
const SomeComponent = () => {
    // Create state for data, error and loading
    const [data, setData] = useState(null) // [!code --:3]
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create useEffect to fetch data
    useEffect(() => { // [!code --:6]
        fetch('https://some-url/data')
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    // Make conditional rendering
    if (loading) { // [!code --:7]
        return <Spinner />
    }

    if (error) {
        return <ErrorMessage error={error} />
    }

    return <pre>
        {JSON.stringify(data, undefined, 2)}
    </pre>
}
```

The resulting code looks minimalist and elegant comparing to the standard way.

```jsx
const CacheGroup = createCacheGroup(); // [!code ++]

const SomeComponent = () => {
    const data = useQuery('https://some-url/data', fetch, CacheGroup); // [!code ++]

    return <pre>
        {JSON.stringify(data, undefined, 2)}
    </pre>
}

const App = () => {
    return <CacheGroup.Provider> // [!code ++]
        <ErrorBoundary> // [!code ++]
            <Suspense fallback={<FallbackComponent />}> // [!code ++]
                <SomeComponent />
            </Suspense> // [!code ++]
        </ErrorBoundary> // [!code ++]
    </CacheGroup.Provider> // [!code ++]
}
```
