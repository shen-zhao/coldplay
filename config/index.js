const path = require('path');

module.exports = {
    dev: {
        //path
        assetsSubDirectory: 'static',
        assetsRoot: path.resolve(__dirname, '../dev'),
        useEslint: true,
        port: 9999,
        progress: true,   //查看进程
        poll: false,    //轮询
        proxyTable: {
            '/mock': {
                // 我要请求的地址
                target: 'http://oatest.bujidele.com:8010/apitest/api/tydproject/doOld/',
                //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/mock': ''
                }
            }
        },
        autoOpen: true  //自动打开浏览器
    },
    build: {
        assetsSubDirectory: 'static',
        assetsRoot: path.resolve(__dirname, '../dist'),
        publicPath: '/' //默认地址
    }
}