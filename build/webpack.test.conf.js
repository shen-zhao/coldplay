const webpack = require('webpack');
const merge = require('webpack-merge');
const ora = require('ora');
const utils = require('./utils');
const webpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩js
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const testWebpackConfig = merge(webpackConfig, {
    mode: 'none',
    devtool: 'eval-source-map',
    output: {
        publicPath: utils.publicPath('production')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('styles/[name].[hash:8].css')
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new uglifyjsWebpackPlugin({
            test: /\.js($|\?)/i,
            parallel: true,
            cache: true,
            sourceMap: true,
            uglifyOptions: {
                ie8: true
            }
        }),
    ],
    optimization: {
        flagIncludedChunks: true,
        occurrenceOrder: true,
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        noEmitOnErrors: true,
        splitChunks: {
            minSize: 30000,
            name: false,
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}(?!echarts)/,
                    name: 'vendors',
                    minChunks: 1,
                    enforce: true
                },
                commons: {
                    test: /[\\/]src[\\/]/,
                    name: 'commons',
                    minChunks: 3
                },
                echarts: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}echarts/,
                    name: 'echarts',
                    minChunks: 1
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
})

let spinner = ora('building for test environment...');
spinner.start();

webpack(testWebpackConfig, (err, stats) => {
    spinner.stop();
    if(err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
});