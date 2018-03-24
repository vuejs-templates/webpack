{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
  {{#router}}
import router from './router'
  {{/router}}
// ivew
    {{#if_eq frameworks "iview"}}
  import iView from 'iview'
  import 'iview/dist/styles/iview.css'
    Vue.use(iView)
    {{/if_eq}}
//elment-ui
      {{#if_qs frameworks "element-ui"}}
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
      Vue.use(ElementUI)
      {{/if_eq}}
// mint-ui
        {{#if_eq frameworks "mint-ui"}}
      import Mint from 'mint-ui'
        Vue.use(Mint)
        {{/if_eq}}

          {{#vuex}}
          import store from './store'
          {{/vuex}}

          Vue.config.productionTip = false

          /* eslint-disable no-new */
          new Vue({
            el: '#app',
          {{#router}}
          router,
            {{/router}}
              {{#vuex}}
              store,
              {{/vuex}}

            {{#if_eq build "runtime"}}
            render: h => h(App)
            {{/if_eq}}
              {{#if_eq build "standalone"}}
              components: { App },
              template: '<App/>'
              {{/if_eq}}
              })
