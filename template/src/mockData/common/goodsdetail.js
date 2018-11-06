// 表头
const tableHead = {
  resultCode: 0,
  head: [
    {
      name: 'a1',
      nameCN: '商品代码',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a2',
      nameCN: '商品名称',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a3',
      nameCN: '等级',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a4',
      nameCN: '规格',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a5',
      nameCN: '基本单位',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a6',
      nameCN: '需求数量',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a7',
      nameCN: '请购数量',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a8',
      nameCN: '库存单价',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a9',
      nameCN: '需求金额',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a10',
      nameCN: '应到货日期',
      visible: true,
      readOnly: true,
      canQuery: false
    }, {
      name: 'a11',
      nameCN: '备注',
      visible: true,
      readOnly: true,
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
        id: '11',
        a1: 10103311,
        a2: 'a级东方红苹果（大）',
        a3: 'a级',
        a4: '800',
        a5: 'kg',
        a6: '400',
        a7: '500',
        a8: '6.8',
        a9: '3400',
        a10: '2018-05-01',
        a11: 'test'
      }, {
        id: '11',
        a1: 10103311,
        a2: 'a级东方红苹果（大）',
        a3: 'a级',
        a4: '800',
        a5: 'kg',
        a6: '400',
        a7: '500',
        a8: '6.8',
        a9: '3400',
        a10: '2018-05-01',
        a11: 'test'
      }
    ]
  }
}

export default [
  // head 头数据
  {
    url: /\/order\/metadata\/goods_detailDTO/,
    type: 'get',
    data: tableHead
  },
  // body 行数据
  {
    url: /\/order\/goods_detailService\/findBy/,
    type: 'post',
    data: tableData
  }
]
