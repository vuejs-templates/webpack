import axios from 'axios';
import Vue from './vueutil';
import { homePage, getCookie, delCookie } from './util';
import { Message, MessageBox } from 'element-ui';

// import router from '@/router'

// axios配置
axios.defaults.timeout = 50000;
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : ''; // 设置开发时跨域求后台数据的基础url;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
var loginOut = function () {
};

let loading;
// axios request 拦截器
axios.interceptors.request.use(
  config => {
    // if (typeof config.resoureType === "undefined") {
    // } else {
    //     // setCookie("mr", config.resoureType);
    //     config.headers["mm"] = config.resoureType;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// axios response  拦截器
axios.interceptors.response.use(
  response => {
    if (loading) {
      loading.close();
    }
    return response;
  },
  error => {
    if (loading) {
      loading.close();
    };
    return Promise.reject(error.response.data);
  });

export default axios;
