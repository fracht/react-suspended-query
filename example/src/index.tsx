import { createRoot } from 'react-dom/client';
import { QueryCacheProvider, createCacheGroup } from 'react-suspended-query';
import { App } from './App';

const container = document.querySelector('#root');

const root = createRoot(container as HTMLElement);

export const globalCache = createCacheGroup();

root.render(
    <QueryCacheProvider cacheGroup={globalCache}>
        <App />
    </QueryCacheProvider>,
);
