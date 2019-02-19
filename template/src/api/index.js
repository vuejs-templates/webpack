/*
 * @Author: luox-e
 * @Date: 2019-02-19 14:29:36
 * @Last Modified by: glodon
 * @Last Modified time: 2019-02-19 14:43:08
 */
import axios from 'axios'
import {
  MessageBox
} from 'element-ui'

let api = '/api'
if (process.env.NODE_ENV === 'development') {
  api = '/api/'
}

const baseURL = api
const Axios = axios.create({
  baseURL: baseURL, // 因为我本地做了反向代理
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
Axios.interceptors.response.use(
  function (response) {
    // 返回响应时做一些处理
    if (
      response.request.responseURL &&
      response.request.responseURL.indexOf(
        'Services/Identification/Server/login.ashx'
      ) > 0
    ) {
      this.$router.push({
        path: '/login'
      })
      // window.location = '/Services/Identification/Server/Login.aspx'
    } else {
      if (response) {
        return response.data
      } else {
        const msgConfig = {
          title: '系统错误',
          message: response.data.ResultDetailMsg
        }
        MessageBox(msgConfig)
      }
    }
  },
  function (error) {
    if (error.response) {
      // const msgConfig = {
      //   title: '请求错误',
      //   message: error.response.status
      // }
      // MessageBox(msgConfig)
    }
    // 当响应异常时做一些处理
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  },
  baseURL
}
