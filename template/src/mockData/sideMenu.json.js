export default roleName => {
	return [
		{
			icon: "el-icon-tickets",
			label: "门店费用管理",
			subMenu: [
				{
					label: "收款人信息维护",
					url: "/expenses/payee",
					name: "payee"
				},
				{
					label: "费用类别维护",
					url: "/expenses/classes",
					name: "classes"
				},
				{
					label: "门店费用申请",
					url: "/expenses/requisition",
					name: "requisition"
				}
			]
		},
		{
			icon: "el-icon-tickets",
			label: "POS用户管理",
			subMenu: [
				{
					label: "角色定义",
					url: "/role/definition"
				},
				{
					label: "POS用户定义",
					url: "/pos/user"
				}
			]
		},
		{
			icon: "el-icon-tickets",
			label: "营业款管理",
			subMenu: [
        {
          label: "门店存款银行账户",
          url: "/business/bankAccount",
          name: 'bankAccount'
        },
        {
          label: "营业款实收录入",
          url: "/business/received",
          name: 'business-received'
        },
        {
          label: "营业款实存录入",
          url: "/business/saved",
          name: 'business-saved'
        },
        {
          label: "营业款审核",
          url: "/business/businessAudit",
          name: 'business-audit'
        },
        {
          label: "门店实存金额审核",
          url: "/business/storeSavedAudit",
          name: 'store-saved-audit'
        }
			]
		},
		{
			icon: "el-icon-tickets",
			label: "销售目标管理",
			subMenu: [
				{
					label: "销售目标查看",
					url: "/sales/target"
				}
			]
		},
		{
			icon: "el-icon-tickets",
			label: "银行存款",
			subMenu: [
				{
					label: "银行存款管理",
					url: "/bank/deposit"
				},
				{
					label: "银行存款账户维护",
					url: "/bank/account"
				}
			]
		}
	];
};
