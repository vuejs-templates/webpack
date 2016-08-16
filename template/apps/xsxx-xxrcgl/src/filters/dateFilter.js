/**
 * 依赖 moment.js (http://cdn.bootcss.com/moment.js/2.13.0/moment.min.js) 进行日期、时间处理
  */

var Vue = require("vue");

Vue.filter("defaultDate", {
        read: function(val) {
            return val || (new Date());
        },
        write: function(val, oldVal, format) {
            return moment(val).format(format);
        }
    }
);

Vue.filter("formatDate", function (val, format) {
    return moment(val).format(format);
});
