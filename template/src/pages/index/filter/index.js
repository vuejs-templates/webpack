import moment from 'moment';// 时间插件

let mymoment = (el, ff, str) => {
  if (el) {
    return moment(el).format(ff);
  } else {
    return str || '--';
  }
};
export {
  mymoment
};
