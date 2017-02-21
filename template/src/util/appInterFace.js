/**
 * Created by yangCe on 2017/2/13.
 */
import base from "assets/js/common";
import mockHeaders from "../../mock/headers";
var _coreBridge = function (method) {
    var len = arguments.length;
    let paramsArray = [];
    //没参数的
    if (len == 1) {
        try {
            console.log("app接口:" + method);
            return HtmlInterface[method]();
        } catch (e) {
            console.log(e);
        }
    }
    for (var i = 0; i < len - 1; i++) {
        paramsArray[i] = arguments[i + 1];
    }
    try {
        console.log("app接口:" + method + "参数" + paramsArray);
        return (i = window.HtmlInterface)[method].apply(i, paramsArray)
    } catch (e) {
        console.log('---error---:' + e);
        return null;
    }
    if (Object.prototype.toString.call(arguments[1]) === "[Object Object]") {
        let method = arguments[0];
        let params = arguments[1];
        let paramsArray = [];
        var i;
        for (var i in params) {
            paramsArray.push(params[i])
        }
        try {
            console.log("app接口:" + method + "参数" + paramsArray);
            return (i = window.HtmlInterface)[method].apply(i, paramsArray)
        } catch (e) {
            console.log('---error---:' + e);
            return null;
        }
    }
}
export default {
    isLogined: function () {
        return _coreBridge('isLogined');
    },
    getUserId: function () {
        return _coreBridge('getUserId');
    },
    getUserName: function () {
        return _coreBridge('getUserName')
    },
    getHeaderInfo: function () {
        if (base.isLocal) {
            return mockHeaders;
        }
        return _coreBridge('getHeaderInfo')
    },
    setPageName: function (method) {
        _coreBridge('setPageName', method)
    },
    isInstallGame: function (method) {
        _coreBridge('isInstallGame', method)
    },
    isGameNeedUpdate: function (method) {
        _coreBridge('isGameNeedUpdate', method)
    },
    location: function () {
        return _coreBridge('location')
    },
    getTcyVersionName: function () {
        return _coreBridge('getTcyVersionName')
    },
    getTcyChannel: function () {
        return _coreBridge('getTcyChannel');
    },
    isBindMobile: function () {
        return _coreBridge('isBindMobile');
    },
    isNetConnect: function () {
        return _coreBridge('isNetConnect')
    },
    getGameDownloadProgress: function () {
        return _coreBridge('getGameDownloadProgress');
    },
    startAppDetail: function (method) {
        return _coreBridge('startAppDetail', method)
    },
    startDownloadList: function () {
        _coreBridge('startDownloadList');
    },
    openMyGame: function () {
        _coreBridge('openMyGame');
    },
    shareToWX: function (title, des, img, link, backFn) {
        window.isShareToWx = function (result) {
            backFn(result)
        };
        window.share = function (result) {
            backFn(result)
        };
        _coreBridge('shareToWX', title, des, img, link);
    },
    openLogin: function () {
        _coreBridge('openLogin')
    },
    openActivity: function (method) {
        _coreBridge('openActivity', method);
    },
    openHallhome: function (method) {
        _coreBridge('openHallhome', method)
    },
    openSettingActivity: function () {
        _coreBridge('openSettingActivity')
    },
    gameInstalledSuccess: function () {
        _coreBridge('gameInstalledSuccess');
    },
    openVC: function (method) {
        _coreBridge('openVC', method)
    },
    openVCFromStoryboardName: function (method) {
        _coreBridge('openVCFromStoryboardName', method)
    },
    openLocalstarActivity: function () {
        _coreBridge('openLocalstarActivity')
    },
    openAccountSafeActivity: function () {
        _coreBridge('openAccountSafeActivity')
    },
    isWebHasError: function (url) {
        url = url || location.href;
        _coreBridge('isWebHasError', true, url)
    },
    installedGame: function (method) {
        _coreBridge('installedGame', method)
    },
    startCamera: function (backFn) {
        _coreBridge('startCamera');
        window.showImg = function (result) {
            backFn(result);
        };
    },
    startPhoto: function (backFn) {
        _coreBridge('startPhoto');
        window.showImg = function (result) {
            backFn(result);
        };
    },
    downloadFile: function (link, appName) {
        _coreBridge('downloadFile', link, appName)
    },
    getTcyVersionCode: function (method) {
        _coreBridge('getTcyVersionCode', method)
    },
    copyText: function (method) {
        _coreBridge('copyText', method)
    },
    updateDuiHuan: function (method) {
        _coreBridge('updateDuiHuan', method)
    },
    updateTongbao: function (method) {
        _coreBridge('updateTongbao', method)
    },
    getArea: function (backFn) {
        _coreBridge('getArea');
        window.setArea = function (result) {
            backFn(result);
        };
    },
    payForProduct: function () {
        _coreBridge('payForProduct')
    },
    getProvinceNameById: function (provinceNo) {
        return _coreBridge('getProvinceNameById', provinceNo)
    },
    getCityNameById: function (provinceNo, cityNo) {
        return _coreBridge('getCityNameById', provinceNo, cityNo)
    },
    getdistrictNameById: function (provinceNo, cityNo, countyNo) {
        return _coreBridge('getdistrictNameById', provinceNo, cityNo, countyNo)
    }
}
