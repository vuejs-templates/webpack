// - adduser: 录入基本信息
export default {
  path: '/insure',
  redirect:'/insure/adduser',
  components: {
    default: resolve => require(['./main.vue'], resolve)
  },
  children: [
    {
      path: 'adduser',
      name: 'insure-add-user',
      components: {
        default: resolve => require(['./add-user'], resolve)
      },
      meta: {
        requireAuth: true,
        title: '录入基本信息',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      }
    }
  ],
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
