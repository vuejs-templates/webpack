/**
 * a plugin for wx jssdk
 * https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html
 */

import Vue from 'vue'
import wx from './jweixin-1.0.0'

export default class Wechat {
  static install() {}

  // 校验微信接口
  constructor(options) {
    this.wx = wx
    this.storeId = ''
    this.flag = false
    this.http = null
    this.location = {
      latitude: 0,
      longitude: 0
    }

    // 需要检测的JS接口列表，所有JS接口列表见附录2
    this.jsApiList = []

    // init fields
    Object.assign(this, options)

    let promise = new Promise((resolve, reject) => {
      let storeId = this.storeId
      if (storeId) {
        this.http({
          from_url: window.encodeURIComponent(window.location.href.split('#')[0])
        }, storeId + '/config/weixin').then((res) => {
          let data = res.data
          this.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: this.jsApiList
          })
          this.wx.ready(() => {
            // 判断当前客户端版本是否支持指定JS接口
            this.wx.checkJsApi({
              jsApiList: this.jsApiList,
              success: (res) => {
                this.flag = true
                resolve(res)
              },
              error: (res) => {
                this.flag = false
                reject(res)
              }
            })
          })
          this.wx.error((res) => {
            this.flag = false
            reject(res)
          })
        }, (res) => {
          reject(res)
        })
      } else {
        console.error('need storeId')
        reject({
          msg: 'need storeId'
        })
      }
    })
    return promise
  }

  setFlag(flag) {
    this.flag = flag
  }
}

function install() {
  if (install.installed) return
  install.installed = true
  Vue.mixin({
    beforeCreate() {
      const options = this.$options
      if (options.wechat) {
        this.$wechat = options.wechat
      } else if (options.parent && options.parent.$wechat) {
        this.$wechat = options.parent.$wechat
      }
    }
  })
}

Wechat.install = install
Wechat.version = '__VERSION__'
