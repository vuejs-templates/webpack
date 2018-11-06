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
        a10: '我是备注'
      }
    ]
  }
}

export default [
  // head 头数据
  {
    url: /\/base\/metadata\/addDTO/,
    type: 'get',
    data: tableHead
  },
  // body 行数据
  {
    url: /\/base\/addService\/findBy/,
    type: 'post',
    data: tableData
  },
  // head 头数据
  {
    url: /\/base\/metadata\/editDTO/,
    type: 'get',
    data: tableHead
  },
  // body 行数据
  {
    url: /\/base\/editService\/findBy/,
    type: 'post',
    data: tableData
  },
  // head 头数据
  {
    url: /\/base\/metadata\/detailDTO/,
    type: 'get',
    data: tableHead
  },
  // body 行数据
  {
    url: /\/base\/detailService\/findBy/,
    type: 'post',
    data: tableData
  }
]
