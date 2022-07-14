var nodeResolve = require('@esbuild-plugins/node-resolve').default;

/** @type {import('esbuild').Plugin} */
var excludeCrypto = {
    name: 'exclude-crypto',
    setup: (build) => {
        build.onResolve({ filter: /crypto/ }, (arguments_) => ({
            path: arguments_.path,
            namespace: 'crypto',
        }));

        build.onLoad({ filter: /crypto/, namespace: 'crypto' }, () => ({
            contents: JSON.stringify({}),
            loader: 'json',
        }));
    },
};

var nodeResolveExternal = nodeResolve({
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.cjs', '.mjs'],
    onResolved: (resolved) => {
        if (resolved.includes('object-hash')) {
            return resolved;
        }

        if (resolved.includes('node_modules')) {
            return {
                external: true,
            };
        }
        return resolved;
    },
});

module.exports = {
    buildOptions: {
        plugins: [nodeResolveExternal, excludeCrypto],
    },
    dtsBundleGeneratorOptions: {
        libraries: {
            importedLibraries: ['react', '@sirse-dev/safe-context'],
            allowedTypesLibraries: [],
        },
    },
};
