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
  /*带参数的*/
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
  /* if (Object.prototype.toString.call(arguments[1]) === "[Object Object]") {
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
   }*/
};
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
    return _coreBridge('isInstallGame', method)
  },
  isGameNeedUpdate: function (method) {
    return _coreBridge('isGameNeedUpdate', method)
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
  getGameDownloadProgress: function (method) {
    return _coreBridge('getGameDownloadProgress', method);
  },
  startAppDetail: function (method) {
    _coreBridge('startAppDetail', method)
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
  openActivity: function (className, extraString, extraInt, boolean) {
    _coreBridge('openActivity', className, extraString, extraInt, boolean);
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
  isWebHasError: function (boolean, url) {
    url = url || location.href;
    _coreBridge('isWebHasError', boolean, url)
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
  payForProduct: function (payInfo, backFn) {
    window.payForProductResult = function (result) {
      backFn(result)
    };
    _coreBridge('payForProduct', payInfo)
  },
  getProvinceNameById: function (provinceNo) {
    return _coreBridge('getProvinceNameById', provinceNo)
  },
  getCityNameById: function (provinceNo, cityNo) {
    return _coreBridge('getCityNameById', provinceNo, cityNo)
  },
  getdistrictNameById: function (provinceNo, cityNo, countyNo) {
    return _coreBridge('getdistrictNameById', provinceNo, cityNo, countyNo)
  },
  setCornerState: function (method, boolean) {
    _coreBridge('setCornerState', method, boolean)
  },
  openGame: function (method) {
    _coreBridge('openGame', method);
  },
  setIsRefresh: function (method) {
    _coreBridge('setIsRefresh', method);
  },
  getGamePackageName: function (method) {
    _coreBridge('getGamePackageName', method)
  },

}
