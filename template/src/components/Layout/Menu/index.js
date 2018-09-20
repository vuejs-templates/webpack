export default function install (Vue) {
  Vue.component('Menu', () => import('./Menu.vue'))
}
