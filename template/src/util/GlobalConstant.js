/**
 * Created by cuppi on 2017/10/23.
 * 全局通用常量
 */
import ReleaseConfig from 'release-config'

class GlobalConstant {
  static baseUrl = ReleaseConfig.baseUrl;
  // 全局vuex对象
  static store = null;
  // 全局路由对象
  static router = null;
}

export default GlobalConstant;
