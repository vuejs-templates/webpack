import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import Router from './router/router'
import $Config from './api/config'

Vue.use(VueResource)

Vue.use(VueValidator)

Vue.http.options.root = $Config.interfaceBase
// api 全局路径

Router.start(App, 'app')

fastclick.attach(document.getElementsByTagName('body')[0])
