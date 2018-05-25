import VuexPersistence from 'vuex-persist'
import { getCookie, setCookie } from 'tiny-cookie'
import moment from 'moment'
import * as types from './mutation-types'

export default vuexLocal = new VuexPersistence({
  restoreState: (key, storage) => getCookie(key, JSON.parse),
  saveState: (key, state, storage) => setCookie(key, state, JSON.stringify, {
    expires: moment.add(6, 'hours').toString()
  }),
  key: '{{ name }}',
  strictMode: process.env.NODE_ENV !== 'production',
  modules: ['user'],
  filter: (mutation) => (mutation.type === types.USER_LOGIN)
})
