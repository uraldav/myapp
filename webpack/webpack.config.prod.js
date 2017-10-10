const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

const rootPath = resolve(__dirname, '..');

const cssScopedNamePattern = '[hash:base64:16]';

const config = (env) => {
  const context = resolve(rootPath, `app-${env.app}`);

  return {
    target: 'web',
    devtool: 'hidden-source-map',
    context,
    resolve: {
      extensions: ['.js', '.jsx'],
      mainFields: ['browser', 'jsnext:main', 'main'],
      alias: {
        moment: 'moment/moment.js',
        'app-common': resolve(rootPath, 'app-common'),
      },
    },
    entry: ['babel-polyfill', './index.jsx'],
    output: {
      filename: 'bundle.js',
      path: resolve(rootPath, 'build', env.app, 'assets'),
      publicPath: '/assets/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
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
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less/,
          use: [
            { loader: 'style-loader', options: { sourceMap: false } },
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                modules: true,
                importLoaders: 1,
                localIdentName: cssScopedNamePattern,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: [autoprefixer],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
                paths: [resolve(rootPath, 'node_modules')],
              },
            },
          ],
        },
        { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
        { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/octet-stream',
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=image/svg+xml',
        },
      ],
    },
    plugins: [
      new UglifyJSPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.IgnorePlugin(/^moment\/locale\/zh-cn$/),
    ],
  };
};

module.exports = config;
