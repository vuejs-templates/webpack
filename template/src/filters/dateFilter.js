/**
 * 依赖 moment.js (http://cdn.bootcss.com/moment.js/2.13.0/moment.min.js) 进行日期、时间处理
  */

var Vue = require('vue');

Vue.filter('defaultDate', {
    read (val) {
        return val || (new Date());
    },
    write (val, oldVal, format) {
        return moment(val).format(format);
    }
});
