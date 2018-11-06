export default {
	setBreadcrumb(state, breadcrumb) {
		// 动态设置面包屑
		state.breadcrumb = breadcrumb;
	},
	setLoading(state, boolean) {
		// 动态设置路由页面内容的loading
		state.loading.show = boolean;
	},
	setLoadingFull(state, boolean) {
		// 动态设置整个页面的的loading遮罩
		state.loading.fullShow = boolean;
	},
	setRole(state, role) {
		// 2018-5-31 14:49:05提供实时切换角色功能，方便开发测试
		state.role = role;
		// 2018-6-6 15:56:37 记录最近一次设置的角色，便于本地调试
		localStorage.setItem("erp_role", JSON.stringify(role));
	},
	setRouteParams(state, route) {
		// 记录最近一次路由的params和query
		state.routeParams[route.name] = {
			query: route.query,
			params: route.params
		};
	},
	setTopMenuActive(state, topMenuActive) {
		// console.log(topMenuActive)
		state.topMenuActive = topMenuActive;
	}
};
