import axios from 'axios'
import store from '../vuex/store'
import * as types from '../vuex/mutation-types'

const isBuild = (process.env.NODE_ENV !== 'production')

// Defining defaults
axios.defaults.baseURL = isBuild ? 'https://api.example.com' : '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.timeout = 3000; // timeout after 3 seconds

// Requests interceptor
axios.interceptors.request.use((request) => {
  if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') request.data = qs.stringify(request.data)
  if (store.state.user.main != null) request.headers['Authorization'] = 'Bearer: ' + store.state.user.main.token
  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  store.commit(types.MAIN_SET_ERROR_STATUS, error)
  console.error(error)
  return Promise.reject(error);
}, () => {
  store.commit(types.MAIN_SET_LOADING_STATUS, false)
});
