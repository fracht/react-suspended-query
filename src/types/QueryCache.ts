import { Key } from './Key';

export type QueryCache<T> = {
    get: (key: Key) => T | undefined | Promise<T>;
    set: (key: Key, value: T) => void | Promise<void>;
    has: (key: Key) => boolean | Promise<boolean>;
};
