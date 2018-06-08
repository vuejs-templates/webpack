/* - makeplan: 制定保险计划
* @Author: jankergg
* @Date:   2018-05-10 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-07 15:02:37
*/
export default {
  path: '/plan',
  redirect: '/plan/make',
  components: {
    default: resolve => require(['./main'], resolve)
  },
  Info: {
    description: '制定投保计划'
  },
  children: [
    {
      path: 'make',
      name: 'make-plan',
      components: {
        default: resolve => require(['./make-plan'], resolve)
      },
      meta: {
        step: 2,
        requireAuth: true,
        title: '',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      }
    },
    {
      path: 'choose',
      name: 'choose-plan',
      components: {
        default: resolve => require(['./choose-plan'], resolve)
      },
      meta: {
        requireAuth: true,
        title: '',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      }
    }
  ]
}
