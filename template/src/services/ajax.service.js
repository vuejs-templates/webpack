/**
 * 这是ajax请求相关的服务
 */
import axios from "axios";
import {Message} from "element-ui";
import {isArray, isObject, isString} from "@/utils/utils";
import store from "@/store";
const baseUrl = "/erp_store";
/* 2018-8-13 16:35:39 增加环境配置host */
const config = {
	development: {
		// devUrl1: "http://192.168.2.25:8080" + baseUrl, // 曾文基本机ip
		// devUrl2: "http://192.168.2.77:8080" + baseUrl, // 刘婷婷本机ip
		// devUrl1: "http://192.168.7.25:8080" + baseUrl, // 谢翔
		// devUrl2: "http://192.168.7.25:8080" + baseUrl // 谢翔
    devUrl1: "http://erp2.hwdev.pagoda.com.cn" + baseUrl, // 测试
    devUrl2: "http://erp2.hwdev.pagoda.com.cn" + baseUrl // 测试
	},
	// 线上不存在跨域问题，都是当前域名
	production: {
		devUrl1: baseUrl,
		devUrl2: baseUrl
	}
};
const env = config[process.env.NODE_ENV] || config["production"];

// 1.0 创建axiox实例
export const instance = axios.create({
	baseURL: "",
	timeout: 30000,
	withCredentials: true,
	headers: {"Content-Type": "application/json;charset=UTF-8"}
});
instance.interceptors.response.use(
	function(response) {
		// console.log(response)
		if (
			response.headers.sessionstatus === "timeout" ||
			response.headers.Sessionstatus === "timeout"
		) {
			window.location.href = window.location.origin + "/rbac-backend/login"; // 登录超时，跳转单点登录链接
		}
		// Do something with response data
		return response;
	},
	function(error) {
		// Do something with response error
		Message.error("网络异常，请重试");
		return Promise.reject(error);
	}
);

export default class AjaxService {
	name = "AjaxService";
	xhrQueue = {}; // ajax请求队列
	$store = store; // vuex对象
	baseUrl = env.baseUrl;
	devUrl1 = env.devUrl1; // 万桥本机ip
	devUrl2 = env.devUrl2; // 郑灿标本机ip
	constructor() {
		console.log(this.devUrl2);
	}
	/* 公用业务处理 start */
	queue(source) {
		// 负责存队列
		const _id = `${+new Date()}${Math.ceil(Math.random() * 10000)}`;
		this.xhrQueue[_id] = source;
		return _id;
	}
	queueCleaner(id) {
		// 删除队列中某个source
		delete this.xhrQueue[id];
	}
	xhrCancel() {
		// 清除所有队列
		Object.keys(this.xhrQueue).forEach(id => {
			let source = this.xhrQueue[id];
			source.cancel(); // 退订
		});
	}
	// 对Object/Array的数据递归去空格，用了递归小心爆炸(* ￣3)(ε￣ *)
	trimParams(data) {
		if (!data) return;
		Object.keys(data).forEach(key => {
			if (isString(data[key])) {
				// string
				data[key] = data[key].trim();
			}
			if (isObject(data[key]) || isArray(data[key])) {
				// obejct or array
				this.trimParams(data[key]);
			}
		});
	}
	/* 公用业务处理 end */
	request({method, url, params = null, options = {}}) {
		// 默认执行去空格 可通过options屏蔽
		if (!options.noTrim) {
			this.trimParams(params);
		}
		// 是否需要loading
		if (options.loading) {
			this.$store.commit("setLoading", true); // 通过vuex设置
		}
		if (method === "GET") {
			options.params = params;
		} else {
			options.data = params;
		}
		const config = Object.assign(
			{
				url,
				method
			},
			options
		);
		return new Promise((resolve, reject) => {
			let source = axios.CancelToken.source();
			config.cancelToken = source.token;
			const queueId = this.queue(source); // 存进队列
			instance
				.request(config)
				.then(res => {
					switch (res.data.resultCode) {
						case 0:
							resolve(res.data);
							break;
						case 401:
							Message.error("登录已过期，需重新登录");
							reject(res.data);
							// go login
							break;
						default:
							// 限制错误提示长度，避免过长占满整个屏幕
							Message.error(
								res.data.errorMsg && res.data.errorMsg.substr(0, 200)
							);
							reject(res.data);
							break;
					}
				})
				.catch(error => {
					console.dir(error);
					reject(error);
				})
				.finally(() => {
					this.queueCleaner(queueId); // 释放队列中的subscription
					if (options.loading) {
						// 请求完成取消loading
						this.$store.commit("setLoading", false); // 通过vuex设置
					}
				});
		});
	}

	ajax(method, url, params, options) {
		return this.request({method, url, params, options});
	}

	get(url, params, options) {
		return this.request({method: "GET", url, params, options});
	}

	post(url, params, options) {
		return this.request({method: "POST", url, params, options});
	}

	setHeaderAuthorization(token) {
		instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
}
