import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@components/HelloWorld'
import GlobalConstant from '@util/GlobalConstant';

Vue.use(Router)

export default class router {
  /**
   *  设置路由
   *  key= 路由名字 value=路由详细设置
   * @returns 返回路由列表
   */
  static routeMap () {
    return {
      Hello: {
        path: '/',
        component: HelloWorld
      }
    }
  }

  static routes () {
    let routes = [];
    let routeMap = this.routeMap();
    for (let route in routeMap) {
      if (routeMap.hasOwnProperty('hook')) {

      }
      if (routeMap.hasOwnProperty(route)) {
        routes.push({name: route, ...routeMap[route]});
      }
    }
    return routes;
  }

  static initRouter () {
    GlobalConstant.router = new Router({
      routes: this.routes()
    });
    return GlobalConstant.router;
  }
}
