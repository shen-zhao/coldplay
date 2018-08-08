const path = require('path');

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsRoot: path.posix.resolve(__dirname, '../dev'),
        useEslint: true,
        port: 9999,
        progress: true,   //查看进程
        poll: false,
        clientLogLevel: 'warning',
        overlay: true,
        proxyTable: {},
        autoOpen: true
    },
    build: {
        assetsSubDirectory: 'static',
        assetsRoot: path.posix.resolve(__dirname, '../dist'),
        publicPath: '/' //默认地址
    }
}