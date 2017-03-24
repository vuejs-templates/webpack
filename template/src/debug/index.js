/**
 * only for debug control
 */
// 清空sessionStorage
import cache from '../common/cache'
import url from '../common/url'
cache.clearSessionData()
// uglify 条件编译
if (typeof DEBUG === 'undefined') {
  let debug = url.getSearch().debug
  if (debug === '1') {
    cache.setSessionData('debug', true)
  } else if (debug === '2') {
    cache.setSessionData('debug', false)
  }
  DEBUG = cache.getSessionData('debug')
}
