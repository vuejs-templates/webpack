import Vue from 'vue'
import I18n from 'vue-i18n'
import LangPkg from './index.json'

import { getLang,getParam } from './utils'
Vue.use(I18n)

export default new I18n({
  locale: getLang(getParam('lang')),
  fallbackLocale:  'en',
  messages: LangPkg
})
