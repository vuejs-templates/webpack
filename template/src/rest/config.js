/**
 * rest 请求配置
 */
import ajax from '../common/ajax'
export default {
  // 4s店
  store: {
    getStoreInfo: ajax.query('/store')
  },
  // 微信配置相关
  wx: {
    getWeChatConfigResource: ajax.query('')
  }
}
