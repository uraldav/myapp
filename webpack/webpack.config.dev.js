const { resolve } = require('path');
const webpack = require('webpack');
const StylelintPlugin = require('stylelint-webpack-plugin');

const rootPath = resolve(__dirname, '..');

const cssScopedNamePattern = '[local]';

const config = () => {
  const context = resolve(rootPath, 'app');

  return {
    target: 'web',
    devtool: 'cheap-module-eval-source-map',
    context,
    resolve: {
      extensions: ['.js', '.jsx'],
      mainFields: ['browser', 'jsnext:main', 'main'],
      alias: {
        moment: 'moment/moment.js',
        base: resolve(rootPath, 'base'),
      },
    },
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'bootstrap/dist/css/bootstrap.css',
      './index.jsx',
    ],
    output: {
      filename: 'bundle.js',
      path: resolve(rootPath, 'build', 'assets'),
      publicPath: '/assets/',
    },
    devServer: {
      hot: true,
      hotOnly: true,
      open: true,
      quiet: false,
      noInfo: false,
      publicPath: '/assets/',
      contentBase: resolve(rootPath, 'build'),
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
          use: ['react-hot-loader/webpack', 'babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss/,
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
                plugins: [],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                paths: [resolve(rootPath, 'node_modules')],
              },
            },
          ],
        },
        { test: /\.(png|jpg)$/, use: 'url-loader' },
        { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'url-loader' },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader?mimetype=application/font-woff',
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: 'url-loader?mimetype=application/octet-stream',
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader',
        },
      ],
    },
    plugins: [
      new StylelintPlugin({
        files: ['**/*.scss'],
      }),
      new webpack.LoaderOptionsPlugin({
        test: /\.jsx?$/,
        options: {
          eslint: {
            configFile: resolve(rootPath, '.eslintrc.js'),
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
      new webpack.IgnorePlugin(/^moment\/locale\/zh-cn$/),
    ],
  };
};

module.exports = config;
