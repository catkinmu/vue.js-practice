
var utils = {
    getUrlName: function (name) {
        // 获取url中特定的参数
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    },
    ////获取当前年份
    currentYear: function () {
        var date = new Date();
        var yyyy = date.getFullYear().toString();
        return yyyy;
    },
    ////格式化日期获取其年份
    formatGetYear: function (str) {
        var formatDate = new Date(Date.parse(str));
        var yy = formatDate.getFullYear();
        return yy;
    },
    ////格式化日期获取其月份
    formatGetMonth: function (str) {
        var formatDate = new Date(Date.parse(str));
        var MM = formatDate.getMonth() + 1;
        return MM;
    },
    formatDate: function (date, fmt) {
        date = date == undefined ? new Date() : date;
        // date = typeof date == 'number' ? new Date(date) : date;
        date = new Date(date);
        fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
        var obj =
            {
                'y': date.getFullYear(), // 年份，注意必须用getFullYear
                'M': date.getMonth() + 1, // 月份，注意是从0-11
                'd': date.getDate(), // 日期
                'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                'w': date.getDay(), // 星期，注意是0-6
                'H': date.getHours(), // 24小时制
                'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
                'm': date.getMinutes(), // 分钟
                's': date.getSeconds(), // 秒
                'S': date.getMilliseconds() // 毫秒
            };
        var week = ['天', '一', '二', '三', '四', '五', '六'];
        for (var i in obj) {
            fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
                var val = obj[i] + '';
                if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
                for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
                return m.length == 1 ? val : val.substring(val.length - m.length);
            });
        }
        return fmt;
    },
    //判断是否为obj 并排除 null 因为typeof null为object，故先排除null
    isObject(obj) {
        return obj !== null && typeof obj === 'object'
    },
    isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    // 序列化参数
    param(data) {
        // If this is not an object, defer to native stringification.
        if (!this.isObject(data)) {
            return ((data == null) ? "" : data.toString());
        }
        var buffer = [];
        // Serialize each key in the object.
        for (var name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            }
            var value = data[name];
            buffer.push(
                encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value)
            );
        }
        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return (source);
    },
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    ////cookie('set_get_clickID', "");//清空cookie 
    ////ookie("MyCssSkin", id, { path: '/', expires: 2 });//加上cookie
    cookie: function (name, value, options) {
        /// <summary>设置cookie</summary>
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = this.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
}


Vue.prototype.utils = utils
// Vue.prototype.$http = axios
window.$http = axios