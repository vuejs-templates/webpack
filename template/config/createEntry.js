#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var entryName = process.argv[2]

var target = path.join(__dirname , '../src/application/' + entryName )
var router = path.join(__dirname , '../src/application/' + entryName + '/router')

if (!entryName) {
  console.log('need target entry name')
  return
}

const Router = `
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})`

const App = `
<template>
<div id="app">
    welcome ${entryName}
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 60px;
}
</style>

`
const Main =
`
import '@/application/base'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from '@/store'
import {axioshttp} from '@/widget'
import Vuex from 'vuex'
import { ToastPlugin } from 'vux'

Vue.use(Vuex)
Vue.use(ToastPlugin)

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  // store,
  router,
  template: '<App/>',
  components: { App }
})

axioshttp(app)
`

const enty = {
  "key": entryName,
  "entry": ["babel-polyfill", "./src/application/" + entryName + "/main.js"],
  "filename": entryName + ".html",
  "template": "index.html",
  "prdHtmlWebpackPlugin": "../dist/" + entryName + "/login.vue",
  "chunks": ["manifest", "vendor", entryName]
}

function mkdirs(dirname, callback) {
  fs.exists(dirname, function (exists) {
      if (exists) {
          callback();
      } else {
          //console.log(path.dirname(dirname));
          mkdirs(path.dirname(dirname), function () {
              fs.mkdir(dirname, callback);
          });
      }
  });
}

//递归创建目录 同步方法
function mkdirsSync(dirname) {
  //console.log(dirname);
  if (fs.existsSync(dirname)) {
      return true;
  } else {
      if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
      }
  }
}

mkdirs(target, function() {
  mkdirs(router, function () {
    fs.writeFile(path.join(router, './index.js'), Router, { 'flag': 'a' }, function(err) {
      if (err) {
        throw err
      }
      fs.writeFile(path.join(target, './App.vue'), App, { 'flag': 'a' }, function(err) {
        if (err) {
          throw err
        }
        fs.writeFile(path.join(target, './main.js'), Main, { 'flag': 'a' }, function(err) {
          if (err) {
            throw err
          }
          console.log('main.js Saved.')
          let cEntry = require('./entry.json')
          cEntry.push(enty)
          let enjson = JSON.stringify(cEntry)
          fs.writeFile( path.join(__dirname , 'entry.json' ), enjson, function(err) {
            if (err) {
              throw err
            }
            console.log('entry.json Saved.')
          })


        })
        console.log('App.vue Saved.')
      })
      console.log('router/index.js Saved.')
    })
  })
})


