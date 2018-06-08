/* - viewplan: 预览计划书
* @Author: jankergg
* @Date:   2018-05-10 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-26 12:03:39
*/
export default {
  path: '/viewinsurerpact',
  Info: {
    description: '预览投保书',
    step: 7,
    param: {}
  },
  components: {
    default: resolve => require(['./main.vue'], resolve)
  },
  children: [
    {
      path: '',
      name: 'view-insurerpact',
      components: {
        default: resolve => require(['./view-insurerPact'], resolve)
      },
      meta: {
        requireAuth: true,
        title: '预览投保书',
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
    title: '预览投保书',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  }
}
