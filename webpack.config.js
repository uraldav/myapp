const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const StylelintPlugin = require('stylelint-webpack-plugin');

const context = resolve(__dirname, 'app');

const cssScopedNamePattern = '[path][name]-[local]___[hash:base64:8]';

const config = {
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  context,
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    'isomorphic-fetch',
    './index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    hotOnly: true,
    open: true,
    quiet: false,
    noInfo: false,
    publicPath: '/',
    contentBase: resolve(__dirname, 'build'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
      },
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'app'),
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'react-css-modules',
                  {
                    context,
                    generateScopedName: cssScopedNamePattern,
                    filetypes: {
                      '.less': {
                        syntax: 'postcss-less',
                      },
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: cssScopedNamePattern,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              paths: [resolve(__dirname, 'node_modules')],
            },
          },
        ],
      },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  plugins: [
    new StylelintPlugin({
      files: ['**/*.less'],
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        },
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.ContextReplacementPlugin(/\.\/locale$/, null, false, /js$/),
  ],
};

module.exports = config;
