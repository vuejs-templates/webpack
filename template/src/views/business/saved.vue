<template>
  <pagoda-erp-form-table
    v-model="formData"
    :form-options="formOptions"
    :label-width="formLabelWidth"
    ref="erpFormTabel"
    @submit="submit"
  >
    <template slot="table-btns">
      <pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles"></pagoda-row-btns>
    </template>
    <template slot="table" slot-scope="scope">
      <pagoda-erp-table-v2
        v-show="action === 'add'"
        project-name="ERP2_New"
        view="store_business_edit_saved"
        :config="$viewConfig['store_business_edit_saved']"
        :edit-column-config="editColumnConfig"
        :edit-item-input="editItemInput"
        :default-data="[]"
        :summaryMethod="summaryMethod"
        :default-editing="true"
        :head-selection="false"
        :pagination="false"
        ref="erpTableAdd"
        :height="scope.height"
        size="mini"
        class="base-list"
        :column-filter="false"
        :on="onMethod"
      >
        <template slot="cusOrgCode-slot" slot-scope="scope">
          <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.code }}</span>
          <span style="float: right; color: #8492a6;">{{ scope.name }}</span>
        </template>
        <template slot="bankAccName-slot" slot-scope="scope">
          <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.bankAccNo }}</span>
          <span style="float: right; color: #8492a6;">{{ scope.bankAccName }}</span>
        </template>
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <pagoda-erp-table-v2
        v-show="action === 'edit-saved'"
        project-name="ERP2_New"
        view="store_business_edit_saved"
        :config="$viewConfig['store_business_edit_saved']"
        empty
        :edit-item-input="editItemInput"
        :summaryMethod="summaryMethod"
        :default-editing="true"
        :head-selection="false"
        :pagination="false"
        ref="erpTableEditSaved"
        :height="scope.height"
        size="mini"
        class="base-list"
        :column-filter="false"
        :on="onMethod"
      >
        <template slot="cusOrgCode-slot" slot-scope="scope">
          <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.code }}</span>
          <span style="float: right; color: #8492a6;">{{ scope.name }}</span>
        </template>
        <template slot="bankAccName-slot" slot-scope="scope">
          <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.bankAccNo }}</span>
          <span style="float: right; color: #8492a6;">{{ scope.bankAccName }}</span>
        </template>
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <pagoda-erp-table-v2
        v-show="action === 'edit-received'"
        dev
        project-name="ERP2_New"
        view="store_business_edit_received"
        :config="$viewConfig['store_business_edit_received']"
        empty
        :edit-item-input="editItemInput"
        :summaryMethod="summaryMethod"
        :default-editing="true"
        :head-selection="false"
        :pagination="false"
        ref="erpTableEditReceived"
        :height="scope.height"
        size="mini"
        class="base-list"
        :column-filter="false"
        :on="onMethod"
      >
        <template slot="cusOrgCode-slot" slot-scope="scope">
          <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.code }}</span>
          <span style="float: right; color: #8492a6;">{{ scope.name }}</span>
        </template>
        <template slot="bankAccName-slot" slot-scope="scope">
          <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.bankAccNo }}</span>
          <span style="float: right; color: #8492a6;">{{ scope.bankAccName }}</span>
        </template>
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <pagoda-erp-table-v2
        dev
        v-show="action === 'default'"
        project-name="ERP2_New"
        view="store_business_saved"
        :config="$viewConfig['store_business_saved']"
        :request-url="tableRequestUrl"
        :empty="query"
        :table-filter-data="filterForm"
        :edit-item-input="editItemInput"
        :summaryMethod="summaryMethod"
        :head-selection="false"
        :pageSize="10"
        ref="erpTable"
        :height="scope.height"
        size="mini"
        class="business-saved-default"
      >
        <template slot="savAmt" slot-scope="scope">
          {{ formatMoney(scope.row['savAmt'], 4) }}
        </template>
        <template slot="realTicketAmt" slot-scope="scope">
          {{ formatMoney(scope.row['realTicketAmt'], 4) }}
        </template>
        <template slot="limitTicketAmt" slot-scope="scope">
          {{ formatMoney(scope.row['limitTicketAmt'], 4) }}
        </template>
        <template slot="largessTickAmt" slot-scope="scope">
          {{ formatMoney(scope.row['largessTickAmt'], 4) }}
        </template>
        <template slot="recAmt" slot-scope="scope">
          {{ formatMoney(scope.row['recAmt'], 4) }}
        </template>
        <template slot="monAmt" slot-scope="scope">
          {{ formatMoney(scope.row['monAmt'], 4) }}
        </template>
        <template slot="recMonAmt" slot-scope="scope">
          {{ formatMoney(scope.row['recMonAmt'], 4) }}
        </template>
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
        <template slot="appRemark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['appRemark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
    </template>
  </pagoda-erp-form-table>
