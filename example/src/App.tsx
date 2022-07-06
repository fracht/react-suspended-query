import React, { useState } from 'react';
import { MyForm } from './MyForm';

export const App = () => {
    const [state, setState] = useState(true);

    return (
        <React.Fragment>
            {state && <MyForm />}

            <button
                onClick={() => {
                    setState((old) => !old);
                }}
            >
                toggle state
            </button>
        </React.Fragment>
    );
};
