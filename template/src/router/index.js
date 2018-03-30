import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta:{
        title:'HelloWorld',
      },
      component(resolve) {
        require(['@/components/HelloWorld'], resolve);
      }
    }
  ]
})
