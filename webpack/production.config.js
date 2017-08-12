import path from 'path';
import merge from 'webpack-marge';
import baseConfig from './base.config';
import webpack from 'webpack';
import rootPath from './root-path';
import distPath from '../utils/dist-path';

export default merge(baseConfig, {
    output: {
        path: distPath,
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin([distPath]),
        new webpack.optimize.UglifyJsPlugin({
            parallel: true,
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
    ]
});
