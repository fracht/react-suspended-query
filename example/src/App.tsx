import React, { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { MyForm } from './MyForm';

export const App = () => {
    const [state, setState] = useState(true);

    return (
        <ErrorBoundary fallback={<div>Error has occured</div>}>
            {state && <MyForm />}

            <button
                onClick={() => {
                    setState((old) => !old);
                }}
            >
                toggle state
            </button>
        </ErrorBoundary>
    );
};
