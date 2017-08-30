// polyfills
require('es6-promise').polyfill()
require('utils/polyfills')

import {init} from 'utils/sdk'
import {load} from 'conf/global'
import router from 'router'
import routes from 'src/pages/[PAGE_NAME]/routes'
// import index from 'src/pages/[PAGE_NAME]/[ENTRY_NAME]';

{{#i18n}}
// 多语言支持
import langs from '../i18n.json'
const locale = '[LANG_NAME]' // 页面多语言定义
Vue.config.lang = locale
Object.keys(langs).forEach(function (lang) {
    Vue.locale(lang, langs[lang])
})
{{/i18n}}

// 启用 vue 开发者工具
if (process.env.NODE_ENV === 'development') {
    Vue.config.devtools = true
}

init().then(load).then(function(userInfo) {
    router(routes, '#app')
}).catch(e => {
    console.error(e.message)
})
