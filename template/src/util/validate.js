/**
 * 表单验证规则模块
 * 20180105 ljw
 */
import {
    varType,
    extend,
    trimAll,
    changeArr
} from './util';
import Vue from "./vueutil";

/**
 * 使用方法(结合elementui的表单验证总结)：
 * <el-form :rule="ruleForm"></el-form>
 *
 * data() {
 *   ruleForm:this.eachValidate({
 *      name:{required:true},
 *      email:{email:true, required:true}
 *   })
 * }
 *
 * 常用验证方法如下：
 * required:true(必填)
 * tel:true(固定电话)
 * 数值大小判断：len:5(等于5)  min:5(不小于5)  max:10(不大于10) range:[5,10](5到10之间)
 * number:true(数字)
 * digits:true(整数)
 * url:true
 * email:true
 * creditcard:true(信用卡)
 * accept : ".jpg|.png"(合法后缀)
 * idCardNo : true(身份证验证)
 * mobile : true(手机电话)
 * tel : true(固定)
 * telAndMobile : true(手机号码/固定电话)
 * code : true(邮政编码)
 *
 * stringCheck : true（中文字、英文字母、数字和下划线,不能包含分发字符）
 * account: true(只能输入英文、数字或下划线)
 * alnum : true(英文字母或数字)
 * chcharacter : true(只能输入汉字)
 * string : true(字符验证)
 *
 * notSpace : true(不能为空格)
 * exclusive:"abc"(验证值不允许包含特定值)
 * unequal:"abc"(验证值不允许等于特定值)
 * dateTime: true(时间,格式为yyyy-mm-dd)
 *
 * lenString : 5(字符长度必须等于5)
 * rangeString : [5,10](字符长度在5到10内)
 * minString : 10(字符串最小长度)
 * maxString : 50(字符串最大长度)
 *
 * min:5(数值不得小于5)
 * max:10(数值不得大于10)
 * range:[5,10](数值在5到10内)
 * len: 5(数值等于5)
 *
 * remote:""/[]/{}(ajax请求后台返回错误信息)传字符串url（get请求）、数组[url, paramsName]（get请求）、ajax请求的对象{}
 * customVail:funcitnName(自定义校验规则)
 */

// 15位身份证时间验证
function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1800 || year > 2100)
        return false
    if (month < 1 || month > 12)
        return false
    return true
}

// 18位身份证时间验证
function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1800 || year > 2100)
        return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
        iaMonthDays[1] = 29;
    if (month < 1 || month > 12)
        return false
    if (day < 1 || day > iaMonthDays[month - 1])
        return false
    return true
}

// 一个汉字为两个字符长度
function getLength(str) {
    return str.replace(/[^u4e00-u9fa5]/g, "xx").length;
}

