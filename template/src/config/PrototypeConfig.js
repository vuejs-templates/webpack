/**
 * Created by cuppi on 2017/10/23.
 */
import GlobalConstant from '../util/GlobalConstant';
import NativeBridge from '../util/NativeBridge';

import DateTool from '../tool/DateTool.js';
import NumberTool from '../tool/NumberTool.js';
import ArrayTool from '../tool/ArrayTool.js';
import StringTool from '../tool/StringTool.js';
import UrlTool from '../tool/UrlTool.js';

class PrototypeConfig {
  static createPrototype(vue) {
    vue.prototype.GlobalConstant = GlobalConstant;
    vue.prototype.NativeBridge = NativeBridge;

    vue.prototype.DateTool = DateTool;
    vue.prototype.NumberTool = NumberTool;
    vue.prototype.ArrayTool = ArrayTool;
    vue.prototype.StringTool = StringTool;
    vue.prototype.UrlTool = UrlTool;

    // 判断手机型号
    let ua = navigator.userAgent.toLowerCase();
    if (!/iphone|ipad|ipod|itouch/.test(ua)) {
      vue.prototype.ScreenSize = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
      vue.prototype.OSType = 'android';
    } else {
      vue.prototype.ScreenSize = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
      vue.prototype.OSType = 'ios';
    }

    vue.prototype.showLoading = function () {
      if (!this.loadingCounter) {
        this.loadingCounter = 0;
      }
      this.loadingCounter++;
      GlobalConstant.store.commit('SHOW_LOADING_MUTATION', true)
    }

    vue.prototype.closeLoading = function (obj) {
      if (this.loadingCounter < 1) {
        console.log('closeLoading 最先调用');
        return;
      }
      if (--this.loadingCounter < 1) {
        GlobalConstant.store.commit('SHOW_LOADING_MUTATION', false)
      }
    };

    /**
     * 列表便捷方法
     * @param el
     * @returns {*}
     */
    Array.prototype.remove = function (el) {
      let index = this.indexOf(el);
      if (index === -1) {
        return null;
      }
      return this.splice(index, 1)[0];
    };
    Array.prototype.copy = function () {
      return this.concat([]);
    };
    Array.prototype.removeFromArray = function (elList) {
      for (let el of elList) {
        let index = this.indexOf(el);
        if (index === -1) {
          continue;
        }
        this.splice(index, 1);
      }
    };

    Array.prototype.contain = function (el) {
      return this.indexOf(el) !== -1;
    };
  }
}

export default PrototypeConfig;
