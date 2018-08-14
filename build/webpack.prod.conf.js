require('./check-versions');

const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const webpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//图片压缩
const ImageminPlugin = require('imagemin-webpack-plugin').default;
//压缩js
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const prodWebpackConfig = merge(webpackConfig, {
    mode: 'none',
    output: {
        publicPath: utils.publicPath()
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('styles/[name].[hash:8].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true }
        }),
        new uglifyjsWebpackPlugin({
            test: /\.js($|\?)/i,
            parallel: true,
            cache: true,
            uglifyOptions: {
                ie8: true,
                compress: {
                    drop_console: true
                }
            }
        }),
        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            minFileSize: 10000,  //超过10k压缩
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    optimization: {
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        noEmitOnErrors: true,
        splitChunks: {
            minSize: 50000,
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}(?!echarts)/,
                    name: 'vendors',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true
                },
                commons: {
                    test: /[\\/]src[\\/]/,
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 4
                },
                echarts: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}echarts/,
                    name: 'echarts',
                    chunks: 'initial',
                    minChunks: 1
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    stats: {
        warnings: true
    }
})

module.exports = prodWebpackConfig;