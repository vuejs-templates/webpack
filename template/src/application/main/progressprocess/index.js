// - adduser: 投保进度
export default {
  path: '/progressprocess',
  name: 'progressprocess',
  components: {
    default: resolve => require(['./main.vue'], resolve)
  },
  meta: {
    requireAuth: true,
    title: '投保进度',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn',
      params: 'go:recommend'
    }
  },
  Info: {
    description: '投保进度',
    param: {}
  }
}
