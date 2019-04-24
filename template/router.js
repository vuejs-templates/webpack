export default [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['./src/components/HelloWorld.vue'], resolve),//懒加载
  }
  ]
