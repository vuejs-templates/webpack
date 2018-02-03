/**
 * Created by nocoolyoyo on 2018/1/23.
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
 * 获取系统语言（业务逻辑）
 * @param: lang { String}
 * @return: language { String}
 */
/*获取业务规则的系统的语言*/
function formatSysLang() {
  let key = '';
  let sysLang = (navigator.language ||
  navigator.browserLanguage).toLowerCase();
  switch (true) {
    case sysLang.indexOf('zh-cn') > -1: key='zh-cn'; break;
    case sysLang.indexOf('zh-tw') > -1: key='zh-tw'; break;
    case sysLang.indexOf('ja') > -1:        key='ja'; break;
    case sysLang.indexOf('fr') > -1:        key='fr'; break;
    case sysLang.indexOf('it') > -1:        key='it'; break;
    case sysLang.indexOf('ru') > -1:       key='ru'; break;
    case sysLang.indexOf('es') > -1:       key='es'; break;
    case sysLang.indexOf('de') > -1:      key='de'; break;
    case sysLang.indexOf('ko') > -1:      key='ko'; break;
    case sysLang.indexOf('tr') > -1:        key='tr'; break;
    case sysLang.indexOf('ar') > -1:       key='ar'; break;
    case sysLang.indexOf('th') > -1:       key='th'; break;
    case sysLang.indexOf('pt') > -1:       key='pt'; break;
    case sysLang.indexOf('nl') > -1:       key='nl'; break;
    case sysLang.indexOf('ro') > -1:       key='ro'; break;
    case sysLang.indexOf('id') > -1:       key='id'; break;
    case sysLang.indexOf('vi') > -1:       key='vi'; break;
    case sysLang.indexOf('sv') > -1:       key='sv'; break;
    case sysLang.indexOf('pl') > -1:       key='pl'; break;
    default: key = 'en';
  }
  return key;
}

export function getLang(lang) {
  const langsMap = [ 'zh-cn', 'zh-tw', 'ja', 'fr', 'it',
    'ru', 'es', 'de', 'ko', 'tr', 'ar',
    'th', 'pt', 'nl', 'ro', 'id', 'vi', 'sv', 'pl', 'en'];

  /*参数lang的语言优先*/
  lang = lang || '';
  let result = '';
  //设置系统语言
  if(lang ==='' ) {
    result = formatSysLang()
  }else {
    for(let i =0; i < langsMap.length; i++){
      if(langsMap[i] === lang) {
        result = lang;
        break;
      }
    }
  }
  return result;
}
