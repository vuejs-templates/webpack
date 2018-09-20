import request from '@/utils/request'
import config from './config'

/**
 * 接口API通用方法
 * params {
   *  url: '',    请求url(对应api连接的别名)
   *  method: '', 请求方法
   *  data,       请求数据
   *  headers     请求头(根据需要)，也可在oxios中全局设置header
   *  joinId      拼接url后面的id(非必填)
   * }
 */
export async function APISERVER (param) {
  if (!config[param.url]) {
    throw new Error('请配置接口URL')
  } else {
    let opt = {method: param.method}
    opt = (param && param.data) ? Object.assign({}, opt, {data: param.data}) : opt
    opt = (param && param.headers) ? Object.assign({}, opt, {headers: param.headers}) : opt
    let url = (param && param.joinId) ? config[param.url] + '/' + param.joinId : config[param.url]
    return request(url, opt)
  }
}
