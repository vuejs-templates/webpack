/**
 * ajax request help
 */
import Vue from 'vue'
import vueResource from 'vue-resource'
import cookie from './cookie'

class Ajax {

  constructor(Vue, options) {
    Vue.use(vueResource)
    this.$http = Vue.http
    this.baseUrl = options && options.baseUrl ? options.baseUrl : 'replacing_api'
    this.authUrl = options && options.authUrl ? options.authUrl : 'replacing_auth'
    this.queryMap = {}
    this.createMap = {}
    this.putWayMap = {}
    this.patchMap = {}

    // vue-resource global configure
    Vue.http.headers.common['channelType'] = 'wx'

    // vue-resource 拦截器，一些跨域的请求添加csrftoken
    Vue.http.interceptors.push((req, next) => {
      let csrftoken = cookie.getCookie('csrf-token')
      if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(req.method) && !Vue.http.credentials) {
        Vue.http.headers.common['X-CSRF-Token'] = csrftoken
      }
      next()
    })

    // 后端请求不支持json格式的数据
    Vue.http.options.emulateJSON = true

    // ajax 全局错误处理(vue-resource 拦截器)
    Vue.http.interceptors.push((req, next) => {
      // continue to next interceptor
      next((res) => {
        if (!res.ok) {
          // 处理状态码错误
          if (res.status === 404) {
            console.log('请求发生404错误!')
          } else if (res.status === 500) {
            console.log('请求发生500错误!')
          } else if (res.status === 504) {
            console.log('请求超时')
          } else if (res.status === 401) {
            let next = ''
            if (window.location.hash === '') {
              next = encodeURIComponent('')
            } else {
              next = encodeURIComponent(window.location.hash)
            }
            window.location.href = this.authUrl + '?next=' + next
          }
        }
      })
    })
  }

  parse(path, id) {
    if (typeof id === 'string') {
      return path + '/' + id
    }
    if (typeof id === 'object') {
      let search = '?'
      let counter = 0
      for (let key in id) {
        if (counter) search += '&'
        search += key + '=' + id[key]
        counter++
      }
      return path + search
    }
    return path
  }

  query(path) {
    if (!this.queryMap[path]) { // cache path closure
      let url = ''
      this.queryMap[path] = (id, expand) => {
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        let newPath = url
        if (id) {
          newPath = this.parse(url, id)
        }
        return this.$http.get(this.baseUrl + newPath).then((res) => {
          return res.json()
        })
      }
    }
    return this.queryMap[path]
  }

  // 增
  create(path) {
    if (!this.createMap[path]) { // cache path closure
      let url = ''
      return (data, expand) => {
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        return this.$http.post(this.baseUrl + url, data).then((res) => {
          return res.json()
        })
      }
    }
    return this.createMap[path]
  }

  // put 方法~
  putWay(path) {
    if (!this.putWayMap[path]) { // cache path closure
      let url = ''
      return (data, expand) => {
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        return this.$http.put(this.baseUrl + url, data).then((res) => {
          return res.json()
        })
      }
    }
    return this.putWayMap[path]
  }

  // patch 方法~
  patch(path) {
    if (!this.patchMap[path]) { // cache path closure
      let url = ''
      return (data, expand) => {
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        return this.$http.patch(this.baseUrl + url, data).then((res) => {
          return res.json()
        })
      }
    }
    return this.patchMap[path]
  }
}

export default new Ajax(Vue)
