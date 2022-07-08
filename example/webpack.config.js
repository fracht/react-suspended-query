const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** @type {import('webpack').Configuration} */
const configuration = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.esm.js', '...'],
        alias: {
            react: path.resolve(__dirname, 'node_modules', 'react'),
        },
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    devServer: {
        port: 8000,
        client: {
            logging: 'error',
            progress: true,
        },
    },
};

module.exports = configuration;
