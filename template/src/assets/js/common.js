/**
 * @common
 * @author  stylehuan
 * @create  2016-12-05 11:38
 */
var base = {
    isTest: false,
    isLocal: false,
    isPre: false,
    debug: false,
    isIos: !!navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
};

if (location.port) {
    if (location.port == "8080") {
        base.isLocal = true;
    } else if (location.port == "1505") {
        if (location.href.indexOf(".net") > -1 || location.href.indexOf(".com") > -1) {
            base.isPre = true;
        } else {
            base.isTest = true;
        }
    }
}
if (base.isLocal || base.isTest || url.getLocationParam("debug")) {
    base.debug = true;
}

if (base.isLocal) {
    _signIn.headers = '{"system":"1","tcyVersion":"4.4.1","tcyCode":"44","soVersion":"1.3.20161221","tcyPromoter":"310200","tcyPackage":"com.uc108.mobile.gamecenter","network":"3","userName":"misar001","userid":"15526","IMEI":"862973035690762","timestamp":"1487052213425","checkcode":"a4278b0b3cdf9025ede87e1d0836d249","Province":"","City":"","District":""}';
}


base.getAppMethod = function (method, ...params) {
    console.log("--调用app接口---:" + method, "params:" + params);

    if (method == "getHeaderInfo") {
        return _signIn.headers;
    }

    try {
        if (params.length) {
            return HtmlInterface[method](params);
        } else {
            return HtmlInterface[method]();
        }
    } catch (err) {
        console.log("--------------err------:" + err);
        return null;
    }
};
export default base;
