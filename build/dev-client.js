/* eslint-disable */
require('eventsource-polyfill')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true&overlay=false');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})