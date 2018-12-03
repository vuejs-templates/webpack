import Vue from 'vue';
import '@/assets/reset.scss'; // 引入重置css
import '@/components'; // 引入自动加载组件
import util from '@/config/util'; // 引入util 工具 
{{#mock}}
require('@/mock');
{{/mock}}
Vue.prototype.$util = util;
