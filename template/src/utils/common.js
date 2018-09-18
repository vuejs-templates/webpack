/*
 * @Author: zhangxiang
 * @Date: 2018/9/18
 * @Last Modified by: zhangxiang
 * @Last Modified time: 2018/9/18
 */
const utils = {
  // 判断值是否为空
  isNull(v) {
    return v === undefined || v === null || v === ''
  },
  // 是否是图片
  isImage (fileName) {
    let suffixIndex = fileName.lastIndexOf('.');
    let suffix = fileName.substring(suffixIndex + 1).toUpperCase();
    let imageSuffixArr = ['BMP', 'JPG', 'JPEG', 'PNG', 'GIF']
    return imageSuffixArr.indexOf(suffix) >= 0;
  },
  // 判断字符串类型
  isString(str) {
    return (typeof str === 'string') && str.constructor === String;
  },
  // 判断是否是json字符串
  isJsonString(str) {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true;
      }
    } catch (e) {
    }
    return false;
  },
  // 获取cookie
  getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    let arr = document.cookie.match(reg);
    if (arr) {
      return arr[2];
    } else {
      return null;
    }
  },
  // 清除所有cookie函数
  deleteAllCookies () {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },
  // 深拷贝
  deepCopy (source) {
    return JSON.parse(JSON.stringify(source));
  }
}
export default utils
