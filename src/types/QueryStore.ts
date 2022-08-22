export type QueryStore = {
    get: <T>(key: string) => T | undefined;
    set: <T>(key: string, value: T) => void;
    has: (key: string) => boolean;
};
