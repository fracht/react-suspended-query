import { createRoot } from 'react-dom/client';
import { RSQContextProvider, createCacheGroup } from 'react-suspended-query';
import { App } from './App';

const container = document.querySelector('#root');

const root = createRoot(container as HTMLElement);

export const globalCache = createCacheGroup();

root.render(
    <RSQContextProvider cacheGroup={globalCache}>
        <App />
    </RSQContextProvider>,
);
