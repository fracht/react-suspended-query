export type ValueStore<TData> = {
    get: (key: string) => TData;
    set: (key: string, value: TData) => void;
    has: (key: string) => boolean;
};
