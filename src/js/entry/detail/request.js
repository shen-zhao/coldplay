import $ from 'jquery';

export function getChartData(url) {
    return new Promise(function(resolve, reject) {
        $.getJSON(url, res => {
            if(res.status !== 0) {
                reject(res.message);
            }
            resolve(res.data);
        })
        .fail(err => {
            reject(err);
        });
    });
}