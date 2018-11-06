import AjaxService from "./ajax.service";
import StoreService from "./store.service";
import CommonService from "./common.service";
import PayeeService from "./payee.service";
import BusinessService from './business.service'

export default {
	install(Vue) {
		/**
		 * 注册service， 维护公用业务逻辑
		 */
		let ajaxService = new AjaxService();
		let storeService = new StoreService(ajaxService);
		let commonService = new CommonService(ajaxService, storeService);
		let payeeService = new PayeeService(
			ajaxService,
			storeService,
			commonService
		);
    let businessService = new BusinessService(
      ajaxService,
      storeService,
      commonService
    );
		Vue.prototype.AjaxService = ajaxService;
		Vue.prototype.StoreService = storeService;
		Vue.prototype.CommonService = commonService;
		Vue.prototype.PayeeService = payeeService;
		Vue.prototype.BusinessService = businessService
	}
};
