/**
 * Created by nocoolyoyo on 2018/1/19.
 */
//判断是否支持sticky
export function isSupportSticky() {
  let prefixTestList = ['', '-webkit-'];
  let stickyText = '';
  for (let i = 0; i < prefixTestList.length; i++ ) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky;';
  }
  // 创建一个dom来检查
  let div = document.createElement('div');
  div.style.cssText = stickyText;
  document.body.appendChild(div);
  let isSupport = /sticky/i.test(window.getComputedStyle(div).position);
  document.body.removeChild(div);
  div = null;
  return isSupport;
}

/**
 * 获取指定的URL参数值
 * @param: name: { String }
 * @return: type
 * @example  * URL:http://www.quwan.com/index?name=tyler  post name will return tyler
 */
export function getParam(name) {
  let url =  decodeURI(window.location.search.replace(/\+/g,'%20'));
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = url.substr(1).match(reg);

  if (r !== null)
    return decodeURI(r[2]);
  return '';
}

/**
 * 获取系统语言
 * @return: language { String}
 */
/*获取业务规则的系统的语言*/
export function getLang() {
  return  (navigator.language ||
  navigator.browserLanguage).toLowerCase();
}
