/*
* @Author: jankergg
* @Date:   2018-05-08 11:13:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-06 17:52:24
说明： 控制step流程的逻辑写在store/modules/plan.js
* TODO: 1、重复模块合并, addUser/insure
* TODO: 2、页面导航，前进后退，指定跳转
* TODO: 3、侧边栏导航
* TODO: 4、nextStep guarding
*/

import Vue from 'vue'
import Router from 'vue-router'
// 页面模块 start
// import 时建议写相对路径
import gallery from '../base/gallery'
import appFeature from '../base/appfeature'
import demo from '../../../demo'
import addinfo from './addinfo'
import adduser from './adduser'
import insure from './insure'
import makePlan from './makeplan'
import notify from './notify'
import viewplan from './viewplan'
import viewinsurerpact from './viewInsurerPact'
import progressprocess from './progressprocess'
import ordersearch from './orderlist'
import beneficiary from "./beneficiary"
import namecard from '../base/user'
import sign from './sign'

// 页面模块 end

// 所有页面
const ROUTEES = [
  appFeature,
  addinfo,
  adduser,
  insure,
  makePlan,
  gallery,
  notify,
  demo,
  viewplan,
  viewinsurerpact,
  progressprocess,
  beneficiary,
  ...ordersearch,
  namecard,
  sign
]

Vue.use(Router)

const myRouter = new Router({
  mode: 'history', // 启用history模式
  routes: ROUTEES
})
export {myRouter as default}
