type PromisePendingResult = {
    status: 'pending';
    promise: Promise<unknown>;
};

export type FetchResult<TData> = PromiseSettledResult<TData> | PromisePendingResult;
