export const storeRemotePrefix = 'erp_store'
// 2018-5-23 09:35:03 表单筛选 datePicker为daterange时间段时，props的默认设置
export const daterangeProps = {
  type: 'daterange',
  'range-separator': '至',
  'unlink-panels': true,
  'value-format': 'yyyy-MM-dd',
  'start-placeholder': '开始日期',
  'end-placeholder': '结束日期'
}
// 2018-7-7 16:51:46 表单筛选 datePicker为范围约，props的默认设置
export const monthrangeProps = {
  type: 'daterange',
  'range-separator': '至',
  'unlink-panels': true,
  'value-format': 'yy-MM-dd',
  'start-placeholder': '开始月份',
  'end-placeholder': '结束月份'
  // 'picker-options': {
  //   disabledDate (time) {
  //     let lastDate = new Date(time.getFullYear(), time.getMonth(), 0)
  //     let lastDay = lastDate.getDate()
  //     console.log(lastDay)
  //     let day = time.getDate()
  //     return day !== 1 && day !== lastDay
  //   }
  // }
}
// 表单筛选默认labelWidth
export const formLabelWidth = '110px'
// 备注默认字数限制
export const remarkMaxlength = '200'
// 2018-8-23 17:05:01 给每个路由组件统一增加前缀命名
export const prefix = 'erp-store'
// 商品名称表单通用 props 设置
export const goodsNameProps = {
  labelKey: 'name',
  valueKey: 'name',
  placeholder: '',
  params: {
  },
  clearable: true,
  remote: 'key',
  url: '/order/tb_req_orderService/goods/list'
}
// 可搜索下拉框多选功能 props 设置
export const getSearchSelectProps = (props) => {
  return Object.assign({
    labelKey: 'id',
    valueKey: 'id',
    placeholder: '',
    multiple: true,
    'reserve-keyword': true, // 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
    'collapse-tags': true,
    clearable: true,
    remote: 'key'
  }, props)
}

export const getErpTableProps = (props) => {
  return Object.assign({
    'column-filter': false,
    'grid-custom-btns-size': 'small',
    'remenber-column-width': true,
    'validate-msg': false,
    'double-click-edit': false,
    'max-height': '480',
    size: 'mini',
    layout: 'total, sizes, prev, pager, next, jumper'
  }, props)
}

// 分类select-tree 默认数据
export const getSelectTreeData = () => {
  return [{
    label: '全部',
    children: [{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
          value: 0
        }, {
          label: '三级 1-1-2',
          value: 1
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        value: 2
      }, {
        label: '二级 2-2',
        value: 3
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        value: 4
      }, {
        label: '二级 3-2',
        value: 5
      }]
    }]
  }]
}
