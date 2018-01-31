/**
 * Created by nocoolyoyo on 2017/12/19.
 */
//引入axios请求封装
require('es6-promise').polyfill();
import axios from 'axios'

axios.defaults.baseURL = '/';
axios.defaults.headers.post['Accept'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 60000;              //请求超时60s

axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data);
}];

export default  axios;
