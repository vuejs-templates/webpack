/**
 * Created by cuppi on 2017/10/23.
 */

import {JNetworkConfig, JSDK} from 'jbzwebsdk';
import GlobalConstant from '../util/GlobalConstant';
import DataMap from '../sdkconfig/jbz.network.unify';
import UrlMap from '../sdkconfig/jbz.url.config';

export default class Network {
  static createNetwork(vue) {
    let baseUrl = GlobalConstant.baseUrl;
    JNetworkConfig.setConfig({
      baseUrl,
      delegate: this,
      inType: '',
      dataMap: DataMap,
      urlMap: UrlMap
    })
  }

  // 登录参数
  static loginParas() {
    let account = GlobalConstant.store.state.accountModule.account;
    if (account) {
      return account;
    } else {
      return {};
    }
  }

  // 城市参数
  static cityParas() {
    return GlobalConstant.store.state.locationModule.userLocationCity;
  }

  // 坐标(经纬度)参数
  static coordinateParas() {
    return GlobalConstant.store.state.locationModule.location;
  }

  /**
   ****** 在下面添加自定义变量 *******
   **/

  /*
   static someParas() {
      return {};
   }
   */
}

