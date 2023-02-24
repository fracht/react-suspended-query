/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
    title: 'React suspended query',
    description: 'React fetching library that uses Suspense API.',
    themeConfig: {
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/fracht/react-suspended-query',
            },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023 Aleksandras Šukelovič',
        },
        sidebar: [
            {
                text: 'Guide',
                items: [{ text: 'Quick start', link: '/quick-start' }],
            },
        ],
    },
};

export default config;
