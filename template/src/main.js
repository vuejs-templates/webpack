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
    {{#iview}}
  import iView from 'iview'
  import 'iview/dist/styles/iview.css'
    Vue.use(iView)
    {{/iview}}
//elment-ui
      {{#element-ui}}
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
      Vue.use(ElementUI)
      {{/element-ui}}
// mint-ui
        {{#mint-ui}}
      import Mint from 'mint-ui'
        Vue.use(Mint)
        {{/mint-ui}}
          Vue.config.productionTip = false

          /* eslint-disable no-new */
          new Vue({
            el: '#app',
          {{#router}}
          router,
            {{/router}}
            {{#if_eq build "runtime"}}
            render: h => h(App)
            {{/if_eq}}
              {{#if_eq build "standalone"}}
              components: { App },
              template: '<App/>'
              {{/if_eq}}
              })
