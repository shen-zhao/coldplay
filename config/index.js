const path = require('path');

module.exports = {
    dev: {
        //path
        assetsSubDirectory: 'static',
        assetsRoot: path.resolve(__dirname, '../dev'),
        useEslint: true,
        progress: true,   //查看进程
        poll: false,    //轮询
        autoOpen: true  //自动打开浏览器
    },
    build: {
        assetsSubDirectory: 'static',
        assetsRoot: path.resolve(__dirname, '../dist'),
        publicPath: '/' //默认地址
    }
}