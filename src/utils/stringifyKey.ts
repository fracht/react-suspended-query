import hash from 'object-hash';
import { Key } from '../types/Key';

export const stringifyKey = (key: Key): string =>
    hash(key, {
        algorithm: 'passthrough',
    });
