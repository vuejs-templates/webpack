import goodsdetail from './goodsdetail' // 商品详情
import demo from './demo' // 商品详情
export default [
  // 公用head 头数据
  // {
  //   url: /undefined(.)*DTO/,
  //   type: 'get',
  //   data: require('../common/table-head-json').default
  // },
  // // 公用body 行数据
  // {
  //   url: /undefined(.)*findBy/,
  //   type: 'post',
  //   data: require('../common/table-body-json').default
  // },
  // 公用商品名称数据
  {
    url: /order\/tb_req_orderService\/goods\/list/,
    type: 'get',
    data: require('../common/food.json')
  },
  // 2018-5-31 15:59:33 状态options 未提交 待审核 请购完成 已作废
  {
    url: /\/mock\/get_status/,
    type: 'get',
    data: {
      resultCode: 0,
      data: [
        {name: '未提交'},
        {name: '待审核'},
        {name: '请购完成'},
        {name: '已作废'}
      ]
    }
  },
  ...goodsdetail,
  ...demo
]
