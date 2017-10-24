/**
 * Created by cuppi on 2017/10/24.
 */

import RootStore from '../redux';
import GlobalConstant from '../util/GlobalConstant';

class StoreConfig {
  static initStore() {
    GlobalConstant.store = RootStore;
    return GlobalConstant.store;
  }
}

export default StoreConfig;