</template>

<script>
  import {mapState} from 'vuex'
  import searchCommon from '@/mixins/formSearchCommon'
  import publicChoice from '@/views/business/publicChoice'
  import { formLabelWidth, remarkMaxlength } from '@/utils/default-setting'
  import { formatDate, formatMoney, formatMoneyToNumber } from '@/utils/utils'

  export default {
    name: 'business-saved',
    mixins: [searchCommon],
    components: {
    },
    data () {
      return {
        tableRequestUrl: `${this.AjaxService.devUrl1}/StoreBusinessMoneyService/viewList`,
        formLabelWidth,
        remarkMaxlength,
        formatMoney,
        formData: {},
        formOptions: [
          {
            label: '客户代码',
            type: 'bdc-select',
            key: 'cusOrgCode',
            props: {
              url: `${this.AjaxService.devUrl1}/GeneralService/selectOrgCusVenInfoByAuthority?type=35`,
              labelKey: 'code',
              valueKey: 'code',
              clearable: true,
              remote: 'cusOrgName'
            }
          },
          {
            label: '营业日期',
            type: 'date-picker',
            key: 'date',
            props: {
              type: 'daterange'
            }
          },
          {
            label: '是否有图',
            type: 'select',
            key: 'existPicture',
            options: publicChoice.hasPic,
            props: {
              clearable: true
            }
          },
          {
            label: '状态',
            type: 'select',
            key: 'status',
            options: publicChoice.documentStatusOptions,
            props: {
              clearable: true
            }
          },
          {
            label: '存款银行账户名称',
            type: 'bdc-select',
            key: 'bankAccName',
            props: {
              url: `${this.AjaxService.devUrl2}/BasStoreAccountService/selectBankAccNoAndName`,
              labelKey: 'bankAccName',
              valueKey: 'bankAccName',
              clearable: true,
              remote: 'bankAccName'
            }
          }
        ],
        filterForm: {},
        editColumnConfig: {
          label: '操作',
          width: '150',
          fixed: 'right'
        },
        editItemInput: {
          businessDate: function (value, rowData) {
            if (value !== '') {
              rowData.corSalesDate = formatDate(value.getTime() - 24*60*60*1000)
            }
          },
          cusOrgCode: function (value, selectData, rowData) {
            rowData.cusOrgName = selectData.name
            rowData.cusOrgId = selectData.id
          },
          bankAccName: function (value, selectData, rowData) {
            rowData.accountId = selectData.id
            rowData.bankAccNo = selectData.bankAccNo
          }
        },
        rowBtns: {
          // 表格上方操作按钮
          add: {
            text: '新增',
            onClick: () => {
              // 切换按钮状态
              this.action = 'add'
              this.$refs.erpTableAdd.refreshCurrentPage()
              this.$nextTick(() => {
                this.editColumnConfig.setBtnGroup = (row) => {
                  return [{
                    type: 'text',
                    text: '删除',
                    onClick: () => {
                      this.$refs.erpTableAdd.delRows(row.$index)
                    }
                  }]
                }
                const props = ['type', 'status']
                setTimeout(() => {
                  this.$refs.erpTableAdd.$refs.tableRef.tableData.head.forEach((item) => {
                    if (props.includes(item.prop)) {
                      item.constraint = ''
                    }
                  })
                }, 0)
                this.$refs.erpTableAdd.newRows([{
                  businessDate: new Date(),
                  monAmt: '0.0000',
                  savAmt: '0.0000',
                  recMonAmt: '0.0000',
                  corSalesDate: new Date(new Date().getTime() - 24*60*60*1000)
                }])
              })
            }
          },
          save: {
            text: '保存',
            onClick: () => {
              let params = {}
              if (this.action === 'add') {
                const addList = []
                const table = this.$refs.erpTableAdd
                // 校验是否为空
                if (table.validateEditingItems()) {
                  // 构造请求参数
                  const list = table.$refs.tableRef.tableData.data
                  list.map((item) => {
                    const obj = {
                      accountId: item.accountId,
                      bankAccName: item.bankAccName,
                      bankAccNo: item.bankAccNo,
                      businessDate: formatDate(item.businessDate),
                      corSalesDate: formatDate(item.corSalesDate),
                      cusOrgCode: item.cusOrgCode,
                      cusOrgId: item.cusOrgId,
                      cusOrgName: item.cusOrgName,
                      monAmt: item.monAmt,
                      savAmt: item.savAmt,
                      recMonAmt: item.recMonAmt,
                      remark: item.remark
                    }
                    addList.push(obj)
                  })
                  params = {
                    addList: addList
                  }
                  this.BusinessService.addBusinessSaved(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('新增成功!')
                      // 重新刷新表格
                      this.handleRefresh()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `新增失败：${msg}` : `新增失败`)
                    }
                  })
                } else {
                  this.$message.error('请填写完整必填信息!')
                }
              } else if (this.action === 'edit-received') {
                const editList = []
                const table = this.$refs.erpTableEditReceived
                // 校验是否为空
                if (table.validateEditingItems()) {
                  // 构造请求参数
                  const list = table.$refs.tableRef.tableData.data
                  list.map((item) => {
                    const obj = {
                      id: item.id,
                      accountId: item.accountId,
                      bankAccName: item.bankAccName,
                      bankAccNo: item.bankAccNo,
                      businessDate: formatDate(item.businessDate),
                      corSalesDate: formatDate(item.corSalesDate),
                      cashierEmpName: item.cashierEmpName,
                      cashierEmpNo: item.cashierEmpNo,
                      cashierUserCode: item.cashierUserCode,
                      cashierUserName: item.cashierUserName,
                      payInImage: item.payInImage,
                      realTicketAmt: formatMoneyToNumber(item.realTicketAmt),
                      limitTicketAmt: formatMoneyToNumber(item.limitTicketAmt),
                      largessTickAmt: formatMoneyToNumber(item.largessTickAmt),
                      cusOrgCode: item.cusOrgCode,
                      cusOrgId: item.cusOrgId,
                      cusOrgName: item.cusOrgName,
                      monAmt: formatMoneyToNumber(item.monAmt),
                      recAmt: formatMoneyToNumber(item.recAmt),
                      recMonAmt: formatMoneyToNumber(item.recMonAmt),
                      remark: item.remark
                    }
                    editList.push(obj)
                  })
                  params = {
                    editList: editList
                  }
                  this.BusinessService.editBusinessReceived(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('修改成功!')
                      // 重新刷新表格
                      this.handleRefresh()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `修改失败：${msg}` : `修改失败`)
                    }
                  })
                }
              }else if (this.action === 'edit-saved') {
                const editList = []
                const table = this.$refs.erpTableEditSaved
                // 校验是否为空
                if (table.validateEditingItems()) {
                  // 构造请求参数
                  const list = table.$refs.tableRef.tableData.data
                  list.map((item) => {
                    const obj = {
                      id: item.id,
                      accountId: item.accountId,
                      bankAccName: item.bankAccName,
                      bankAccNo: item.bankAccNo,
                      businessDate: formatDate(item.businessDate),
                      corSalesDate: formatDate(item.corSalesDate),
                      cusOrgCode: item.cusOrgCode,
                      cusOrgId: item.cusOrgId,
                      cusOrgName: item.cusOrgName,
                      monAmt: formatMoneyToNumber(item.monAmt),
                      savAmt: formatMoneyToNumber(item.savAmt),
                      recMonAmt: formatMoneyToNumber(item.recMonAmt),
                      remark: item.remark
                    }
                    editList.push(obj)
                  })
                  params = {
                    editList: editList
                  }
                  this.BusinessService.editBusinessSaved(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('修改成功!')
                      // 重新刷新表格
                      this.handleRefresh()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `修改失败：${msg}` : `修改失败`)
                    }
                  })
                } else {
                  this.$message.error('请填写完整必填信息!')
                }
              }
            }
          },
          cancel: {
            text: '取消',
            confirm: '当前界面操作数据不保留，是否取消，确认后返回列表！',
            onClick: () => {
              this.handleRefresh()
            }
          },
          addCol: {
            text: '新增行',
            onClick: () => {
              // 添加一行可编辑行
              const table = this.$refs.erpTableAdd.$refs.tableRef
              this.$nextTick(() => {
                table.newRows([{
                  businessDate: new Date(),
                  monAmt: '0.0000',
                  savAmt: '0.0000',
                  recMonAmt: '0.0000',
                  corSalesDate: new Date(new Date().getTime() - 24*60*60*1000)
                }])
              })
            }
          },
          delCol: {
            text: '删除行',
            onClick: () => {
              const table = this.$refs.erpTableAdd.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                const indexs = []
                for (let i = 0; i < selection.length; i++) {
                  indexs.push(selection[i].$index)
                }
                table.delRows(indexs)
              }
            }
          },
          edit: {
            text: '修改',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (selection.length > 0) {
                if (selection.filter(item => item.status > 20).length > 0) {
                  this.$message.error('只能修改已完成状态和未提交状态的项目')
                  return
                }
                // 三种选择状态
                // 全为实收
                if (selection.filter(item => item.type === '10').length === selection.length) {
                  selection.forEach(item => {
                    item.recAmt = formatMoney(item.recAmt, 4)
                    item.realTicketAmt = formatMoney(item.realTicketAmt, 4)
                    item.limitTicketAmt = formatMoney(item.limitTicketAmt, 4)
                    item.largessTickAmt = formatMoney(item.largessTickAmt, 4)
                    item.monAmt = formatMoney(item.monAmt, 4)
                    item.recMonAmt = formatMoney(item.recMonAmt, 4)
                  })
                  // 切换按钮状态
                  this.action = 'edit-received'
                  // 打开选中行可编辑行
                  // 去除编辑时无需修改项的规则
                  const props = ['type', 'cusOrgCode', 'cashierUserCode', 'cashierUserName', 'cashierEmpNo', 'cashierEmpName', 'status']
                  this.$refs.erpTableEditReceived.refreshCurrentPage()
                  this.$nextTick(() => {
                    this.$refs.erpTableEditReceived.$refs.tableRef.tableData.head.forEach((item) => {
                      if (props.includes(item.prop)) {
                        item.constraint = ''
                      }
                    })
                    this.$refs.erpTableEditReceived.newRows(selection)
                  })
                } else if (selection.filter(item => item.type === '20').length === selection.length) {
                  selection.forEach(item => {
                    item.savAmt = formatMoney(item.savAmt, 4)
                    item.monAmt = formatMoney(item.monAmt, 4)
                    item.recMonAmt = formatMoney(item.recMonAmt, 4)
                  })
                  // 切换按钮状态
                  this.action = 'edit-saved'
                  // 打开选中行可编辑行
                  // 去除编辑时无需修改项的规则
                  const props = ['type', 'cusOrgCode', 'status']
                  this.$refs.erpTableEditSaved.refreshCurrentPage()
                  this.$nextTick(() => {
                    this.$refs.erpTableEditSaved.$refs.tableRef.tableData.head.forEach((item) => {
                      if (props.includes(item.prop)) {
                        item.constraint = ''
                      }
                    })
                    this.$refs.erpTableEditSaved.newRows(selection)
                  })
                } else {
                  this.$message.error('只能选择一种类型：实收或实存')
                }
              } else {
                this.$message.error('请选择项目')
              }
            }
          },
          delete: {
            text: '删除',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                const idList = []
                selection.forEach(item => {
                  idList.push(item.id)
                })
                const params = {
                  idList: idList
                }
                this.BusinessService.deleteBusinessReceivedOrSaved(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('删除成功!')
                    // 重新刷新表格
                    this.handleRefresh()
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `删除失败：${msg}` : `删除失败`)
                  }
                })
              }
            }
          },
          import: {
            text: '导入',
            onClick: () => {
              this.$message.success(`导入成功!`)
            }
          },
          export: {
            text: '导出',
            onClick: () => {
              this.$message.success(`导出成功!`)
            }
          },
          complete: {
            text: '完成',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                if (selection.filter(item => item.status === 10).length === selection.length) {
                  const editList = []
                  selection.forEach(item => {
                    editList.push({
                      id: item.id,
                      newStatus: 20
                    })
                  })
                  const params = {
                    editList: editList
                  }
                  this.BusinessService.setBusinessStatus(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('完成操作成功!')
                      // 重新刷新表格
                      this.handleRefresh()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `完成操作失败：${msg}` : `完成操作失败`)
                    }
                  })
                } else {
                  this.$message.error('只能修改未提交状态的项目的状态')
                }
              }
            }
          },
          cancelComplete: {
            text: '取消完成',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                if (selection.filter(item => item.status === 20).length === selection.length) {
                  const editList = []
                  selection.forEach(item => {
                    editList.push({
                      id: item.id,
                      newStatus: 10
                    })
                  })
                  const params = {
                    editList: editList
                  }
                  this.BusinessService.setBusinessStatus(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('取消完成操作成功!')
                      // 重新刷新表格
                      this.handleRefresh()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `取消完成操作失败：${msg}` : `取消完成操作失败`)
                    }
                  })
                } else {
                  this.$message.error('只能修改已完成状态的项目的状态')
                }
              }
            }
          },
        },
        action: 'default',
        query: true,
        tableData: {},
        summaryMethod: {},
        onMethod: {}
      }
    },
    created () {
    },
    mounted () {
      this.doLayout()
      const props = ['recAmt', 'realTicketAmt', 'limitTicketAmt', 'largessTickAmt', 'savAmt', 'monAmt', 'recMonAmt']
      const summaryMethod = {}
      const onMethod = {}
      props.forEach(item => {
        // 添加列表小计方法
        summaryMethod[item] = (tableData) => {
          return this.summaryFunction(tableData, item)
        }
        onMethod[item] = {
          blur: (event) => {
            let value = event.target.value
            // 格式化输入的值
            value = parseFloat(formatMoneyToNumber(value), 10)
            event.target.value = formatMoney(value, 4)
            // 重新计算合计
            if (this.action === 'add') {
              this.$refs.erpTableAdd.pageTotal()
            } else if (this.action === 'edit-received') {
              this.$refs.erpTableEditReceived.pageTotal()
            } else if (this.action === 'edit-saved') {
              this.$refs.erpTableEditSaved.pageTotal()
            }
          }
        }
      })
      this.summaryMethod = summaryMethod
      this.onMethod = onMethod
    },
    methods: {
      doLayout () {
        this.$refs.erpFormTabel.doLayout()
      },
      submit () {
        if (this.query) {
          this.query = false
          this.$refs.erpTable.refreshCurrentPage()
        }
        // table筛选
        let reqData = {
          bankAccName: this.formData.bankAccName,
          businessDateStrat: this.formData.date ? formatDate(this.formData.date[0], 'startTime') : undefined,
          businessDateEnd: this.formData.date ? formatDate(this.formData.date[1], 'endTime') : undefined,
          cusOrgCode: this.formData.cusOrgCode,
          status: this.formData.status,
          existPicture: this.formData.existPicture
        }
        this.filterForm = Object.assign({}, reqData)
      },
      handleRefresh () {
        // 切换按钮状态
        this.action = 'default'
        // 重新刷新表格
        this.editColumnConfig.setBtnGroup = (row) => {
          return []
        }
        this.$refs.erpTable.refreshCurrentPage()
      },
      summaryFunction(tableData, key) {
        let sum = 0
        tableData.forEach(item => {
          sum += formatMoneyToNumber(item[key])
        })
        return formatMoney(sum, 4)
      }
    },
    computed: {
      ...mapState(['role']),
      btnVisibles () {
        let btnsObj = {
          'add': ['cancel', 'save', 'addCol', 'delCol'],
          'edit-saved': ['cancel', 'save'],
          'edit-received': ['cancel', 'save'],
          'default': ['add', 'edit', 'delete', 'import', 'export', 'complete', 'cancelComplete']
        }
        return btnsObj[this.action]
      }
    }
  }
</script>
<style lang="stylus">
  .business-saved-default {
    .rec-amt, .real-ticket-amt, .limit-ticket-amt, .largess-tick-amt, .mon-amt, .rec-mon-amt, .sav-amt {
      text-align right
    }
  }
</style>
