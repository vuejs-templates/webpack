/**
 * Created by cuppi on 2017/10/24.
 */
import {LOGIN} from '../mutations';
const defaultLogin = {
  session: {
  },
  account: {
  },
  logined: false
};

const loginModule = {
  state: {
    session: defaultLogin.session,
    account: defaultLogin.account,
    logined: defaultLogin.logined
  },
  mutations: {
    [LOGIN.UPDATE_LOGIN](state, options = defaultLogin){
      state = {...state, ...options};
    },
    [LOGIN.UPDATE_ACCOUNT](state, options = defaultLogin.account){
      state.account = {...state.account, ...options.account};
    }
  }
}
export default loginModule;
