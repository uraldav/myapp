const { resolve } = require('path');
const webpack = require('webpack');

const config = {
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  context: resolve(__dirname, 'app'),
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
    alias: { moment: 'moment/moment.js' },
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
      /* включить чуть позже {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, */
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot-loader/webpack',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true },
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
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
      if (!/\/moment\//.test(context.context)) { return; }
      Object.assign(context, {
        regExp: /^\.\/(ja|ko|zh|ru)/,
        request: '../../locale',
      });
    }),
  ],
};

module.exports = config;
