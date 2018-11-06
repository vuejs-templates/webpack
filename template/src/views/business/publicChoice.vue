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
    hasPic: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 0
      },
    ],
    documentStatusOptions: [
      {
        label: '未提交',
        value: 10
      },
      {
        label: '已完成',
        value: 20
      },
      {
        label: '实收审核',
        value: 30
      },
      {
        label: '实存审核',
        value: 40
      }
    ]
  }
</script>
