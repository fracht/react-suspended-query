type Resolved<Data> = {
    type: 'resolved';
    payload: Data;
};

type Pending<Data> = {
    type: 'pending';
    payload: Promise<Data>;
};

export type FetchResult<Data> = Resolved<Data> | Pending<Data>;
