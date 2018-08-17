import $ from 'jquery';
import template from '@/js/utils/template';
import dialogTmpl from '@/templates/dialog/common.html';
import confirmTmpl from '@/templates/dialog/confirm.html';

export function tip(message, options, callback) {
    var dfd = $.Deferred();
    var data = $.isPlainObject(message) ? message : {message: message};
    $.extend(data, options);
    var html = template.compile(options.template || dialogTmpl)(data);
    var $dialog = $(html).appendTo('body');
    $dialog.data('defer', dfd);

    $dialog.find('.dialog_btn').on('click', function(event) {
        var action = $(this).data('action');
        if (action === 'close') {
            event.preventDefault();
            dfd.reject();
        } else if (action === 'submit') {
            dfd.resolve();
        }
    });
    dfd.then(() => $.isFunction(callback) && callback.call($dialog, dfd));
    
    dfd.always(function () {
        $dialog.fadeOut('slow', () => $dialog.remove());
    });

    return $dialog;
}

/*
    * @param {String | {Object.<title, message>}} message
    * @param {Function} callback(action)
    */
export function success(message, callback) {
    return tip(message || '操作成功', {type: 'success'}, callback);
}

/*
    * @param {String | {Object.<title, message>} message
    * @param {Function} callback(action)
    */
export function fail(message, callback) {
    return tip(message || '操作失败', {type: 'fail'}, callback);
}

export function autoHide(action, message, callback) {
    let $dlg = null;
    if (action === 'success') {
        $dlg = success(message, callback);
    } else {
        $dlg = fail(message, callback);
    }
    setTimeout(() => {
        $dlg.fadeOut('slow', () => {
            $dlg.data('defer') && $dlg.data('defer').resolve();
            $dlg.remove();
        });
    }, 3000);
}

/**
 * @param {String} tmpl - 弹窗的js模板
 * @param {Object} [data] - js模板的数据
 * @param {Function} [callback(action)]
 */
export function dialog(tmpl, data, callback) {
    if(arguments.length === 2 && $.isFunction(data)) {
        callback = data;
        data = null;
    }
    return tip(data, {template: tmpl}, callback);
}

export function confirm(message, callback) {
    return tip(message, {template: confirmTmpl}, callback);
}
