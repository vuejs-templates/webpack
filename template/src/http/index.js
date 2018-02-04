/**
 * Created by nocoolyoyo on 2017/12/19.
 * 接口类请求类的功能统一放在http文件夹下面，对于http这个文件夹命名我是很纠结的，想过用service，
 * 但其实并不包含store,用interface,request也不友好，只有http比较形象
 */
//加入低端机的promise兼容，自行安装es6-promise模块
//require('es6-promise').polyfill();
//加入参数序列化工具，有必要的话自行安装
//import qs from 'qs'
//引入axios请求封装
import axios from 'axios'

// axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = '';
axios.defaults.headers.post['Accept'] = '*';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 60000;              //请求超时60s
axios.defaults.transformRequest = [function (data) {
}];
export default  axios;
