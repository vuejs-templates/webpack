export default function install (Vue) {
  Vue.component('Header', () => import('./Header.vue'))
}
