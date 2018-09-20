export default function install (Vue) {
  Vue.component('Crumb', () => import('./Crumb.vue'))
}
