/**
 * Created by su9er on 16/7/28.
 */

import Vue from 'vue'
import Index from 'pages/index/index.vue'
import AjaxPlugin from 'lib/plugins/AjaxPlugin'
// import Resource from 'vue-resource'
Vue.use(AjaxPlugin)
// Vue.use(Resource)
const picWeb = new Vue({
  el        : 'body',
  vuex      : {},
  components: {Index},
})
