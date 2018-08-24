module.exports = {
    vm: [
        '.html'
    ],
    port: 9999,
    proxyTable: {
        // '/mock': {
        //     // 我要请求的地址
        //     target: 'http://172.19.163.208:3000',
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