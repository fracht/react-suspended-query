import { Arguments } from '../types/Arguments';
import { Key } from '../types/Key';

export const convertKeyToArguments = (key: Key): unknown[] => {
    const normalizedArguments: Arguments = typeof key === 'function' ? key() : key;
    return Array.isArray(normalizedArguments) ? normalizedArguments : [normalizedArguments];
};
