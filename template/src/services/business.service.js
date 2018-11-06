/**
 * 这是营业款管理子项目采购订单模块内的公用业务逻辑的服务
 * 可引用AjaxService, StoreService, CommonService 的功能
 */
import {isArray} from "@/utils/utils";
export default class BusinessService {
	name = "BusinessService";
	constructor(AjaxService, StoreService, CommonService) {
		const {baseUrl, devUrl1, devUrl2} = AjaxService;
		Object.assign(
			this,
			{
				AjaxService,
				StoreService,
				CommonService
			},
			{
				baseUrl,
				devUrl1,
				devUrl2
			}
		);
	}

	/* api公用定义 */
	//----------------------------------存款银行账户---------------------------------------------
	// 门店运营-营业款管理-门店存款银行账户-启用
	accountServiceStart(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasStoreAccountService/batchStart`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营-营业款管理-门店存款银行账户-禁用
	accountServiceStop(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasStoreAccountService/batchStop`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营-营业款管理-门店存款银行账户-添加
	addAccount(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/BasStoreAccountService/create`,
			params,
			{loading: isShow}
		);
	}
	//-------------------------------------门店费用管理---------------------------------------
	// 门店运营门-店费用管理-费用类别-编辑类型
	editAccount(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasStoreAccountService/update`,
			params,
			{loading: isShow}
		);
	}
  // 门店运营-门店费用管理-收款人信息维护-通过ID查询收款人
  checkAccountById(params = {}, isShow = false) {
    return this.AjaxService.get(
      `${this.devUrl1}/BasStoreAccountService/getById`,
      params,
      {loading: isShow}
    );
	}
	//-------------------------------实存------------------------------------------------
  // 门店运营-门店费用管理-营业款实存录入-添加
  addBusinessSaved(params = {}, isShow = false) {
    return this.AjaxService.post(
      `${this.devUrl1}/StoreBusinessMoneyService/addSave`,
      params,
      {loading: isShow}
    );
  }

  // 门店运营-门店费用管理-营业款实存录入-编辑
  editBusinessSaved(params = {}, isShow = false) {
    return this.AjaxService.post(
      `${this.devUrl1}/StoreBusinessMoneyService/editSave`,
      params,
      {loading: isShow}
    );
  }

  
	// 门店运营-门店费用管理-收款人信息维护-通过ID查询收款人
	checkAccountById(params = {}, isShow = false) {
		return this.AjaxService.get(
			`${this.devUrl1}/BasStoreAccountService/getById`,
			params,
			{loading: isShow}
		);
	}

	// 门店运营-门店费用管理-营业款实存录入-添加
	addBusinessSaved(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/StoreBusinessMoneyService/addSave`,
			params,
			{loading: isShow}
		);
	}
	//----------------------------------------实收--------------------------------------------
	 // 门店运营-门店费用管理-营业款实收录入-编辑
	 editBusinessReceived(params = {}, isShow = false) {
    return this.AjaxService.post(
      `${this.devUrl1}/StoreBusinessMoneyService/editRec`,
      params,
      {loading: isShow}
    );
  }
	// 门店运营-门店费用管理-营业款实收录入-新增保存
	addBusinessReceived(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/StoreBusinessMoneyService/addRec`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营-门店费用管理-营业款实收录入-删除
	delBusinessReceived(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/StoreBusinessMoneyService/logicalDeleteById`,
			params,
			{loading: isShow}
		);
	}
	//-------------------------------实收实入公用-------------------------------------------------
	// 门店运营-门店费用管理-营业款实收实存录入-修改状态（提交）
  setBusinessStatus(params = {}, isShow = false) {
    return this.AjaxService.post(
      `${this.devUrl1}/StoreBusinessMoneyService/changeStatus`,
      params,
      {loading: isShow}
    );
	}
	// 门店运营-门店费用管理-营业款实收实存录入-删除
  deleteBusinessReceivedOrSaved(params = {}, isShow = false) {
    return this.AjaxService.post(
      `${this.devUrl1}/StoreBusinessMoneyService/logicalDeleteById`,
      params,
      {loading: isShow}
    );
  }
}
