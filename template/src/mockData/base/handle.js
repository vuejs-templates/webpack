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
      'readOnly': true,
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
      readOnly: true,
      canQuery: false
    },
    {
      name: 'danjia',
      nameCN: '库存单价',
      visible: true,
      readOnly: true,
      canQuery: false
    },
    {
      name: 'confirmNum',
      nameCN: '确认数量',
      visible: true,
      type: '整型',
      required: true,
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
      readOnly: true,
      canQuery: false,
      type: '日期'
    },
    {
      name: 'a10',
      nameCN: '备注',
      visible: true,
      canQuery: false
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
        goodsName: 'a级东方红苹果（大）',
        a3: '10103311',
        a4: 'a级',
        a5: '800',
        a6: 'kg',
        reqPurchaseNum: '500',
        danjia: '6.8',
        confirmNum: 400,
        reqPurchaseAmount: 3400,
        arrivalDate: '2018-05-01',
        a10: '我是备注'
      }
    ]
  }
}

export default [
  // head 头数据
  {
    url: /\/base\/metadata\/handleDTO/,
    type: 'get',
    data: tableHead
  },
  // body 行数据
  {
    url: /\/base\/handleService\/findBy/,
    type: 'post',
    data: tableData
  }
]
