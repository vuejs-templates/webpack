/**
 * Created by jbz on 2017/10/24.
 */
import {JNetwork, JNetworkOther} from 'jbzwebsdk';
import GlobalConstant from '@/util/GlobalConstant';

export default class NetworkOthers extends JNetworkOther {
  // static locationInfo = {
  //   latitude: GlobalConstant.store.state.location.location.latitude,
  //   longitude: GlobalConstant.store.state.location.location.longitude,
  //   cityId: GlobalConstant.store.state.location.userLocationCity.id
  // }

  static getAddress(location) {
    return JNetwork.POST('/main/refreshlocation', location)
  }

  // 城市列表
  static cityList() {
    return JNetwork.POST('/main/cities',
      {
        latitude: GlobalConstant.store.state.location.location.latitude,
        longitude: GlobalConstant.store.state.location.location.longitude,
        cityId: GlobalConstant.store.state.location.userLocationCity.id
      })
  }

  // 搜索接口
  static search(query, lastKey) {
    return JNetwork.POST('/main/search',
      {
        latitude: GlobalConstant.store.state.location.location.latitude,
        longitude: GlobalConstant.store.state.location.location.longitude,
        cityId: GlobalConstant.store.state.location.userLocationCity.id,
        query,
        lastKey
      })
  }

  static hotSearch() {
    return JNetwork.POST('/main/hotsearch', {
      cityId: GlobalConstant.store.state.location.userLocationCity.id
    })
  }
}
