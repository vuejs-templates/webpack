/* - notify: 健康告知
* @Author: simon
* @Date:   2018-05-21 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-08 11:36:45
*/
const notify =
  {
    path: '/notify',
    redirect: '/notify/applicant',
    name: 'notify',
    components: {
      default: resolve => require(['./main'], resolve)
    },
    children: [
      {
        path: 'applicant',
        name: 'notify-applicant',
        components: {
          default: resolve => require(['./page/app-impart.vue'], resolve)
        },
        meta: {
          requireAuth: true,
          title: '投保人告知',
          rightMenu: null,
          leftMenu: {
            title: '返回',
            javascript: 'gobackbtn'
          }
        }
      },
      {
        path: 'insurant',
        name: 'notify-insurant',
        components: {
          default: resolve => require(['./page/ins-impart.vue'], resolve)
        },
        meta: {
          requireAuth: true,
          title: '被保人告知',
          rightMenu: null,
          step: 14,
          leftMenu: {
            title: '返回',
            javascript: 'gobackbtn'
          }
        }
      },
      {
        path: 'grade',
        name: 'notify-grade',
        components: {
          default: resolve => require(['./page/grade-impart.vue'], resolve)
        },
        meta: {
          requireAuth: true,
          title: '分级健告',
          rightMenu: null,
          leftMenu: {
            title: '返回',
            javascript: 'gobackbtn'
          }
        }
      }
    ],
    Info: {
      description: '健康告知',
      step: 6,
      param: {}
    }
  }
export default notify

