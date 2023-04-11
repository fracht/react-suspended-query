export type ValueStore<TData = unknown> = {
    set: (key: string, value: TData) => void;
    get: (key: string) => TData | undefined;
    has: (key: string) => boolean;
    delete: (key: string) => void;
    clear: () => void;
    keys: () => IterableIterator<string>;
};
