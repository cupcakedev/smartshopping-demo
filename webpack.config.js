const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const ExtReloader = require('webpack-ext-reloader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const productionConfig = {
    mode: 'production',
    entry: {
        background: `${__dirname}/src/pages/background/index.ts`,
        content: `${__dirname}/src/pages/content/index.tsx`,
        popup: `${__dirname}/src/pages/popup/index.tsx`,
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eo)$/,
                loader: 'url-loader',
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [
            new TsconfigPathsPlugin({
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            }),
        ],
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },
    plugins: [
        new EnvironmentPlugin(['EXTENSION_NAME_PREFIX']),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/manifest.json',
                    force: true,
                },
                {
                    context: './src/assets/images',
                    from: '*.png',
                    to: 'images',
                    force: true,
                },
                {
                    from: './src/pages/popup/popup.html',
                    force: true,
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};

const devConfig = {
    mode: 'development',
    plugins: [new BundleAnalyzerPlugin()],
};

module.exports = (env) => {
    if (env.development) {
        return merge(productionConfig, devConfig);
    }
    return productionConfig;
};
