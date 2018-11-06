const currentStr = "营业款管理";
const current = {label: currentStr};

export default [
	// 收款人信息维护
	{
		path: "/business/bankAccount",
		name: "businessBankAccount",
		meta: {
			name: "门店存款银行账户",
			path: `${currentStr}/门店存款银行账户`
		},
		component: resolve => require(["@/views/business/bankAccount"], resolve)
	},
	{
		path: "/business/bankAccount/add",
		name: "bankAccountAdd",
		meta: {
			name: "门店存款银行账户",
			path: [
				{...current},
				{label: "门店存款银行账户", name: "businessBankAccount"},
				{label: "新增"}
			],
			back: "businessBankAccount"
		},
		component: resolve => require(["@/views/business/bankAccount/add"], resolve)
	},
	{
		path: "/business/bankAccount/detail/:id",
		name: "bankAccountDetail",
		meta: {
			name: "门店存款银行账户",
			path: [
				{...current},
				{label: "门店存款银行账户", name: "businessBankAccount"},
				{label: "详情"}
			],
			back: "businessBankAccount"
		},
		component: resolve =>
			require(["@/views/business/bankAccount/detail"], resolve)
	},
	{
		path: "/business/bankAccount/update/:id",
		name: "bankAccountUpdate",
		meta: {
			name: "门店存款银行账户",
			path: [
				{...current},
				{label: "门店存款银行账户", name: "businessBankAccount"},
				{label: "修改"}
			],
			back: "businessBankAccount"
		},
		component: resolve =>
			require(["@/views/business/bankAccount/update"], resolve)
	},
	{
		path: "/business/received",
		name: "businessReceived",
		meta: {
			name: "营业款实收录入",
			path: `${currentStr}/营业款实收录入`
		},
		component: resolve => require(["@/views/business/received"], resolve)
	},
	{
		path: "/business/saved",
		name: "businessSaved",
		meta: {
			name: "营业款实存录入",
			path: `${currentStr}/营业款实存录入`
		},
		component: resolve => require(["@/views/business/saved"], resolve)
	},
  {
    path: "/business/businessAudit",
    name: "businessAudit",
    meta: {
      name: "营业款审核",
      path: `${currentStr}/营业款审核`
    },
    component: resolve => require(["@/views/business/businessAudit"], resolve)
  },
  {
    path: "/business/storeSavedAudit",
    name: "storeSavedAudit",
    meta: {
      name: "门店实存金额审核",
      path: `${currentStr}/门店实存金额审核`
    },
    component: resolve => require(["@/views/business/storeSavedAudit"], resolve)
  }
];
