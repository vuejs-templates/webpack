import Vue from 'vue';
import '@/assets/reset.scss'; // 引入重置css
import '@/components/index.js'; // 引入自动加载组件
import util from './util.js'; // 引入util 工具 
{{#mock}}
require('@/mock');
{{/mock}}
Vue.prototype.$util = util;
