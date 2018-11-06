/**
 * 这是门店费用管理子项目采购订单模块内的公用业务逻辑的服务
 * 可引用AjaxService, StoreService, CommonService 的功能
 */
import {isArray} from "@/utils/utils";
export default class PayeeService {
	name = "PayeeService";
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
	// 门店运营/门店费用管理/收款人信息维护-禁用/启用
	payeeEnabled(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/BasPayeeDefService/editEnabled`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/收款人信息维护-添加收款人
	addPayee(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/BasPayeeDefService/addPayee`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/收款人信息维护-通过ID查询收款人
	checkPayeeById(params = {}, isShow = false) {
		return this.AjaxService.get(
			`${this.devUrl1}/BasPayeeDefService/getById`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/收款人信息维护-编辑收款人
	editPayee(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/BasPayeeDefService/editPayee`,
			params,
			{loading: isShow}
		);
	}

	// 门店运营/门店费用管理/费用类别-添加类型
	addClass(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/BasCostCatService/batchCreate`,
			params,
			{loading: isShow}
		);
	}

	// 门店运营门/店费用管理/费用类别-编辑类型
	editClass(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasCostCatService/batchUpdate`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/费用类别-启用
	classesServiceStart(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasCostCatService/batchStart`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/费用类别-禁用
	classesServiceStop(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasCostCatService/batchStop`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/费用类别-通过类别获得
	checkRequisitionByType(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl2}/BasCostCatService/findByPreParam`,
			params,
			{loading: isShow}
		);
	}

	// 门店运营/门店费用管理/门店费用申请单-修改状态
	setRequisitionStatus(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/StoreCostAppHeadService/editStatus`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/门店费用申请单-新增
	addRequisition(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/StoreCostAppHeadService/addCost`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/门店费用申请单-编辑
	editRequisition(params = {}, isShow = false) {
		return this.AjaxService.post(
			`${this.devUrl1}/StoreCostAppHeadService/editCost`,
			params,
			{loading: isShow}
		);
	}
	// 门店运营/门店费用管理/门店费用申请单-通过ID查询
	checkRequisitionById(params = {}, isShow = false) {
		return this.AjaxService.get(
			`${this.devUrl1}/StoreCostAppHeadService/viewDetail`,
			params,
			{loading: isShow}
		);
	}
}
