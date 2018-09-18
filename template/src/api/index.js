/*
 * @Author: zhangxiang
 * @Date: 2018/9/18
 * @Last Modified by: zhangxiang
 * @Last Modified time: 2018/9/18
 */
import request from '@/utils/request'
import config from './apis'

/**
 * 接口API通用方法
 * params {
   *  url: '',    请求url(对应api连接的别名)
   *  method: '', 请求方法
   *  data,       请求数据
   *  headers     请求头(根据需要)
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
