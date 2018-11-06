<script>
export default {
	classesTypeOptions: [
		{
			label: '门店费用',
			value: 1
    }, {
			label: '宿舍费用',
			value: 2
    }
  ],
	stateOptions: [
		{
			label: '启用',
			value: 1
    }, {
			label: '关闭',
			value: 0
    }
  ],
  documentStatusOptions: [
    {
      label: '未提交',
      value: 10
    },
    {
      label: '待审核',
      value: 20
    },
    {
      label: '待付款',
      value: 30
    },
    {
      label: '已完成',
      value: 40
    },
    {
      label: '已拒绝',
      value: 50
    }
  ]
}
</script>
