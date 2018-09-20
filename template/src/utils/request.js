import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// axios.defaults.baseURL = newband.app.admin.API_HOST
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.headers.common['UserName'] = 'fanjuan@tuhu.cn'
let num = 0
axios.interceptors.request.use((config) => {
  // alert("请求前拦截！")

  if (num === 0) {
    store.commit('app/updateState', {
      pageLoading: true
    })
  }
  num++
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((config) => {
  num--
  if (num === 0) {
    store.commit('app/updateState', {
      pageLoading: false
    })
  }
  return config
}, (err) => {
  num--
  if (num === 0) {
    store.commit('app/updateState', {
      pageLoading: false
    })
  }
  return Promise.reject(err)
})

const fetch = (url, options) => {
  const { method = 'get', data, contentType = 'application/json;charset=UTF-8', headers = {} } = options
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {params: data}, { headers: Object.assign({'Content-Type': contentType}, headers) })
    case 'delete':
      return axios.delete(url, { data }, { headers: Object.assign({'Content-Type': contentType}, headers) })
    case 'head':
      return axios.head(url, data, { headers: Object.assign({'Content-Type': contentType}, headers) })
    case 'post':
      return axios.post(url, JSON.stringify(data), { headers: Object.assign({'Content-Type': contentType}, headers) })
    case 'put':
      return axios.put(url, JSON.stringify(data), { headers: Object.assign({'Content-Type': contentType}, headers) })
    case 'patch':
      return axios.patch(url, data, { headers: Object.assign({'Content-Type': contentType}, headers) })
    default:
      return axios(options)
  }
}

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }

  const error = new Error(res.statusText)
  error.response = res
  throw error
}

function handelData (res) {
  const data = res.data
  if (data.code !== 0 && data.code !== '0000') {
    if (data.message) {
      Message(data.message)
    } else if (data.Message) {
      Message(data.Message)
    }
    return false
  }
  if (typeof data.data === 'string') {
    return JSON.parse(data.data)
  } else if (typeof data.DATA === 'string') {
    return JSON.parse(data.DATA)
  } else if (typeof data.ResponseContent === 'string') {
    return JSON.parse(data.ResponseContent)
  } else {
    return (data.data || data.DATA || data.ResponseContent)
  }
}

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(handelData)
}

export function get (url, options) {
  return request(url, { ...options, method: 'get' })
}

export function post (url, options) {
  return request(url, { ...options, method: 'post' })
}

export function put (url, options) {
  return request(url, { ...options, method: 'put' })
}

export function deleted (url, options) {
  return request(url, { ...options, method: 'deleted' })
}
