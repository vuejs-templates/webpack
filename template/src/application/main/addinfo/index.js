/* - addinfo: 完善信息
* @Author: jankergg
* @Date:   2018-05-10 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-26 12:14:43
*/

const addinfo =
  {
    path: '/addinfo',
    redirect: '/addinfo/applicant',
    name: 'add-info',
    components: {
      default: resolve => require(['./main'], resolve)
    },
    children: [
      {
        path: 'applicant',
        name: 'add-applicant-info',
        components: {
          default: resolve => require(['./applicant-info'], resolve)
        },
        meta: {
          requireAuth: true,
          title: '',
          rightMenu: null,
          leftMenu: {
            title: '返回',
            javascript: 'gobackbtn'
          }
        },
        Info: {
          description: '完善信息'
        }
      },
      {
        path: 'insurant',
        name: 'add-insurant-info',
        components: {
          default: resolve => require(['./recognizee-info'], resolve)
        },
        meta: {
          requireAuth: true,
          title: '',
          rightMenu: null,
          leftMenu: {
            title: '返回',
            javascript: 'gobackbtn'
          }
        },
        Info: {
          description: '完善信息'
        }
      }
    ],
    Info: {
      description: '完善客户信息',
      step: 4
    }
  }
export default addinfo;
