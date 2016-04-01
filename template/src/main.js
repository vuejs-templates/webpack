import Vue from 'vue'
import App from './App'
import resource from 'vue-resource'

Vue.use(resource)

export const Resource = Vue.resource.bind(Vue)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})


// Api
import api from './api'

console.log('Api is not defined', api)
