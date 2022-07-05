import { useSafeContext } from '@sirse-dev/safe-context';

import { RSQContext } from '../RSQContext';

export const useRSQContext = () => useSafeContext(RSQContext);
