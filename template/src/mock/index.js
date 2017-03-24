/**
 * all mock data
 */
import Mock from 'mockjs'
import cache from '../common/cache'
import url from '../common/url'
// mock 开关
let mock = url.getSearch().mock
if (mock === '1') {
  cache.setSessionData('mock', true)
} else if (mock === '2') {
  cache.setSessionData('mock', false)
}
Mock.setup({
  timeout: 400
})
// 中升公众号2.0首页
import './store/index'
