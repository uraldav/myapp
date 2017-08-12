import baseConfig from './base.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import merge from 'webpack-merge';
import { URL } from 'url';
import { CIP_ARM_CLIENT_HOST } from '../utils/environment-variables';

const clientURL = new URL(CIP_ARM_CLIENT_HOST)

export default merge(baseConfig, {
    output: {
        pathinfo: true,
    },
    devServer: {
        hot: true,
        host: clientURL.host,
        port: clientURL.port,
    },
    devtool: 'eval',
    watch: true,
    plugins: [
        new HtmlWebpackPlugin(),
        new DashboardPlugin(),
    ],
});
