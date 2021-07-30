const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env) => {
  const mode = env.mode || 'prod';
  return {
    mode: mode === 'dev' ? 'development' : 'production',
    entry: {
      background: `${__dirname}/src/background/index.ts`,
      content: `${__dirname}/src/content/index.tsx`,
    },
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(?:ico|gif|png|svg|jpg|jpeg|woff2)$/i,
          loader: 'url-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin({})],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './manifest.json',
            force: true,
          },
          {
            from: './src/cupcake_icon.png',
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
};
