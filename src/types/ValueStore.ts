export type ValueStore<TData> = {
    get: (key: string) => { value: TData };
    set: (key: string, value: TData) => void;
    has: (key: string) => boolean;
};
