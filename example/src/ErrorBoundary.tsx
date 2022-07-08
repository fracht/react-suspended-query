import React, { Component, PropsWithChildren } from 'react';

export type ErrorBoundaryProps = PropsWithChildren<{
    fallback: React.ReactNode;
}>;

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        const { children, fallback } = this.props;

        if (this.state.hasError) {
            return fallback;
        }

        return children;
    }
}