var validate = {
    number: (rule, value, callback, source, options) => {
       // debugger
        if (value === '' || value === null||value===undefined) {
            return callback();

        }else if (varType(value) === "number") {
            switch (rule.type) {
                case "len":
                    if (value !== Number(rule.data)) {
                        callback(new Error((rule.name || "数值") + "必须等于" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "min":
                    if (value < Number(rule.data)) {
                        callback(new Error((rule.name || "数值") + "不得小于" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "max":
                    if (value > Number(rule.data)) {
                        callback(new Error((rule.name || "数值") + "不得大于" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "range":
                    if (value < Number(rule.data[0]) || value > Number(rule.data[1])) {
                        callback(new Error((rule.name || "数值") + "必须在" + rule.data[0] + "和" + rule.data[1] + "之间"));
                    } else {
                        callback();
                    }
                    break;
            }
        } else {
            callback(new Error("请输入数字"));
        }
    },
    string: (rule, value, callback, source, options) => {
        if (value === "" || value === undefined || value === null) {
            callback();
            return false;
        }
        if (varType(value) === "string") {
            var len = getLength(value);
            switch (rule.type) {
                case "len":
                    if (len !== Number(rule.data)) {
                        callback(new Error((rule.name || "字符") + "长度必须等于" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "min":
                    if (len < Number(rule.data)) {
                        callback(new Error((rule.name || "字符") + "长度不得小于" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "max":
                    if (len > Number(rule.data)) {
                        callback(new Error((rule.name || "字符") + "长度不得大于" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "range":
                    if (len < Number(rule.data[0]) || value > Number(rule.data[1])) {
                        callback(new Error((rule.name || "字符") + "长度必须在" + rule.data[0] + "和" + rule.data[1] + "之间"));
                    } else {
                        callback();
                    }
                    break;
                case "exclusive":
                    if (value.indexOf(rule.data) > -1) {
                        callback(new Error((rule.name || "字符") + "不得包含" + rule.data));
                    } else {
                        callback();
                    }
                    break;
                case "unequal":
                    if (value === rule.data) {
                        callback(new Error((rule.name || "字符") + "不得与" + rule.data + "相同"));
                    } else {
                        callback();
                    }
                    break;
            }
        } else {
            callback(new Error("请输入字符串"));
        }
    },
    creditcard: (rule, value, callback, source, options) => {
        value = trimAll(value); //去空
        if (/[^0-9 \-]+/.test(value)) {
            callback(new Error(rule.message));
        }
        var nCheck = 0,
            nDigit = 0,
            bEven = false;
        value = value.replace(/\D/g, "");
        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9
                }
            }
            nCheck += nDigit;
            bEven = !bEven
        }
        if (!((nCheck % 10) === 0)) {
            callback(new Error(rule.message));
        } else {
            callback();
        }
    },
    idCardNo: (rule, value, callback, source, options) => {
        if(value==null){
            callback();
            return;
        }
        var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1); // 加权因子
        var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"); // 身份证验证位值
        var varArray = new Array(),
            i;
        var intValue;
        var lngProduct = 0;
        var intCheckDigit;
        var intStrLen = value.length;
        var idNumber = value;
        // 长度是否为15或18
        if(intStrLen==0){
            callback();
        }else{
            if ((intStrLen != 15) && (intStrLen != 18)) {
            callback(new Error(rule.message));
            return false;
        } else {
            for (i = 0; i < intStrLen; i++) {
                varArray[i] = idNumber.charAt(i);
                if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                    callback(new Error(rule.message));
                    return false;
                } else if (i < 17) {
                    varArray[i] = varArray[i] * factorArr[i];
                }
            }

            if (intStrLen == 18) { // 长度为18位
                // 日期校验
                var date8 = idNumber.substring(6, 14);
                if (isDate8(date8) == false) {
                    callback(new Error(rule.message));
                    return false;
                }
                // 计算前17位身份证数字总和
                for (i = 0; i < 17; i++) {
                    lngProduct = lngProduct + varArray[i];
                }
                // 计算最后一位验证码的结果
                intCheckDigit = parityBit[lngProduct % 11];
                // 检查最后一个数字
                if (varArray[17] != intCheckDigit) {
                    callback(new Error(rule.message));
                    return false;
                }
            } else { // 长度为15位
                // 日期校验
                var date6 = idNumber.substring(6, 12);
                if (isDate6(date6) == false) {
                    callback(new Error(rule.message));
                    return false;
                }
            }
            callback();
        }
    }
        
    },
    accept: (rule, value, callback, source, options) => {
        if (new RegExp(rule.data + "$").test(value)) {
            callback();
        } else {
            callback(new Error("请输入以" + rule.data + "为后缀名的字符串"));
        }
    },
    regExp: (rule, value, callback, source, options) => {
        if (value === ""||value==null) {
            callback();
        } else {
            if (new RegExp(rule.data).test(value)) {
                callback();
            } else {
                callback(new Error(rule.message));
            }
        }
    },
    regExpArr: (rule, value, callback, source, options) => {
        if(varType(rule.data) === "object") {
            rule.data.length = Object.keys(rule.data).length;  //XXX 兼容性未知
            rule.data = changeArr(rule.data);
        }
        value = trimAll(value);
        if (value === "") {
            callback();
        } else {
            if (rule.data.some(function (item) {
                    return new RegExp(item).test(value);
                })) {
                callback();
            } else {
                callback(new Error(rule.message));
            }
        }
    },
    remote: (rule, value, callback, source, options) => {
        var ajaxObj = {
            method: "GET",
            url: "",
            params: {}
        };
        if (varType(rule.data) === "array") {
            ajaxObj.url = rule.data[0];
            ajaxObj.params[rule.data[1]] = value;
            // } else if (varType(rule.data) === "object") {
            //     ajaxObj = rule.data;
        } else {
            ajaxObj.url = rule.data;
            ajaxObj.params.account = value;
        }

        ajaxObj.noLoading = true;

        Vue.prototype.$ajax(ajaxObj).then((res) => {
            if (!res.data.success) {
                return callback(new Error(res.data.msg || "验证不通过"))
            } else {
                callback();
            }
        }).catch((err) => {
        });
    }
};
var ruleType = {
    required: {
        required: true,
        message: '不能为空',
        trigger: 'blur'
    },
    email: {
        type: 'email',
        message: '请输入正确的邮箱地址',
        trigger: 'blur'
    },
    url: {
        type: 'url',
        message: '请输入正确的网址格式',
        trigger: 'blur'
    },
    //数值
    number: {
        type: 'number',
        message: "请输入数字",
        trigger: 'blur'
    },
    digits: {
        type: 'integer',
        message: "请输入整数",
        trigger: 'blur'
    },
    creditcard: {
        validator: validate.creditcard,
        message: "请输入正确的信用卡号",
        trigger: 'blur'
    },
    len: {
        validator: validate.number,
        type: "len",
        trigger: 'blur'
    },
    min: {
        validator: validate.number,
        type: "min",
        trigger: 'blur'
    },
    max: {
        validator: validate.number,
        type: "max",
        trigger: 'blur'
    },
    range: {
        validator: validate.number,
        type: "range",
        trigger: 'blur'
    },

    accept: {
        validator: validate.accept,
        trigger: 'blur'
    },
    stringCheck: { //[a-zA-Z][A-Za-z0-9_]
        validator: validate.regExp,
        data: "^[\\u4E00-\\u9FA5A-Za-z0-9_]+$",
        message: "只允许输入中文字、英文字母、数字和下划线的字符",
        trigger: 'blur'
    },
    account: {
        validator: validate.regExp,
        data: "^[A-Za-z0-9_]+$",
        message: "只允许输入英文、数字或下划线的字符",
        trigger: 'blur'
    },
    alnum: {
        validator: validate.regExp,
        data: "^[a-zA-Z0-9]+$",
        message: "只允许输入英文字母或数字的字符",
        trigger: 'blur'
    },
    chcharacter: {
        validator: validate.regExp,
        data: "^[\\u4e00-\\u9fa5]+$",
        message: "只允许输入中文",
        trigger: 'blur'
    },
    idCardNo: {
        validator: validate.idCardNo,
        message: "请输入正确的身份证号码",
        trigger: 'blur'
    },
    mobile: {
        validator: validate.regExp,
        data: "^(\\d{3}|\\d{4})?(\\d{8}|\\d{7})?(\\d{1,6})?$",
        message: "请输入正确的手机号码",
        trigger: 'blur'
    },
    tel: {
        validator: validate.regExp,
        data: "^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$",
        message: "请输入正确的固定电话",
        trigger: 'blur'
    },
    telAndMobile: {
        validator: validate.regExpArr,
        data:["^1[3|4|5|6|7|8][0-9]{9}$","^([0-9]{3,4}-)?[0-9]{7,8}$"],// ["^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$", "^(\\d{3}|\\d{4})?(\\d{8}|\\d{7})?(\\d{1,6})?$"],
        message: "请输入正确的手机号码或固定电话",
        trigger: 'blur'
    },
    code: {
        validator: validate.regExp,
        data: "[1-9]\\d{5}(?!\\d)",
        message: "请输入正确的邮政编码",
        trigger: 'blur'
    },
    notSpace: {
        validator: validate.regExp,
        data: "^[^\\s]+$",
        message: "不允许有空格",
        trigger: 'blur'
    },

    string: {
        type: 'string',
        message: "请输入字符串",
        trigger: 'blur'
    },
    lenString: {
        validator: validate.string,
        type: "len",
        trigger: 'blur'
    },
    unequal: {
        validator: validate.string,
        type: "unequal",
        trigger: 'blur'
    },
    exclusive: {
        validator: validate.string,
        type: "exclusive",
        trigger: 'blur'
    },
    minString: {
        validator: validate.string,
        type: "min",
        trigger: 'blur'
    },
    maxString: {
        validator: validate.string,
        type: "max",
        trigger: 'blur'
    },
    rangeString: {
        validator: validate.string,
        type: "range",
        trigger: 'blur'
    },
    dateTime: {
        validator: validate.regExp,
        data: "^(\\d{4})-(0\\d{1}|1[0-2])-(0\\d{1}|[12]\\d{1}|3[01])$",
        message: "请输入正确的时间格式",
        trigger: 'blur'
    },
    remote: {
        validator: validate.remote,
        trigger: 'blur'
    },
    customVail: {
        trigger: 'blur'
    }
};

export default ruleType;