/**
 * wx jssdk 封装
 * https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html
 */

// require('https://res.wx.qq.com/open/js/jweixin-1.0.0.js')
import cache from './cache'
import util from './util'
import rest from '../rest'
const wx = window.wx

export default {
  wxFlag: false,
  location: {
    wxLatitude: 0,
    wxLongitude: 0
  },
  setWxFlag(flag) {
    this.wxFlag = flag
  },
  // 校验微信接口
  wechatConfig() {
    let self = this
    let promise = new Promise((resolve, reject) => {
      let storeId = cache.getLocalStorageData(util.keyMap.CACHE_STORE_ID)
      if (storeId) {
        rest.wx.getWeChatConfigResource({
          from_url: window.encodeURIComponent(window.location.href.split('#')[0])
        }, storeId + '/config/weixin').then((res) => {
          let data = res.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ['chooseWXPay', 'scanQRCode', 'getLocation', 'openLocation', 'chooseWXPay', 'hideMenuItems', 'showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
          })
          wx.ready(() => {
            // 判断当前客户端版本是否支持指定JS接口
            wx.checkJsApi({
              jsApiList: ['chooseWXPay', 'scanQRCode', 'getLocation', 'openLocation', 'chooseWXPay', 'hideMenuItems', 'showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2
              success(res) {
                self.wxFlag = true
                resolve(res)
              }
            })

            // 获取地址
            // wx.getLocation({
            //   type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //   success: (res) => {
            //     self.location.wxLatitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            //     self.location.wxLongitude = res.longitude // 纬度，浮点数，范围为90 ~ -90
            //   },
            //   cancel: function (res) {}
            // })
          })
          wx.error((res) => {
            self.wxFlag = false
            reject(res)
          })
        }, (res) => {
          reject(res)
        })
      } else {
        reject({
          msg: 'need storeId'
        })
      }
    })
    return promise
  },
  payByWx(timestamp, nonceStr, packageStr, signType, paySign, success, cancel, fail) {
    wx.chooseWXPay({
      timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
      package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paySign, // 支付签名
      success: success,
      cancel: cancel,
      fail: fail
    })
  },
  /**
   * 扫一扫
   */
  scanQRCode(callback) {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: callback
    })
  },

  // 位置相关的微信接口
  openLocationByWx(latitude, longitude, name, address, scale, infoUrl) {
    wx.openLocation({
      latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
      name: name, // 位置名
      address: address, // 地址详情说明
      scale: scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
    })
  },
  getLocationByWx(type) {
    type = type || 'gcj02'
    let promise = new Promise((resolve, reject) => {
      // 获取地址
      wx.getLocation({
        type: type, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          // res.latitude // 纬度，浮点数，范围为90 ~ -90
          // res.longitude // 纬度，浮点数，范围为90 ~ -90
          resolve(res)
        },
        cancel: (res) => {
          reject(res)
        }
      })
    })
    return promise
  },
  // 分享到朋友圈
  shareTimeline(data) {
    wx.onMenuShareTimeline(data)
  },
  // 分享给朋友
  ShareAppMessage(data) {
    wx.onMenuShareAppMessage(data)
  }
}
