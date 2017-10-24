/**
 * Created by cuppi on 2017/10/24.
 */

import {ROOT} from '../mutations';

const defaultState = {
  showLoading: false,
  alertQuestion: {
    showAlert: false,
    title: '提示',
    isTitleShow: false,
    content: '',
    leftCallback: () => {
    },
    rightCallback: () => {
    },
    leftText: '取消',
    isLeftTextShow: false,
    rightText: '确定'
  }
};
const rootModule = {
  state:{
    showLoading: defaultState.showLoading,
    alertQuestion: defaultState.alertQuestion
  },
  mutations: {
    [ROOT.SHOW_LOADING](state, bool) {
      state.showLoading = bool;
    },
    [ROOT.ALERT_QUESTION](state, options) {
      state.alertQuestion = Object.assign(defaultState.alertQuestion, options);
    }
  }
};

export default rootModule;

