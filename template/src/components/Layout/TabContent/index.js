export default function install (Vue) {
  Vue.component('TabContent', () => import('./TabContent.vue'))
}
