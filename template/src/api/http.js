import axios from 'axios'
import { Message } from 'element-ui'

const config = {
  BasicUrl: ''
}
const instance = axios.create({
  baseURL: config.BasicUrl,
  timeout: 30000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json;charset=UTF-8'}
})
instance.interceptors.response.use(function (response) {
  console.log(response)
  if (response.headers.sessionstatus === 'timeout' || response.headers.Sessionstatus === 'timeout') {
    window.location.href = window.location.origin + '/rbac-backend/login' // 登录超时，跳转单点登录链接
  }
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  Message.error('网络异常，请重试')
  return Promise.reject(error)
})

export default instance
