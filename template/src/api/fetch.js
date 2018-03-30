import axios from 'axios'
import store from '../store'
const qs = require('qs')

// 创建axios实例
const service =axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 150000, // 请求超时时间
    headers: {
        "Content-Type": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded" // 适用于大部分情况
      //   "Content-Type": "multipart/form-data" // 适用于文件上传
    },
    // transformRequest: [function (data) {
    //   console.log(data)
    //   if (data) {
    //     Object.keys(data).forEach((key) => {
    //       if ((typeof data[key]) === 'object') {
    //         data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
    //       }
    //     })
    //     data = qs.stringify(data)
    //     return data
    //   }
    // }]
  })



// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data
    if (res.code === 200 || res.code === 403) {
      return response
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error)
  }
)

export default service
