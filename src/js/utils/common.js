import $ from 'jquery';
import '@/js/lib/jquery.pagination';

export function pagination(elem, options) {
    const config = {
        current_page: options.current,
        items_per_page: options.limit,
        page_index: 1,
        num_edge_entries: 1,
        num_display_entries: 5,
        prev_text: '&lt;',
        next_text: '&gt;',
        load_first_page: false,
        link_to: '#__id__',
        cut_limit_need: true,
        show_if_single_page: true,
        total_count_need: true
    };
    $.extend(config, options);
    $(elem).pagination(options.count, config);
}

export function fail(selector, message) {
    $(selector).html(`<div class="fail"><div class="fa fa-exclamation-triangle"></div><span>${message || '系统异常'}</span></div>`);
}

export const zh = {
    previousMonth : '上一月',
    nextMonth     : '下一月',
    months        : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    weekdays      : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    weekdaysShort : ['日','一','二','三','四','五','六']
};

export const dateConfig = {
    i18n: zh,
    format: 'YYYY-MM-DD',
    yearRange: 100
};

export function form2json(form){
    var $form = $(form);
    var serializeObj = {};
    var array = $form.serializeArray();
    $(array).each(function(){
        if(serializeObj[this.name]){
            if($.isArray( serializeObj[this.name] )){
                serializeObj[this.name].push(this.value);
            }else{
                serializeObj[this.name] = [serializeObj[this.name],this.value];
            }
        }else{
            serializeObj[this.name] = this.value;
        }
    });
    return serializeObj;
}

/*
    @params container 容器
    @params allSelector 全选框
    @params itemSeletor 普通复选框
    $.checkbox(container,[allSelector],[itemSeletor])
    1.一个参数
    container
    结构:<div> //container
            <input type="checkbox" name="allChecked">
            <input type="checkbox" name="">
            <input type="checkbox" name="">
            <input type="checkbox" name="">
            <input type="checkbox" name="">
        </div>
    2.两个参数
    allSelector, itemSeletor
    3.三个参数
    container, allSelector, itemSeletor
    */
   $.checkbox = function(container, allSelector, itemSeletor) {
    var allSel, //all选择器
        itemsSel, //item选择器
        $containerEle, //container元素
        len = arguments.length;
    if(len === 1) {
        allSel = '[name=allChecked]';
        itemsSel = '[type=checkbox]:not([name=allChecked])';
    } else if (len === 2) {
        allSel = container;
        itemsSel = allSelector;
        container = 'body';
    } else {
        allSel = allSelector;
        itemsSel = itemSeletor;
    }

    $containerEle = $(container);

    $containerEle.on('change', allSel, function() {
        var $self = $(this),
            $itemsEle = $containerEle.find(itemsSel).not(':disabled');
        if($self.prop('checked')) {
            $itemsEle.prop('checked', true);
        } else {
            $itemsEle.prop('checked', false);
        }
    });
    $containerEle.on('change', itemsSel, function() {
        var $allEle = $containerEle.find(allSel),
            itemsLen = $containerEle.find(itemsSel).not(':disabled').length,
            checkedLen = $containerEle.find(itemsSel+':checked').not(':disabled').length;
        $allEle.prop('checked', itemsLen === checkedLen);
    });
};

export function getImagePath(src, size) {
    var extname = src.slice(src.lastIndexOf('.'));
    return src.slice(0, 0 - extname.length) + '_' + size + extname;
}

export const swf = '/swf/uploader.swf';

export function getPermission(url, urlList){
    return urlList.indexOf(url) == -1 ? false : true;
}