export default function install (Vue) {
  Vue.component('Tabs', () => import('./Tabs.vue'))
}
