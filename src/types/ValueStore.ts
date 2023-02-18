export type ValuesStore<TData> = {
    get: (key: string) => TData | undefined;
    set: (key: string, value: TData) => void;
    has: (key: string) => boolean;
};
