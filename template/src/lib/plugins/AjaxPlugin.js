/**
 * Created by su9er on 16/8/11.
 */

import Resource from 'vue-resource'

export default {
  install(Vue, option) {
    Vue.use(Resource)
    const error = (statusText) =
  >
    {
      let PromptMsg = ''
      switch (statusText) {
        case 'error':
          PromptMsg = '请求错误'
          break
        case 'parseerror':
          PromptMsg = '解析错误'
          break
        case 'abort':
          PromptMsg = '请求中断'
          break
        case 'timeout':
          PromptMsg = '请求超时'
          break
        default:
          PromptMsg = '未知错误'
          break
      }
      return PromptMsg
    }
    Vue.http.interceptors.push((request, next) = > {
      next(response = > {
      if (response.status === 200
  )
    {
      if (response.data.Result === 1) {
        return response
      } else {
        return Promise.reject(data)
      }
    }
  else
    {
      return Promise.reject({PromptMsg: error(response.statusText), Result: -999})
    }
  })
  })
  }
}
