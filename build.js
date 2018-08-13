/* 
    {
        *template: 页面入口名称, 位置src/pages,
        *entry: js入口文件路径, 🌰 src/js/entry + js名称, 支持子文件夹例如index/index.js会自动生成index目录,
        commons: 插件来源为node_modules和入口脚本的本地依赖文件, 包括jQuery, art-template等, 默认引入, false不引入
        echarts: echarts库, 注: echarts库比较大, 没有打入vendors, 后续如有大型插件需要单独引用的需修改配置,
        stylesheet: 所有公共样式，如common.scss/form.scss/table.scss/reset.scss等, 默认引入, 为false时不引入
    }
 */
module.exports = {
    baseUrl: 'src/js/entry',
    pages: [
        {
            template: 'index',
            entry: 'index.js'
        },
        {
            template: 'detail',
            entry: 'detail.js',
            echarts: true
        },
        {
            template: 'list',
            entry: 'list.js',
        },
        {
            template: '404',
            entry: '404.js',
            commons: false,
            stylesheet: false
        }
    ]
};