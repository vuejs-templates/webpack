import Vue from 'vue'
import Router from 'vue-router'
import Module1 from './module1/'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...Module1
  ]
})
