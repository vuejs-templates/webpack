{{#axios}}
import axios from 'axios'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/axios}}

/**
 * [get,post,put,delete      [封装请求]]
 * @param  {[string]} url    [请求地址]
 * @param  {[object]} par    [请求数据]
 * @param  {[object]} axios  [默认配置]
 * @return {[object]}        [axios]
 */

export default {
  get(url, params) {
    return axios({
      url,
      baseURL,
      params,
      method: 'get',
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        return checkStatus(response)
      })
      .then((res) => {
        return checkCode(res)
      })
      .catch((err) => {
        return checkErr(err)        
      })
  },
  post(url, data) {
    return axios({
      url,
      data,
      baseURL,
      method: 'post',
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return data
      }]
    })
      .then((response) => {
        return checkStatus(response)
      })
      .then((res) => {
        return checkCode(res)
      })
      .catch((err) => {
        return checkErr(err)        
      })
  },
  put(url, data) {
    return axios({
      url,
      data,
      baseURL,
      method: 'put',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return data
      }]
    })
      .then((response) => {
        return checkStatus(response)
      })
      .then((res) => {
        return checkCode(res)
      })
      .catch((err) => {
        return checkErr(err)        
      })
  },
  delete(url, data) {
    return axios({
      url,
      data,
      baseURL,
      method: 'delete',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return data
      }]
    })
      .then((response) => {
        return checkStatus(response)
      })
      .then((res) => {
        return checkCode(res)
      })
      .catch((err) => {
        return checkErr(err)        
      })
  },
  alls(requests) {
    return axios.all(requests)
      .then(axios.spread(function (...res) {
        return checkStatus(res)
      }))
  }
}