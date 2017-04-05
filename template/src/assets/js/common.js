/**
 * @common
 * @author  stylehuan
 * @create  2016-12-05 11:38
 */
import url from 'util/url'
var base = {
    isTest: false,
    isLocal: false,
    isPre: false,
    debug: false
};
if (location.port) {
    if (location.port === '8080') {
        base.isLocal = true;
    } else if (location.port === '1505') {
        if (location.href.indexOf('.net') > -1 || location.href.indexOf('.com') > -1) {
            base.isPre = true;
        } else {
            base.isTest = true;
        }
    }
}
if (base.isLocal || base.isTest || base.isPre || url.getLocationParam('debug')) {
    base.debug = true;
}
var empty = function () {
};
var _log = window.console = window.console || {};
_log.log = _log.log || empty;
if (!base.debug) {
    _log.log = empty;
}

{{#ProjectType}}
base.isInSelfApp = false;
{{/ProjectType}}
base.isInWX = navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;//是否在微信
base.isIos = !!navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
export default base;
