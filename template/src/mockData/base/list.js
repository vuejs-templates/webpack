// 表头
const tableHead = {
  resultCode: 0,
  head: [
    {
      name: '序号',
      nameCN: '序号',
      visible: true,
      canQuery: true
    }, {
      name: 'XX单号',
      nameCN: 'XX单号',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: 'XX金额',
      nameCN: 'XX金额',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: 'XX数量',
      nameCN: 'XX数量',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: '重量',
      nameCN: '重量',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: '税率',
      nameCN: '税率',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: '备注',
      nameCN: '备注',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: '最后修改人',
      nameCN: '最后修改人',
      visible: true,
      canQuery: true,
      sortable: true
    }, {
      name: '最后修改时间',
      nameCN: '最后修改时间',
      visible: true,
      canQuery: true,
      sortable: true
    }
  ],
  tableMultiSelect: true
}

// table内容
const tableData = {
  resultCode: 0,
  data: {
    'number': 0,
    numberOfElements: 3,
    totalElements: 3,
    'total': 3,
    'last': true,
    'size': 0,
    'totalPages': 1,
    'first': true,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 10
    },
    content: [
      {
        '序号': 1,
        'XX单号': 'QG2018050112001034',
        'XX金额': '10.2000',
        'XX数量': '12.50',
        '重量': '5.00',
        '税率': '5%',
        '备注': '我是备注我是备注我是备注我是备注',
        '最后修改人': '管理员',
        '最后修改时间': '2018-01-08 07:28:11'
      }, {
        '序号': 2,
        'XX单号': '',
        'XX金额': '靠右对齐',
        'XX数量': '靠右对齐',
        '重量': '靠右对齐',
        '税率': '靠右对齐',
        '备注': '',
        '最后修改人': '',
        '最后修改时间': ''
      }, {
        '序号': 3,
        'XX单号': '一般根据单据代码规则自动生成。',
        'XX金额': '前端显示保留4位小数，后端保存10位小数四舍五入每个功能做系统参数配置',
        'XX数量': '根据商品的计量单位校验是否需要保留小数。如果保留小数，前端显示保留2位小数，后端保存2位小数。件数、个数为整数，公斤可保留小数。',
        '重量': '如果保留小数，前端显示保留2位小数，后端保存2位小数。',
        '税率': '靠右对齐',
        '备注': '内容超出列宽，截短用省略号…形式展示，鼠标移中再显示完整信息。Config文件统一为200字符',
        '最后修改人': '管理员',
        '最后修改时间': '2018-01-08 07:28:11'
      }
    ]
  }
}

export default [
  // head 头数据
  {
    url: /\/base\/metadata\/listDTO/,
    type: 'get',
    data: tableHead
  },
  // body 请购单列表行数据
  {
    url: /\/base\/listService\/findBy/,
    type: 'post',
    data: tableData
  }
]
