const path = require('path');
const config = require('../config');
const utils = require('./utils');
const pageConf = utils.dealPageConf();
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;

const outcome = env === 'production' ? 'dist' : 'dev';

const baseConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {},
    output: {
        path: env === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
        filename: utils.assetsPath(env === 'production' ? 'js/[name].[chunkhash:8].js' : 'js/[name].js')
    },
    resolve: {
        alias: {
            '@': utils.resolve('src')
        }
    },
    module: {
        rules: [
            ...utils.styleLoaders({usePostCSS: true}),
            //eslint
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                },
                include: [utils.resolve('src')]
            },
            //babel
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                include: [utils.resolve('src')]
            },
            {   //引入html模板提供给arttemplate使用
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    //开启压缩
                    minimize: true,
                    interpolate: 'require'
                },
                include: [utils.resolve('src/templates')]
            },
            {   //处理非js引用html时对静态资源进行处理（代替velocity的#parse()）
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    interpolate: 'require', //支持页面里面的require语法
                    attrs: ['img:src', 'video:src', 'audio:src'] //修改静态资源前缀
                },
                include: [utils.resolve('src/pages'), utils.resolve('src/inc')]
            },
            {   //图片处理
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('img/[name].[hash:8].[ext]'),
                    publicPath: utils.publicPath(env)
                },
                include: [utils.resolve('src')]
            },
            {   //管理字体
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('font/[name].[hash:8].[ext]'),
                    publicPath: utils.publicPath(env)
                },
                include: [utils.resolve('src')]
            },
            {   //管理媒体
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('media/[name].[hash:8].[ext]'),
                    publicPath: utils.publicPath(env)
                },
                include: [utils.resolve('src')]
            }
        ]
    },
    plugins: [
        ...pageConf.htmlArr, //实例多页面入口
        new CleanWebpackPlugin([outcome], {
            root: utils.resolve(''),
            verbose: false, //开启在控制台输出信息
            dry: false
        }),
    ]
}

baseConfig.entry = pageConf.entryMap;

module.exports = baseConfig;