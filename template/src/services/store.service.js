/**
 * 这是负责储存公用数据的服务 （一些页面过渡需要短暂缓存或者公用请求需要共享的数据可以放这里）
 * 可引用AjaxService 的功能
 */

export default class StoreService {
	name = "StoreService";
	// 记录每个路由最近一次的params和query {路由名字： {query: {}, params: {}}...}
	routeParams = {};
	constructor(AjaxService) {
		Object.assign(this, {
			AjaxService
		});
	}

	setRouteParams(route) {
		// 记录最近一次路由的params和query
		console.log("-----通过StoreService储存最近一次路由的params和query-----");
		this.routeParams[route.name] = {
			query: route.query,
			params: route.params
		};
	}
}
