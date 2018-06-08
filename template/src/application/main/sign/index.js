// - adduser: 录入基本信息
export default {
  path: '/sign',
  redirect: '/sign/esignature',
  components: {
    default: resolve => require(['./main.vue'], resolve)
  },
  children: [
    {
      path: 'esignature',
      name: 'sign-esignature',
      components: {
        default: resolve => require(['./esignature'], resolve)
      },
      meta: {
        requireAuth: true,
        title: '电子签名',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      }
    }
//  ,{
//    path: 'share',
//    name: 'sign-share',
//    components: {
//      default: resolve => require(['./share'], resolve)
//    },
//    meta: {
//      requireAuth: true,
//      title: '空中签名',
//      rightMenu: null,
//      leftMenu: {
//        title: '返回',
//        javascript: 'gobackbtn'
//      }
//    }
//  }
  ],
  meta: {
    requireAuth: true,
    title: '电子签名',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '电子签名',
    step: 1,
    param: {}
  }
}
