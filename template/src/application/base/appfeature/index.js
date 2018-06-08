/* - addinfo: 完善信息
* @Author: jankergg
* @Date:   2018-05-10 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-02 10:40:53
*/

const appFeature = {
    path: '/appfeature',
    name: 'app-feature',
    components: {
      default: resolve => require(['./main'], resolve)
    },
    Info: {
      description: '产品详情'
    }
  }
export default appFeature;
