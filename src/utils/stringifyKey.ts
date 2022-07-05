import { Key } from '../types/Key';

type Primitive = boolean | string | number | null | undefined | symbol | bigint;

const isPrimitive = (element: unknown): element is Primitive => {
    return !(typeof element === 'function' || typeof element === 'object');
};

const stringifyElement = (element: unknown) => {
    if (typeof element === 'symbol') {
        throw new Error('Symbols are not supported to be passed in arguments');
    }

    if (isPrimitive(element) || (element as Object)?.constructor === RegExp) {
        return String(element);
    }

    if (Array.isArray(element)) {
    }

    if (element?.constructor === Date) {
    }
};

export const strigifyKey = (key: Key): string => {
    let res = '';

    if (typeof key === 'string') {
        res += key;
    } else {
        for (const element of key) {
            res += stringifyElement(element);
        }
    }

    return res;
};
