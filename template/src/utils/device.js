class browser {
  constructor() {
    this.versions = this._versions()
    this.language = (navigator.browserLanguage || navigator.language).toLowerCase()
    this.isMobile = (this.versions.mobile || this.versions.ios || this.versions.android || this.versions.iPhone || this.versions.iPad)
  }
  _versions() {
    let u = navigator.userAgent,
      app = navigator.appVersion;
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1, //android终端
      linux: u.indexOf('Linux') > -1, //或者Linux浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weChat: u.indexOf('micromessenger') == -1 //是否微信浏览器
    }
  }
}

export default new browser()
