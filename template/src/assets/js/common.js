/**
 * @common
 * @author  stylehuan
 * @create  2016-12-05 11:38
 */
import mockHeaders from "../../../mock/headers";

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

base.getAppMethod = function (method, ...params) {
    console.log("--调用app接口---:" + method, "params:" + params);

    if (method == "getHeaderInfo") {
        return mockHeaders;
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
