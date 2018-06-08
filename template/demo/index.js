/*
* @Author: jankergg
* @Date:   2018-05-11 16:23:29
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-26 12:10:22
*/
export default {
  path: '/demo',
  name: 'demo',
  components: {
    default: resolve => require(['./form-unit-demo'], resolve)
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
    description: 'demo',
    step: 0,
    param: {}
  }
}
