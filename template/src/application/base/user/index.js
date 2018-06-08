/*
* @Author: jankergg
* @Date:   2018-06-01 10:32:58
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-01 10:42:42
* @Desc 我的-名片
*/
const namecard = {
    path: '/user',
    name: 'name-card',
    components: {
      default: resolve => require(['./main'], resolve)
    },
    meta: {
      title: '我的名片',
      rightMenu: null,
      leftMenu: {
        title: '返回',
        javascript: 'gobackbtn'
      }
    },
    Info: {
      description: '我的名片'
    }
  }
export default namecard;