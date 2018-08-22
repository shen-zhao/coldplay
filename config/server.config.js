module.exports = {
    vm: [
        '.html'
    ],
    port: 9999,
    proxyTable: {
        // '/mock': {
        //     // 我要请求的地址
        //     target: 'http://oatest.bujidele.com:8010/apitest/api/tydproject/doOld/',
        //     //是否跨域
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/mock': ''
        //     }
        // }
    },
    responseHeaders: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    }
}