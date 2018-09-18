import axios from 'axios'

axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

const fetch = (url, options) => {
  const { method = 'get', data, contentType = 'application/json;charset=UTF-8', headers = {} } = options
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {params: data, headers: Object.assign({'Content-Type': contentType}, headers)})
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
  return res
}

function handleError (error) {
  const data = error.response.data
  if (data.errors) {
    window.alert(`${data.message}：${data.errors}`, 5)
  } else if (data.error) {
    window.alert(`${data.error}：${data.error_description}`, 5)
  } else {
    window.alert('未知错误！', 5)
  }
  return { success: false }
}

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(handelData)
    .catch(handleError)
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
