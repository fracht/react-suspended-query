export type PromisePendingResult = {
    status: 'pending';
    promise: Promise<unknown>;
};

export type FetchResult = PromiseSettledResult<unknown> | PromisePendingResult;
