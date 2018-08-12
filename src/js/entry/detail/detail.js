import $ from 'jquery';
import urlmap from '@/js/server/urlmap';
import { getChartData } from './request';
import { initChart } from './chart';
import '@/styles/detail.scss';

function init() {
    getChartData(urlmap['detail'])
        .then(data => {
            initChart(data);
        })
        .catch(err => {
            if (err instanceof Error) throw err;
            console.log(err || '系统异常');
        });
}

function start() {
    init();
}

start();

