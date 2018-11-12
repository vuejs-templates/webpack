import Vue from 'vue';
import {util} from './util'; // 引入util 工具 
import '~@/assets/reset.scss'; // 引入重置css
import '~@/components'; // 引入自动加载组件
{{#mock}}
require('~@/mock');
{{/mock}}
Vue.prototype.$util = util;
