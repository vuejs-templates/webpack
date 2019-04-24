export default [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['./components/HelloWorld.vue'], resolve),//懒加载
  }
  ]
