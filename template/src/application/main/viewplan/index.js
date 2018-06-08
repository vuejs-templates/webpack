/* - viewplan: 预览计划书
* @Author: jankergg
* @Date:   2018-05-10 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-26 12:01:58
*/
export default {
  path: '/viewplan',
  Info: {
    description: '预览计划书',
    step: 3
  },
  components: {
    default: resolve => require(['./main.vue'], resolve)
  },
  children: [
    {
      path: '',
      name: 'view-plan',
      components: {
        default: resolve => require(['./view-plan'], resolve)
      },
      meta: {
        requireAuth: true,
        title: '预览计划书',
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
    title: '预览计划书',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  }
}
