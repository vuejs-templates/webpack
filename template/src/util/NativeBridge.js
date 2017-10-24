/**
 * Created by cuppi on 2017/10/24.
 */

/* eslint-disable */
let instance = null;

class NativeBridge{
  constructor() {
    if (!instance) {
      instance = this;
      global.locationCallback = this.locationCallback.bind(this);
      this.nativeLocationCallback = null;
    }
    return instance;
  }

  locationCallback(param) {
    if (this.nativeLocationCallback) {
      this.nativeLocationCallback(param);
    }
  }

  static defaultBridge() {
    return new NativeBridge();
  }

  /**
   * 当前是否为IOS端
   * @returns {boolean}
   */
  static isIOS() {
    let u = navigator.userAgent, app = navigator.appVersion;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  /**
   * 当前是否为安卓端
   * @returns {boolean}
   */
  static isAndroid() {
    let u = navigator.userAgent, app = navigator.appVersion;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  }

  /**
   * 回退APP
   */
  static backApp() {
    //android终端或者uc浏览器
    let isAndroid = instance.isAndroid();
    let isiOS = instance.isIOS();
    if (isAndroid) {
    } else if (isiOS) {
    } else {
      window.alert("目前仅支持Android和iOS系统的手机");
    }
  }

  /**************************************  start   **************************************************/
  /**
   * 内部获取用户定位加密字符串
   * @private
   */
  _getUserLocationSecret() {
    /**
     ***********************  实现定位调用 ***************************
     **/
  }

  /**
   * 获取用户定位加密字符串
   * @returns {Promise}
   */
  getUserLocationSecret() {
    return new Promise((resolve, reject) => {
      this.nativeLocationCallback = (locationSecret) => {
        resolve(locationSecret);
      }
      this._getUserLocationSecret();
    })
  }

  /**
   * 获取用户定位信息
   * @returns {Promise}
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      this.getUserLocationSecret().then()
      reject(new Error('未实现的方法'));
    })
  }

  /** ************************************    end    *************************************************/

  /**
   * 解密方法
   * @param secret
   * @returns {Promise}
   * @private
   */
  _decryptSecret(secret) {
    return new Promise((resolve, reject) => {
      /**
       ***********************  实现解密方法调用 ***************************
       **/
      resolve(secret);
    });
  }

  /**
   * 加密方法
   * @param secret
   * @returns {Promise}
   * @private
   */
  _encryptSecret(secret) {
    return new Promise((resolve, reject) => {
      /**
       ***********************  实现加密方法调用 ***************************
       **/
      resolve(secret);
    });
  }
}

export default NativeBridge;

/* eslint-enable */
