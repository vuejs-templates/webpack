/**
 * @Author: vxhly
 * @Date:   2018-01-03 02:13:39 pm
 * @Email:  pengchengou@gmail.com
 * @Project: BIGBIGADS TECHNOLOGY LIMITED
 * @Filename: index.js
 * @Last modified by:   vxhly
 * @Last modified time: 2018-01-03 02:15:03 pm
 * @License: MIT
 * @Copyright: BIGBIGADS TECHNOLOGY LIMITED
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
 state: {},
 mutations: {},
 actions: {},
 getters: {},
 modules: {},
 strict: debug
})
