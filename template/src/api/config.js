{{#axios}}
import axios from 'axios'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/axios}}
export const commonParams = {
  pageIndex: 1,
  pageSize: 10
}

/**
 * [请求时拦截器和响应时拦截器]
 * request      [请求拦截器]
 * response     [响应时拦截器]
 * checkStatus  [http状态码正常，则直接返回数据]
 * checkCode    [http状态码异常，提示告诉用户]
 */
axios.interceptors.request.use(
  config => {
    // 请求时做一些处理
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    return config
  },
  error => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // 返回响应时做一些处理
    return response
  },
  error => {
    // 当响应异常时做一些处理
    return Promise.resolve(error.response)
  }
)

export function checkStatus(response) {
  if (Array.isArray(response)) {
    return response.map(res => res)
  }
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  }
  // 异常状态下，把错误信息返回去
  return {
    status: response.status,
    msg: '网络异常'
  }
}

export function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  return res
}

export function checkErr(err) {
  // 错误信息，可以弹出一个错误提示，告诉用户
  return err
}