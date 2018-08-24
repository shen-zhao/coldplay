const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('../config');
const serverConf = require('../config/server.config');
const utils = require('./utils');
const webpackConfig = require('./webpack.base.conf');

//监听client热刷新
Object.keys(webpackConfig.entry).forEach(function (name) {
    typeof webpackConfig.entry[name] == 'object' && (webpackConfig.entry[name] = ['./build/dev-client.js?path=/__webpack_hmr'].concat(webpackConfig.entry[name]));
})

const devWebpackConfig = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    plugins: [
        new CopyWebpackPlugin([
            {
                from: utils.resolve('src/mock/js'),
                to: path.resolve(config.dev.assetsRoot, 'vm')
            },
            {
                from: utils.resolve('src/mock/json'),
                to: path.resolve(config.dev.assetsRoot, 'mock/json')
            }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:${serverConf.port}`]
            }
        })
    ]
});

module.exports = devWebpackConfig;