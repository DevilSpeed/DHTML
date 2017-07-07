var verify = (function() {
    var phone = /^[1][0-9]{10}$/;
    var bankNum = /^\d{16}|\d{19}$/;
    var allChinese = /^([\u4E00-\u9FA5]+，?)+$/;
    var idCardNum1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    var idCardNum2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
    var special = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
    special.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
    special.push("administrators", "administrator", "管理员", "系统管理员", "admin");
    special.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
    var _url = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
    var emall = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    var haveChinese = "[\\u4E00-\\u9FFF]+";
    var _isNull = "^[ ]+$";
    var _isNumber = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    var _isInteger = /^[0-9]*$/;
    return {
        judeType: function(obj, type) {
            var result = null;
            switch (type) {
                case "string":
                    result = (typeof obj == 'string') && obj.constructor == String;
                    break;
                case "function":
                    result = (typeof obj == 'function') && obj.constructor == Function;
                    break;
                case "array":
                    result = (typeof obj == 'object') && obj.constructor == Array;
                    break;
                case "number":
                    result = (typeof obj == 'number') && obj.constructor == Number;
                    break;
                case "date":
                    result = (typeof obj == 'object') && obj.constructor == Date;
                    break;
                case "object":
                    result = (typeof obj == 'object') && obj.constructor == Object;
                    break;
                default:
                    result = (typeof obj == 'string') && obj.constructor == String;
                    break;
            };
            return result;
        },
        isNumber: function(str) {
            var re = new RegExp(_isNumber);
            return re.test(str) ? true : false;
        },
        isInteger: function(str) {
            var re = new RegExp(_isInteger);
            return re.test(str) ? true : false;
        },
        isNull: function(str) {
            // 如果全是空返回false
            if (str == "" || str == undefined || str == null) return false;
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return !re.test(str);
        },
        isPhone: function(str) {
            // 手机号格式正确返回 true;
            var re = new RegExp(phone);
            return re.test(str) ? true : false;
        },
        isAllChinese: function(str) {
            // 全部为中文返回 true;
            var re = new RegExp(allChinese);
            return re.test(str) ? true : false;
        },
        isHaveChinese: function(str) {
            // 含有中文返回 true;
            var re = new RegExp(haveChinese);
            return re.test(str) ? true : false;
        },
        isIdCard: function(str) {
            // 身份证号正确 返回 true;
            var re1 = new RegExp(idCardNum1);
            var re2 = new RegExp(idCardNum2);
            return re1.test(str) || re2.test(str) ? true : false;
        },
        isSpecial: function(str) {
            // 含有特殊字符返回 true;
            str = str.toLowerCase();
            for (var i = 0; i < special.length; i++) {
                if (str.indexOf(special[i]) >= 0) {
                    return false;
                }
            }
            return true;
        },
        isUrl: function(str) {
            // URL 格式正确返回 true;
            var re = new RegExp(_url);
            return re.test(str) ? true : false;
        },
        isEmail: function(str) {
            // Email 格式正确返回 true;
            var re = new RegExp(emall);
            return re.test(str) ? true : false;
        }
    }
})