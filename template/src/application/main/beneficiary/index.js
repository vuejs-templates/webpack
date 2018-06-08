/* beneficiary
*/
export default {
  path: '/beneficiary',
  redirect: '/beneficiary/beneficiary-list',
  name: 'beneficiary',
  components: {
    default: resolve => require(['./main'], resolve)
  },
  children: [
    {
      path: 'beneficiary-list',
      name: 'beneficiary-list',
      components: {
        default: resolve => require(['./beneficiary-list'], resolve)
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
        description: '指定受益人',
        step: 5
      }
    },
    {
      path: 'beneficiary-info',
      name: 'add-beneficiary-info',
      components: {
        default: resolve => require(['./beneficiary-info'], resolve)
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
        description: '受益人信息',
        step: 5
      }
    }
  ],
  Info: {
    description: '受益人信息',
    step: 5
  },
}

