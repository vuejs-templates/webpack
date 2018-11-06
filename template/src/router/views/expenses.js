const currentStr = "门店费用管理";
const current = {label: currentStr};

export default [
  // 收款人信息维护
  {
    path: '/expenses/payee',
    name: 'expensesPayee',
    meta: {
      name: '收款人信息维护',
      path: `${currentStr}/收款人信息维护`
    },
    component: (resolve) => require(['@/views/expenses/payee'], resolve)
  },
  {
    path: '/expenses/payee/add',
    name: 'payeeAdd',
    meta: {
      name: '收款人信息维护',
      path: [
        {...current},
        {label: '收款人信息维护', name: 'expensesPayee'},
        {label: '新增'}
      ],
      back: 'expensesPayee'
    },
    component: (resolve) => require(['@/views/expenses/payee/add'], resolve)
  },
  {
    path: '/expenses/payee/detail/:id',
    name: 'payeeDetail',
    meta: {
      name: '收款人信息维护',
      path: [
        {...current},
        {label: '收款人信息维护', name: 'expensesPayee'},
        {label: '详情'}
      ],
      back: 'expensesPayee'
    },
    component: (resolve) => require(['@/views/expenses/payee/detail'], resolve)
  },
  {
    path: '/expenses/payee/update/:id',
    name: 'payeeUpdate',
    meta: {
      name: '收款人信息维护',
      path: [
        {...current},
        {label: '收款人信息维护', name: 'expensesPayee'},
        {label: '修改'}
      ],
      back: 'expensesPayee'
    },
    component: (resolve) => require(['@/views/expenses/payee/update'], resolve)
  },
  // 费用类别维护
  {
    path: '/expenses/classes',
    name: 'expensesClasses',
    meta: {
      name: '费用类别维护',
      path: `${currentStr}/费用类别维护`
    },
    component: (resolve) => require(['@/views/expenses/classes'], resolve)
  },
  // 门店费用申请单
  {
    path: '/expenses/requisition',
    name: 'expensesRequisition',
    meta: {
      name: '门店费用申请单',
      path: `${currentStr}/门店费用申请单`
    },
    component: (resolve) => require(['@/views/expenses/requisition'], resolve)
  },
  {
    path: '/expenses/requisition/add',
    name: 'requisitionAdd',
    meta: {
      name: '门店费用申请单',
      path: [
        {...current},
        {label: '门店费用申请单', name: 'expensesRequisition'},
        {label: '新增'}
      ],
      back: 'expensesRequisition'
    },
    component: (resolve) => require(['@/views/expenses/requisition/add'], resolve)
  },
  {
    path: '/expenses/requisition/detail/:id',
    name: 'requisitionDetail',
    meta: {
      name: '门店费用申请单',
      path: [
        {...current},
        {label: '门店费用申请单', name: 'expensesRequisition'},
        {label: '详情'}
      ],
      back: 'expensesRequisition'
    },
    component: (resolve) => require(['@/views/expenses/requisition/detail'], resolve)
  },
  {
    path: '/expenses/requisition/update/:id',
    name: 'requisitionUpdate',
    meta: {
      name: '门店费用申请单',
      path: [
        {...current},
        {label: '门店费用申请单', name: 'expensesRequisition'},
        {label: '修改'}
      ],
      back: 'expensesRequisition'
    },
    component: (resolve) => require(['@/views/expenses/requisition/update'], resolve)
  }
]
