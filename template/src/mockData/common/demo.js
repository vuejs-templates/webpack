// 表头
const tableHead = {
  resultCode: 0,
  head: [
    {
      name: 'a1',
      nameCN: '序号',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      'canQuery': true,
      'constraint': '',
      'constraintParams': '',
      'constraintParamsExtra': '',
      'defaultValue': '',
      'displayLen': 64,
      'enumerationType': false,
      'fixed': '',
      'formSize': '',
      'format': '',
      'metaId': '',
      'name': 'goodsName',
      'nameCN': '商品名称',
      'nameEN': 'goodsName',
      'pageTotal': false,
      'persistent': true,
      'readOnly': false,
      'required': true,
      'scene': '',
      'sensitive': true,
      'sortable': false,
      'tag': '',
      'total': false,
      'type': '枚举',
      'visible': true
    },
    {
      name: 'a3',
      nameCN: '商品代码',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'a4',
      nameCN: '等级',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'a5',
      nameCN: '规格',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'a6',
      nameCN: '基本单位',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'reqPurchaseNum',
      nameCN: '请购数量',
      visible: true,
      type: '整型',
      required: true,
      canQuery: false
    },
    {
      name: 'danjia',
      nameCN: '库存单位',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'reqPurchaseAmount',
      nameCN: '请购金额',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'arrivalDate',
      nameCN: '应到货日期',
      visible: true,
      readOnly: false,
      canQuery: false,
      type: '日期'
    },
    {
      name: 'a10',
      nameCN: '备注',
      visible: true,
      canQuery: false
    },
    {
      name: 'a11',
      nameCN: '转采购数量',
      visible: true,
      canQuery: false,
      readOnly: true
    },
    {
      name: 'a12',
      nameCN: '采购订单号',
      visible: true,
      canQuery: false,
      readOnly: true
    },
    {
      name: 'a13',
      nameCN: '转调拨数量',
      visible: true,
      canQuery: false,
      readOnly: true
    },
    {
      name: 'a14',
      nameCN: '内部调拨单号',
      visible: true,
      canQuery: false,
      readOnly: true
    },
    {
      name: 'a15',
      nameCN: '未发货数量',
      visible: true,
      canQuery: false,
      readOnly: true
    },
    {
      name: 'a16',
      nameCN: '折扣方式',
      visible: true,
      canQuery: false,
      readOnly: true
    },
    {
      name: 'a17',
      nameCN: '折扣额度',
      visible: true,
      canQuery: false,
      readOnly: true
    }
  ],
  tableMultiSelect: true
}

// table内容
const tableData = {
  resultCode: 0,
  data: {
    content: [
      {
        id: '123',
        a1: 1,
        goodsName: '',
        a3: '',
        a4: '',
        a5: '',
        a6: '',
        reqPurchaseNum: '',
        danjia: '',
        reqPurchaseAmount: '',
        arrivalDate: '',
        a10: '',
        a11: '',
        a12: '',
        a13: '',
        a14: '',
        a15: '',
        a16: '',
        a17: ''
      }
    ]
  }
}

export default [
  // head 头数据
  {
    url: /\/login\/metadata\/demoDTO/,
    type: 'get',
    data: tableHead
  },
  // body 行数据
  {
    url: /\/login\/demoService\/findBy/,
    type: 'post',
    data: tableData
  }
]
