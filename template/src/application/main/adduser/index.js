// - adduser: 录入基本信息
export default {
  path: '/adduser',
  name: 'add-user',
  components: {
    default: resolve => require(['./main.vue'], resolve)
  },
  meta: {
    requireAuth: true,
    title: '录入基本信息',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '录入基本信息',
    step: 1,
    param: {}
  }
}
