import axios from "axios";
var instance = axios.create({});
instance.interceptors.request.use(
  function(config) {
    let url = config.url;
    if (url.indexOf("login") > -1) {
      // sessionStorage.setItem("uid", "");
      // config.headers.token = "";
    } else {
      config.headers.uid = sessionStorage.getItem("uid");
      //config.headers.uid = "ofgdy0eVfFbCwZCiaPsniPR0KeRo";
      console.log("当前请求的uid为:" + config.headers.uid);
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
export default instance;
