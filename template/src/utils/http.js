import axios from "axios";
import {Message} from "element-ui";

const config = {
	BasicUrl: ""
};
export const instance = axios.create({
	baseURL: config.BasicUrl,
	timeout: 30000,
	withCredentials: true,
	headers: {"Content-Type": "application/json;charset=UTF-8"}
});
instance.interceptors.response.use(
	function(response) {
		console.log(response);
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

let xhrQueue = {};
const queue = source => {
	// 负责存队列
	const _id = `${+new Date()}${Math.ceil(Math.random() * 10000)}`;
	xhrQueue[_id] = source;
	return _id;
};
const queueCleaner = id => {
	// 删除队列中某个source
	delete xhrQueue[id];
};
export const xhrCancel = () => {
	// 清除所有队列
	Object.keys(xhrQueue).forEach(id => {
		let source = xhrQueue[id];
		source.cancel(); // 退订
	});
};
export const $request = ({method, url, params = null, options}) => {
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
		let source = instance.CancelToken.source();
		config.cancelToken = source.token;
		const queueId = queue(source); // 存进队列
		instance
			.request(config)
			.then(res => {
				resolve(res);
				queueCleaner(queueId); // 释放队列中的subscription
			})
			.catch(error => {
				reject(error);
				queueCleaner(queueId); // 释放队列中的subscription
			});
	});
};

export const $ajax = (method, url, params, options) => {
	return $request({method, url, params, options});
};

export const $get = (url, params, options) => {
	return $request({method: "GET", url, params, options});
};

export const $post = (url, params, options) => {
	return $request({method: "POST", url, params, options});
};

export const setHeaderAuthorization = token => {
	instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
