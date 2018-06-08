/*
* @Author: jankergg
* @Date:   2018-05-11 16:26:17
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-26 13:35:19
*/
export default {
  path: '/',
  name: 'gallary',
  components: {
    default: resolve => require(['./main'], resolve)
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
    description: '画布',
    step: -1,
    param: {}
  }
}