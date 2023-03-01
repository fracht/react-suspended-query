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

1. Wrap your App with `ErrorBoundary` and `Suspense`. For example:

```jsx
import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const App = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <MyComponent />
            </Suspense>
        </ErrorBoundary>
    );
};
```

-   `ErrorBoundary` - if an error has occurred while fetching data, you need to use error boundary to render appropriate UI. See [official documentation](https://beta.reactjs.org/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

-   `Suspense` - component to render `fallback` when data is being fetched. See [official documentation](https://beta.reactjs.org/reference/react/Suspense).

2. In `MyComponent` use `useQuery` hook to fetch data:

```jsx{2}
import { useQuery } from 'react-suspended-query';

const MyComponent = () => {
    const data = useQuery('https://some-url/data', key => fetch(key).then(res => res.json()));

    return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
```

- In the first argument you provide a string or a tuple of any values that will be passed to the function defined in the next argument.

- In the second argument you provide a function that will fetch data and return a `Promise`.

- There is an optional third argument [CacheGroup](./cache-groups.md). If you do not define it, the results of `useQuery` calls will be cached and saved on global `window` object.

Now you are ready to go! 🎉
