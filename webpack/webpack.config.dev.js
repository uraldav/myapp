const { resolve } = require('path');
const webpack = require('webpack');
const StylelintPlugin = require('stylelint-webpack-plugin');

const rootPath = resolve(__dirname, '..');

const cssScopedNamePattern = '[path][name]-[local]___[hash:base64:8]';

const config = (env) => {
  const context = resolve(rootPath, `app-${env.app}`);

  return {
    target: 'web',
    devtool: 'cheap-module-eval-source-map',
    context,
    resolve: {
      extensions: ['.js', '.jsx'],
      mainFields: ['browser', 'jsnext:main', 'main'],
      alias: {
        moment: 'moment/moment.js',
        'app-common': resolve(rootPath, 'app-common'),
      },
    },
    entry: ['react-hot-loader/patch', 'babel-polyfill', './index.jsx'],
    output: {
      filename: 'bundle.js',
      path: resolve(rootPath, 'build', env.app, 'assets'),
      publicPath: '/assets/',
    },
    devServer: {
      hot: true,
      hotOnly: true,
      open: true,
      quiet: false,
      noInfo: false,
      publicPath: '/assets/',
      contentBase: resolve(rootPath, 'build', env.app),
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
          use: ['style-loader', 'css-loader'],
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
                plugins: [],
              },
            },
            {
              loader: 'less-loader',
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
        files: ['**/*.less'],
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
