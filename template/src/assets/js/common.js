/**
 * @common
 * @author  stylehuan
 * @create  2016-12-05 11:38
 */
import url from 'util/url';
var base = {
  isTest: false,
  isLocal: false,
  isPre: false,
  debug: false
};
if (window.location.port) {
  if (window.location.port === '8080') {
    base.isLocal = true;
  } else if (window.location.port === '1505') {
    if (window.location.href.indexOf('.net') > -1 || window.location.href.indexOf('.com') > -1) {
      base.isPre = true;
    } else {
      base.isTest = true;
    }
  }
}
if (base.isLocal || base.isTest || base.isPre || url.getLocationParam('debug')) {
  base.debug = true;
}
var empty = function() {};
var _log = window.console = window.console || {};
_log.log = _log.log || empty;
if (!base.debug) {
  _log.log = empty;
}

base.isInSelfApp = false;
base.isInWX = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;//是否在微信
base.isIos = !!navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
export default base;
