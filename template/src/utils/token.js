import Oidc from 'oidc-client'
import axios from 'axios'
// import store from '../store'
class Token {
  constructor () {
    this.config = this._config()
    this.mgr = this.init(this.config)
    // this.getUser();
    // this.initEvents();
  }

  init (config) {
    const { redirect, silentRedirect, authorityURL } = this.config
    return new Oidc.UserManager({
      authority: authorityURL,
      client_id: 'site_commerce',
      redirect_uri: window.location.origin + redirect,
      response_type: 'id_token token',
      scope: 'name email openid',
      loadUserInfo: true,
      accessTokenExpiringNotificationTime: 60,
      silent_redirect_uri: window.location.origin + silentRedirect,
      automaticSilentRenew: true,
      revokeAccessTokenOnSignout: true,
      filterProtocolClaims: false
    })
  }

  _config () {
    return (function () {
      let redirect, silentRedirect, authorityURL, ShopId
      if (window.location.origin.indexOf('tuhu') > -1) {
        redirect = '/banpen/static/callback.html'
        silentRedirect = '/banpen/static/silent.html'
        if (window.location.origin.indexOf('work') > -1) {
          console.log('silentRedirect', silentRedirect, 'redirect', redirect)
          // work环境
          ShopId = window.sessionStorage.getItem('shopId')
          // store.commit('updateState', ShopId)
          // console.log("from work---", store.state.app._shopId)
          authorityURL = 'https://access.tuhu.work'
          if (!ShopId) {
            alert('请从sdev.tuhu.work快捷入口登录！')
            window.location.href = 'https://sdev.tuhu.work'
          }
          // ShopId = 38
        } else if (window.location.origin.indexOf('ut') > -1) {
          // UT环境
          // ShopId = window.sessionStorage.getItem("shopId")
          // document.cookie = `ShopId=7597;path=/`
          // window.sessionStorage.setItem("shopId", 7597)
          ShopId = window.sessionStorage.getItem('shopId')
          // store.commit('updateState', ShopId)
          authorityURL = 'https://accessut.tuhu.cn'
          if (!ShopId) {
            alert('请从sdevut.tuhu.cn快捷入口登录！')
            window.location.href = 'https://sut.tuhu.cn'
          }
        } else if (window.location.origin.indexOf('shop.tuhu.cn') > -1) {
          ShopId = window.sessionStorage.getItem('shopId')
          // store.commit('updateState', ShopId)
          // 正式环境
          authorityURL = 'https://access.tuhu.cn'
          if (!ShopId) {
            alert('请从s.tuhu.cn快捷入口登录！')
            window.location.href = 'https://s.tuhu.cn'
          }
        }
      } else {
        // 本地环境
        authorityURL = 'https://access.tuhu.work'
        redirect = '/static/callback.html'
        silentRedirect = '/static/silent.html'
        document.cookie = `ShopId=38;path=/`
        window.sessionStorage.setItem('shopId', 38)
        ShopId = window.sessionStorage.getItem('shopId')
        // store.commit('updateState', ShopId)
        // ShopId = 38
      }
      return {
        redirect,
        silentRedirect,
        authorityURL,
        ShopId
      }
    })()
  }

  getUser (cb) {
    const self = this
    this.mgr
      .getUser()
      .then(user => {
        console.log('333--', self.config.ShopId)
        console.log(user)
        if (user == null && self.config.ShopId) {
          self.signIn(
            'name email openid',
            'id_token token'
          )
        } else {
          document.cookie = `token=${user.access_token};path=/`
          window.localStorage.setItem('token', user.access_token)
          this.setToken(user.access_token)
          cb && cb(user.access_token)
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  signIn (scope, responsetype) {
    // debugger
    this.mgr
      .signinRedirect({
        scope: scope,
        response_type: responsetype
      })
      .catch(function (err) {
        console.log(err)
      })
  }
  signOut () {
    this.signIn(
      'name email openid',
      'id_token token'
    )
  }
  silentFail () {
    alert('登录超时，请重新登录！')
    this.signIn(
      'name email openid',
      'id_token token'
    )
  }
  initEvents () {
    var self = this
    this.mgr.events.addUserLoaded(user => {
      /* this.$Modal.warning({
        title: "提示",
        content: "请重新登陆"
      }); */
      // 会话重新建立时触发
      self.getUser()
      console.log('User loaded...')
    })
    this.mgr.events.addUserUnloaded(() => {
      console.log('User logged out locally')
    })
    this.mgr.events.addAccessTokenExpiring(() => {
      // 令牌过期之前引发
      // console.log("Access token expiring...");
    })
    this.mgr.events.addSilentRenewError(err => {
      // 静默更新失败
      console.log('Silent renew error: ' + err.message)
      self.getUser()
    })
    this.mgr.events.addUserSignedOut(() => {
      console.log('User signed out of OP')
      self.silentFail()
    })
  }

  setToken (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export default new Token()
