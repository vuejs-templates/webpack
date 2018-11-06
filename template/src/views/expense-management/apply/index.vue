<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>客户费用申请</el-breadcrumb-item>
    </el-breadcrumb>
    <pagoda-erp-form
      service="order"
      model="tb_req_goods"
      v-model="erpFormData"
      :edit-item-props="editItemProps"
      label-width="120px"
      inline
      ref="erpForm"
    >
      <el-button type="warning" @click="handleReset">重置</el-button>
      <template slot="goodsName" slot-scope="scope">
        <span>{{scope.label}}</span>
      </template>
    </pagoda-erp-form>
    <pagoda-form-group
      :form-options="[{
        type: 'input',
        label: '商品名称',
        on: {
          input: handleSearch
        }
      }]"
      inline
    >
      <el-button @click="handleSearchIndex('prev')">上一条</el-button>
      <el-button @click="handleSearchIndex('next')">下一条</el-button>
    </pagoda-form-group>
    <pagoda-erp-table
      service="order"
      model="tb_req_goods"
      :grid-btns="gridBtns"
      :grid-custom-btns="gridCustomBtns"
      :edit-item-props="editItemProps"
      :edit-item-input="editItemInput"
      :edit-column-config="editColumnConfig"
      :constraint="{
        goodsName: 'custom'
      }"
      editable
      ref="erpTable"
    >
      <template slot-scope="scope" slot="goodsImg">
        <el-button type="text">上传</el-button>
      </template>
      <template slot-scope="scope" slot="goodsName-slot">
        <pagoda-form-group :form-options="formOptions" v-model="formData" inline>
          <el-button type="primary" @click="tableFilterData = Object.assign({}, formData)">查询</el-button>
        </pagoda-form-group>
        <pagoda-table
          style="margin-bottom: 10px"
          :request="request"
          selection-column="single"
          :table-filter-data="tableFilterData"
          @selection-change="handleSelectChange"
          ref="selectGoodsTable"
        >
        </pagoda-table>
        <span slot="footer">
          <el-button @click="scope.dialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="handleSelectGoods(scope)">确 定</el-button>
        </span>
      </template>
    </pagoda-erp-table>
  </div>
</template>

<script>
  import axios from 'axios'

  import {
    getOperatesConfig
  } from '../../../utils/get-application-permission'

  export default {
    name: 'EXPENSE_MANAGEMENT_APPLY',
    data () {
      const vm = this

      const operates = this.$route.meta.permission.operates
      const gridBtns = ['check', 'add', 'edit', 'cancel', 'print', 'export']
      const gridCustomBtns = {
        add: {
          type: 'success',
          onClick: () => {
            this.$router.push({name: 'EXPENSE_MANAGEMENT_APPLY_ADD'})
          }
        },
        edit: {
          type: 'success',
          onClick: () => {
            this.$router.push({name: 'EXPENSE_MANAGEMENT_APPLY_EDIT'})
          }
        },
        check: {
          type: 'primary',
          onClick: () => {
            this.$router.push({name: 'EXPENSE_MANAGEMENT_APPLY_DETAILS'})
          }
        },
        print: {
          type: 'success',
          onClick () {
            console.log('print')
          }
        },
        export: {
          type: 'default',
          onClick () {
            console.log('export')
          }
        }
      }

      const editColumnConfig = {
        label: '操作',
        fixed: 'right',
        setBtnGroup: function (row) {
          let check = {
            key: 'column-check',
            type: 'primary',
            onClick (e, btnSelf, currentRowBtns, metaData) {
              console.log(row, 'edit-column-check', metaData)
            }
          }

          let del = {
            key: 'del',
            type: 'danger',
            onClick () {
              vm.$refs.erpTable.cancel()
            }
          }

          let edit = {
            key: 'column-edit',
            type: 'default',
            onClick () {
              console.log(row.index)
              vm.$refs.erpTable.editRows()
            }
          }

          return [check, edit, del]
        }
      }

      const operatesConfig = getOperatesConfig({
        gridBtns,
        gridCustomBtns,
        editColumnConfig
      }, operates)

      console.log(1111, operatesConfig)

      return {
        erpFormData: {},
        gridBtns: operatesConfig.gridBtns,
        gridCustomBtns: operatesConfig.gridCustomBtns,
        editColumnConfig: operatesConfig.editColumnConfig,
        formOptions: [{
          label: '商品名称',
          key: 'key',
          type: 'input'
        }],
        editItemProps: {
          goodsName: {
            labelKey: 'name',
            valueKey: 'name',
            url: 'order-web/order/tb_req_orderService/goods/list',
            params: {
              resourceTagCode: 'purchaseGoods'
            },
            advancedSearchTitle: '选择商品：',
            remote: 'key'
          }
        },
        editItemInput: {
          goodsName (value, selectData, rowData) {
            rowData.goodsCode = selectData.code
          }
        },
        tableFilterData: {},
        formData: {}
      }
    },
    methods: {
      handleSearchIndex (type) {
        if(type === 'next') {
          this.activeRowIndex++
        }else{
          this.activeRowIndex--
        }

        if(this.activeRowIndex >= 0 && this.activeRowIndexs[this.activeRowIndex]) {
          this.$refs.erpTable.scrollTo(this.activeRowIndexs[this.activeRowIndex])
        }
      },
      handleSearch (val) {
        const tableData = this.$refs.erpTable.getTableData()
        this.activeRowIndexs = []
        this.activeRowIndex = 0

        tableData.forEach(rowData => {
          if(rowData.goodsName === val) {
            this.activeRowIndexs.push(rowData.$index)
          }
        })

        if(this.activeRowIndexs.length) {
          this.$refs.erpTable.scrollTo(this.activeRowIndexs[this.activeRowIndex])
        }
      },
      handleReset () {
        this.$refs.erpForm.reset()
      },
      request (tableFilterData) {
        return new Promise(resolve => {
          axios.get('order-web/order/tb_req_orderService/goods/list?resourceTagCode=purchaseGoods&key=' + (tableFilterData.key || ''))
            .then(res => {
              resolve({
                head: [{
                  label: '商品代码',
                  prop: 'code'
                }, {
                  label: '商品名称',
                  prop: 'name'
                }],
                data: res.data.data.slice(0, 10)
              })
            })
        })
      },
      handleSelectChange (selection) {
        this.selection = selection
      },
      handleSelectGoods (scope) {
        const selection = this.selection[0]

        if(selection){
          scope.dialog.visible = false
          scope.input(selection.name, selection)
        }else{
          this.$message.error('请选择商品')
        }
      }
    }
  }
</script>
