import $ from 'jquery';
import '../lib/jquery.validate';
import validateIdcard from '../lib/validate_idcard';

$.extend($.validator.messages, {
    required: '请填写内容',
    remote: '请修正该字段',
    email: '请输有效的电子邮件',
    url: '请输入有效的网址',
    date: '请输入有效的日期（示例：2015-6-30）',
    dateISO: '请输入有效的日期（示例：2015-06-30）.',
    number: '请输入数字',
    digits: '请输入整数',
    creditcard: '请输入有效的信用卡号',
    equalTo: '两次输入不一样，请重新输入',
    accept: '请选择png、jpg、jpeg或gif格式的图片',
    maxlength: $.validator.format('最多请输入{0}个字'),
    minlength: $.validator.format('请至少输入{0}个字'),
    rangelength: $.validator.format('长度请在 {0} - {1} 位之间'),
    range: $.validator.format('请输入介于 {0} 和 {1} 之间的数字'),
    max: $.validator.format('请填写不大于{0}的数字'),
    min: $.validator.format('请填写不小于{0}的数字')
});

/*计算字符长度（两个英文算一个字）*/
function getByteLength(str) {
    return str.replace(/[^x00-xff]/g, '--').length / 2;
}

$.validator.addMethod('maxlength2', function(value, element, param){
    return this.optional(element) || getByteLength($.trim(value)) <= param;
}, $.validator.format('最多请输入{0}个字'));

$.validator.addMethod('minlength2', function(value, element, param){
    return this.optional(element) || getByteLength($.trim(value)) >= param;
}, $.validator.format('请至少输入{0}个字'));

$.validator.addMethod('rangelength2', function(value, element, param){
    var length = getByteLength($.trim(value));
    return this.optional(element) || (length >= param[0] && length <= param[1]);
}, $.validator.format('长度请介于 {0} 和 {1} 之间'));

// 手机号
$.validator.addMethod('mobile', function(value, element){
    var reg = /^1\d{10}$/;
    return this.optional(element) || reg.test($.trim(value));
}, $.validator.format('请检查手机格式'));

//身份证号
$.validator.addMethod('idcard', function(value, element){
    value = value.toUpperCase();
    return this.optional(element) || validateIdcard($.trim(value));
}, $.validator.format('请检查身份证格式'));

$.validator.addMethod('loginname', function(value, element){
    var reg = /^[a-zA-Z]+[a-zA-Z0-9-]{3,19}$/;
    return this.optional(element) || reg.test($.trim(value));
}, $.validator.format('请输入4-20位字符(英文字母、数字、短横线“-”)，必须以字母开头'));

$.validator.addMethod('passwd', function(value, element){
    var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
    return this.optional(element) || reg.test($.trim(value));
}, $.validator.format('密码6-20个字符，至少包含字母、数字、标点符号中两项'));

$.validator.addMethod('maxMoney', function(value, element){
    var reg = 1000000000.00;
    return this.optional(element) || value<reg;
}, $.validator.format('信用额度不得超过1000000000.00'));

$.validator.addMethod('isDecimalFormat', function (value, element) {
    var reg = /^\d+(?:\.\d{2})?$/;
    return this.optional(element) || reg.test($.trim(value));
}, $.validator.format('请保留两位小数，如：200.00'));
$.validator.addMethod('float2', function (value, element) {
    var reg = /^\d+(?:\.\d{1,2})?$/;
    return this.optional(element) || reg.test(value);
}, $.validator.format('请填写最多保留两位小数的数字'));
// 所属名称不与给定数组中元素相同
$.validator.addMethod('isUnique', function (value, element, param) {
    return this.optional(element) || param.indexOf(value) == -1;
}, $.validator.format('名称不能与已有名称重复'));
// 名字必须是汉字
$.validator.addMethod('isName',function(value,element){  
    var isName = /^[\u4e00-\u9fa5]{2,10}/g; 
    return this.optional(element)||(isName.test(value));  
},'*请输入正确的员工姓名，姓名必须是汉字，长度不超过10位！'); 
//多个邮箱
$.validator.addMethod('emails', function(value, element, param) {
    var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var flag = true;
    for(var i=0; i<param.length; i++) {
        if(!reg.test(param[i])) {
            flag = false;
        }
    }
    return this.optional(element) || flag;
}, $.validator.format('邮箱格式不正确'));
//多个手机
$.validator.addMethod('mobiles', function(value, element, param) {
    var reg = /^1\d{10}$/;
    var flag = true;
    for(var i=0; i<param.length; i++) {
        if(!reg.test(param[i])) {
            flag = false;
        }
    }
    return this.optional(element) || flag;
}, $.validator.format('手机号格式不正确'));

/**
* Return true if the field value matches the given format RegExp
*
* @example $.validator.methods.pattern('AR1004',element,/^AR\d{4}$/)
* @result true
*
* @example $.validator.methods.pattern('BR1004',element,/^AR\d{4}$/)
* @result false
*
* @name $.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
$.validator.addMethod('pattern', function(value, element, param) {
    if (this.optional(element)) {
        return true;
    }
    if (typeof param === 'string') {
        param = new RegExp('^(?:' + param + ')$');
    }
    return param.test(value);
}, '格式不正确');

$.validator.setDefaults({
    errorPlacement: function($error, $elem) {
        $elem.closest('.field_wrap').append($error);
    }
});
