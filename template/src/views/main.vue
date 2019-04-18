<template>
  <!-- 实现一屏展示时 一定要保证form-table-layout的高度，此处只作为示例 -->
  <pagoda-form-table-layout
    v-model="formData"
    :form-options="formOptions"
    @submit="handleSubmit"
  >
    <template slot="table-btns">
      <pagoda-row-btns
        :btns="rowBtns"
        :visibles="btnVisibles"
      ></pagoda-row-btns>
    </template>
    <template slot="table" slot-scope="scope">
      <!-- 实现一屏展示时 一定要配置表格高度 -->
      <pagoda-table
        :head="tableHead"
        :request="request"
        :editColumnConfig="editColumnConfig"
        :height="scope.height"
        column-filter
      ></pagoda-table>
    </template>
  </pagoda-form-table-layout>
</template>

<script>
export default {
  data () {
    return {
      tableHead: [{
        prop: 'date',
        label: '日期'
      }, {
        prop: 'name',
        label: '姓名'
      }, {
        prop: 'address',
        label: '地址'
      }],
      rowBtns: {
        save: {
          text: '保存',
          onClick: this.handleSave
        },
        cancel: {
          text: '取消',
          onClick: this.handleCancel,
          confirm: '确认取消吗'
        },
        calculate: {
          text: '计算',
          onClick: this.handleCalculate,
          tooltip: '结合计算方式和采购系数自动计算请购数量'
        },
        submit: {
          text: '提交',
          onClick: this.handleSubmit
        }
      },
      btnVisibles: ['save', 'cancel', 'calculate', 'submit'],
      editColumnConfig: {
        label: '操作',
        width: '240',
        fixed: 'right',
        collapse: true,
        setBtnGroup: (row) => {
          let detailBtn = {
            text: '当前标签查看详情',
            onClick: () => {
              // 在当前详情页查看详情 列表页与详情页的路由地址要保持有层级关系 例如这里的 /main 和 /main/layout
              this.$router.replace({path: '/main/detail1', query: {a: 1}})
            }
          }

          let detailBtn2 = {
            text: '新增标签查看详情',
            onClick: () => {
              // 若当前路由需要打开新标签，则需在路由meta字段中配置tabConfig 详细配置请参考 router/index.js
              this.$router.replace({path: '/detail2', query: {index: row.index}})
            }
          }

          return [detailBtn, detailBtn2]
        }
      },
      formData: {},
      formOptions: [{
        label: '姓名',
        type: 'input',
        key: 'name'
      }, {
        label: '性别',
        type: 'select',
        key: 'sex',
        options: [
          {
            label: '男'
          },
          {
            label: '女'
          }
        ]
      }, {
        label: '省',
        type: 'province',
        key: 'province',
        advancedSearch: true,
        on: {
          change: (province) => {
            this.formOptions[3].props.province = province
            this.formData.city = ''
            this.formData.district = ''
          }
        }
      }, {
        label: '市',
        type: 'city',
        key: 'city',
        advancedSearch: true,
        props: {
          province: ''
        },
        on: {
          change: (city) => {
            this.formOptions[4].props.city = city
            this.formData.district = ''
          }
        }
      }, {
        label: '区',
        type: 'district',
        key: 'district',
        advancedSearch: true,
        props: {
          city: ''
        }
      }],
      tableData: Array.from({length: 30}, () => ({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }))
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.formData)
    },
    request () {
      return new Promise(resolve => {
        // 此处模拟调用接口
        // 调用成功
        resolve({
          tableId: 'mokeId',
          data: Array.from({length: 30}, () => ({
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          })),
          // 此处为服务端返回的总数据条数
          totalDataNum: 20
        })

        // 接口出错
        // resolve({
        //   head,
        //   data: []
        // })
      })
    }
  }
}
</script>
