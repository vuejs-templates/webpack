{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import axios from 'axios'
import VueAxios from 'vue-axios'
import { mapGetters, mapActions } from 'vuex'

import store from './store'
import util from './services/util'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
let vueApp = new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>',
  {{/if_eq}}
  computed: {
  ...mapGetters([
      'text'
    ])
  },
  methods: {
  ...mapActions({
      setText: 'setText'
    }),
      async init () {
      const url = 'https://jsonplaceholder.typicode.com/posts/1'
      if (!this.text) {
        let data = await util.readData(url)
        this.setText(data.title)
      }
    }
  }
})

vueApp.init()
