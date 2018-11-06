/**
 * 这是所有模块公用业务逻辑的服务 （也可以设置公用配置）
 * 可引用AjaxService, StoreService的功能
 */
import {Message} from "element-ui";
export default class CommonService {
	name = "CommonService";
	constructor(AjaxService, StoreService) {
		Object.assign(this, {
			AjaxService,
			StoreService
		});
		console.log(this.name, this.AjaxService.name, this.StoreService.name);
	}

	/* 公用业务处理 start */
	// 校验参数通用方法
	check(flag, tips) {
		if (flag) {
			Message.error(tips);
		}
		return flag;
	}
}
