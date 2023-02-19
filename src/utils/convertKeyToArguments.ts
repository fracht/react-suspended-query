import { Key } from '../Key';

export const convertKeyToArguments = (key: Key): unknown[] => {
    return Array.isArray(key) ? key : [key];
};
