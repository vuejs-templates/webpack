import Vue from 'vue';
// import echarts from 'echarts'
import axios from './http.js';
import ruleType from './validate.js';
import moment from 'moment';

import vloading from '@/components/base/vLoading/';
// import table from '@/components/base/table.vue';
// import select from '@/components/base/select.vue';
// import selectTree from '@/components/base/selectTree.vue';
// import treeGrid from '@/components/base/TreeGrid.vue';
// import tree from '@/components/base/tree.vue';
// import myTransfer from '@/components/base/myTransfer.vue';
// import dialog from '@/components/base/dialog.vue';
// import time from '@/components/base/dateTime.vue';
// import upload from '@/components/base/fileUpload.vue';

import {
  getCookie,
  setCookie,
  delCookie,
  clearCookie,
  setLocal,
  getLocal,
  delLocal,
  clearLocal,
  setSession,
  getSession,
  delSession,
  clearSession,
  varType,
  extend,
  deepCopy
} from './util';

Vue.component(vloading.name, vloading); // loading组件
Vue.prototype.$vLoading = vloading; // 使用$vLoading方法调用组件,传入一个target
Vue.$vLoading = vloading;

// XXX 跳转到登录界面
Vue.prototype.$env = process.env.NODE_ENV;
window.$env = process.env.NODE_ENV;
Vue.prototype.$homePage = process.env.NODE_ENV === 'development' ? 'http://' + location.hostname + ':8080/cloud/login.html' : 'login.html';

Vue.prototype.getCookie = getCookie;
Vue.prototype.setCookie = setCookie;
Vue.prototype.delCookie = delCookie;
Vue.prototype.clearCookie = clearCookie;
Vue.prototype.setLocal = setLocal;
Vue.prototype.getLocal = getLocal;
Vue.prototype.delLocal = delLocal;
Vue.prototype.clearLocal = clearLocal;
Vue.prototype.setSession = setSession;
Vue.prototype.getSession = getSession;
Vue.prototype.delSession = delSession;
Vue.prototype.clearSession = clearSession;
Vue.prototype.$ajax = axios; // 设置全局的请求,子组件使用this.$ajax去发送请求;
Vue.prototype.$moment = moment;
// Vue.prototype.$echarts = echarts;

const STANDARDtIMEFORMAT = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss'];

var success1 = function () { };
var er1 = function () { };

Vue.prototype.$alertMsg = function (msg, title, type = 'success', success, err) {
  if (success === undefined) {
    success = success1;
  }
  if (err === undefined) {
    err = er1;
  }
  this.$confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  }).then(() => {
    success()
  }).catch(() => {
    err()
  });
}
Vue.prototype.$showMsg = function (msg, title, type = 'success') {
  this.$notify({
    title: title,
    message: msg,
    type: type
  });
};
// 注册全局组件
// Vue.component('da-table', table);
// Vue.component('da-selectTree', selectTree);
// Vue.component('da-select', select);
// Vue.component('da-treeGrid', treeGrid);
// Vue.component('da-tree', tree);
// Vue.component('da-myTransfer', myTransfer);
// Vue.component('da-dialog', dialog);
// Vue.component('da-time', time);
// Vue.component('da-upload', upload);

// 调用子组件中的方法
Vue.prototype.$invokeSubMethod = function (method, subComponents, data) {
  var arr = data;
  if (!(data instanceof Array)) {
    arr = [data];
  }
  return this.$refs[subComponents][method].apply(this, arr);
}

// 普通字符转换为任意符
Vue.prototype.html2Escape = function (sHtml) {
  if ((sHtml !== 0) && !sHtml || (sHtml.length === 0)) {
    return '';
  }
  return sHtml.replace(/[<>&']/g, function (c) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&quot;'
    }[c];
  });
};

// 任意符转换为普通字符
Vue.prototype.escape2Html = function (str) {
  if (str !== 0 && !str || str.length === 0) {
    return '';
  }
  var arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': "'"
  };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t];
  });
}

Vue.prototype.eachValidate = function (obj) {
  var rules = {};
  for (aname in obj) {
    rules[aname] = this.validation(obj[aname]);
  }
  return rules;
}

//表单验证
Vue.prototype.validation = function (ruleObj) {
  var rules = [],
    rule;

  for (aname in ruleObj) {
    if (ruleObj[aname]) {
      let item = {},
        ruleIsBaseData = false;

      if (varType(ruleType[aname]) === 'object') {
        item = deepCopy(ruleType[aname]);
      }

      if (varType(ruleObj[aname]) === 'object') {
        extend(item, ruleObj[aname]);
      } else if (varType(ruleObj[aname]) === 'function') {
        extend(item, {
          'validator': ruleObj[aname]
        });
      } else if (varType(ruleObj[aname]) === 'array' || varType(ruleObj[aname]) !== 'boolean') {
        extend(item, {
          'data': ruleObj[aname]
        });
      }
      // XXX 对原来存在的验证及规则重写比较麻烦，故一些基本也自定义
      // else if (varType(ruleObj[name]) === 'array' || (ruleIsBaseData = typeof ruleObj[name] !== 'object')) {
      //     let objItem = {};
      //     //基本数据类型
      //     if (ruleIsBaseData) {
      //         objItem[name] = ruleObj[name];
      //     } else {

      //     }
      //     extend(item, objItem);
      // }
      rules.push(item);
    }
  }
  return rules;
}

Vue.directive('drag', {
  bind: function (el, binding) {
    let oDiv = binding.value ? el.getElementsByClassName(binding.value)[0] : el,
      self = this;
    oDiv.onmousedown = function (e) {
      let disX = e.clientX - oDiv.offsetLeft,
        disY = e.clientY - oDiv.offsetTop;
      document.onmousemove = function (e) {
        //通过事件委托，计算移动的距离
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        //移动当前元素
        oDiv.style.left = l + 'px';
        oDiv.style.top = t + 'px';
        //将此时的位置传出去
        // binding.value({ x: e.pageX, y: e.pageY })
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
});

export default Vue;
