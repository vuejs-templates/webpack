import Vue from "vue";
import store from "../store";
import Router from "vue-router";
import {deepCopy} from "@/utils/utils";
import Home from "@/views/home";
// import { Message } from 'element-ui'
import expenses from "./views/expenses";
import businese from "./views/businese";

Vue.use(Router);

const home = [
	{
		path: "/",
		name: "/",
		component: Home
	},
	{
		name: "404",
		path: "*",
		redirect: "/"
	}
];

const router = new Router({
	routes: home.concat(expenses, businese)
});
router.beforeResolve((to, from, next) => {
	// 全局解析守卫
	next();
});
router.afterEach((to, from) => {
	// 全局后置钩子
	// 设置面包屑
	let $route = to;
	let result;
	try {
		let path = $route.meta && $route.meta.path;
		if (path) {
			result =
				typeof path === "string"
					? path.split("/").map(label => {
							return {label};
					  })
					: deepCopy(path);

			// 加入首页
			result.unshift({label: "门店运营", name: "/"});
		} else {
			throw new Error();
		}
	} catch (e) {
		result = [];
	}
	store.commit("setBreadcrumb", result); // 通过vuex设置
});
export default router;
