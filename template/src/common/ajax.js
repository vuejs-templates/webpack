/**
 * ajax request help
 */
import cookie from './cookie'
export default {
  baseUrl: 'replacing_api',
  $http: null,
  init (Vue, router) {
    this.$http = Vue.http
    // vue-resource global configure
    Vue.http.headers.common['channelType'] = 'wx'
      // TODO: nedd check 'credentials' 是否是跨域属性
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
              next = encodeURIComponent('#/cus_day')
            } else {
              next = encodeURIComponent(window.location.hash)
            }
            window.location.href = 'replacing_auth?next=' + next
          }
        }
      })
    })
  },
  parse (path, id) {
    if (typeof id === 'string') {
      return path + '/' + 'id'
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
  },
  query (path) {
    let url = ''
    return (id, expand) => {
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
  },
  // 增
  create (path) {
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
  },
  // put 方法~
  put_way (path) {
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
  },
  // patch 方法~
  patch (path) {
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
}
