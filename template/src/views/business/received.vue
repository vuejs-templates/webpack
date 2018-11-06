<template>
  <pagoda-erp-form-table v-model="formData" :form-options="formOptions" :label-width="formLabelWidth" ref="erpFormTabel"  @submit="submit">
    <template slot="table-btns">
      <pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles"></pagoda-row-btns>
    </template>
    <!-- add -->
    <template slot="table" slot-scope="scope">
      <pagoda-erp-table-v2
        v-show="action === 'add'"
        dev
        project-name="ERP2_New"
        view="store_business_add_received"
        :edit-item-input="editItemInput"
        :summaryMethod="summaryMethod"
        :default-data="[]"
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
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <!--  edit  -->
      <pagoda-erp-table-v2
        dev v-show="action === 'edit'"
        :empty="true"
        :summaryMethod="summaryMethod"
        project-name="ERP2_New"
        view="store_business_edit_received"
        :edit-item-input="editItemInput"
        :head-selection="false"
        :pagination="false"
        ref="erpTableEdit"
        :height="scope.height"
        size="mini"
        class="base-list"
        :column-filter="false"
        :on="onMethod"
      >
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" dev :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <!-- default -->
      <pagoda-erp-table-v2
        dev v-show="action === 'default'"
        :summaryMethod="summaryMethod"
        project-name="ERP2_New"
        view="store_business_received"
        :request-url="tableRequestUrl"
        :empty="query"
        :table-filter-data="filterForm"
        :edit-item-input="editItemInput"
        :head-selection="false"
        :pageSize="10"
        ref="erpTable"
        :height="scope.height"
        size="mini"
        class="business-received-default"
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
  import { mapState } from 'vuex'
  import searchCommon from '@/mixins/formSearchCommon'
  import publicChoice from '@/views/business/publicChoice'
  import { formLabelWidth, remarkMaxlength} from '@/utils/default-setting'
  import { formatDate, formatMoney, formatMoneyToNumber } from '@/utils/utils'

  export default {
    name: 'business-received',
    mixins: [searchCommon],
    components: {},
    data() {
      return {
        tableRequestUrl: `${this.AjaxService.devUrl1}/StoreBusinessMoneyService/viewList`,
        formLabelWidth,
        remarkMaxlength,
        formatMoney,
        action: 'default',
        tableData: {},
        formData: {},
        formOptions: [{
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
        }, {
          label: '营业日期',
          type: 'date-picker',
          key: 'date',
          props: {
            type: 'daterange'
          }
        }, {
          label: '是否有图',
          type: 'select',
          key: 'existPicture',
          options: publicChoice.hasPic,
          props: {
            clearable: true
          }
        }, {
          label: '状态',
          type: 'select',
          key: 'status',
          options: publicChoice.documentStatusOptions,
          props: {
            clearable: true
          }
        }, {
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
        editItemInput: {
          cusOrgCode: function (value, selectData, rowData) {
            rowData.cusOrgName = selectData.name
            rowData.cusOrgId = selectData.id
          },
          cashierEmpName: function (value, selectData, rowData) {
            rowData.cashierEmpNo = selectData.code
          }
        },
        rowBtns: {
          // 表格上方新增按钮
          add: {
            text: '新增',
            onClick: () => {
              this.action = 'add'
              this.$refs.erpTableAdd.refreshCurrentPage()
              this.$nextTick(() => {
                this.$refs.erpTableAdd.newRows([{
                  businessDate: new Date(),
                  monAmt: '0.0000',
                  recAmt: '0.0000',
                  recMonAmt: '0.0000',
                  savAmt: '0.0000',
                  realTicketAmt: '0.0000',
                  limitTicketAmt: '0.0000',
                  largessTickAmt: '0.0000'
                }])
              })
            }
          },
          // 表格上方修改按钮
          edit: {
            text: '修改',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              let _sLength = selection.length
              const indexs = []
              if (_sLength > 0) {
                for (let i = 0; i < _sLength; i++) {
                  if (selection[i].type != 10) {
                    this.$message.error('您没有修改类型不是实收的权限')
                    return
                  }
                  if (selection[i].status != 10) {
                    this.$message.error('您没有修改状态不是未提交的权限')
                    return
                  }
                }
                this.action = 'edit'
                const props = ['type', 'cusOrgCode', 'status']
                this.$refs.erpTableEdit.refreshCurrentPage()
                this.$nextTick(() => {
                  this.$refs.erpTableEdit.$refs.tableRef.tableData.head.forEach((item) => {
                    if (props.includes(item.prop)) {
                      item.constraint = ''
                    }
                  })
                  selection.forEach(item => {
                    item.recAmt = formatMoney(item.recAmt, 4)
                    item.realTicketAmt = formatMoney(item.realTicketAmt, 4)
                    item.limitTicketAmt = formatMoney(item.limitTicketAmt, 4)
                    item.largessTickAmt = formatMoney(item.largessTickAmt, 4)
                    item.monAmt = formatMoney(item.monAmt, 4)
                    item.recMonAmt = formatMoney(item.recMonAmt, 4)
                  })
                  this.$refs.erpTableEdit.newRows(selection)
                })
                // 打开选中行可编辑行
                table.editRows(indexs)
                // 打开选中行可编辑行
                this.$refs.erpTableEdit.refreshCurrentPage()
              } else {
                this.$message.error('请选择项目')
              }
            }
          },
          // 表格上方删除按钮
          delete: {
            text: '删除',
            onClick: () => {
              const selection = this.$refs.erpTable.getSelection()
              let _sLength = selection.length
              let ids = []
              if (_sLength > 0) {
                this.$confirm('确定要删除吗？').then(() => {
                  for (let i = 0; i < _sLength; i++) {
                    if (selection[i].type != 10) {
                      this.$message.error('您没有删除类型是实存的权限')
                      return
                    }
                    ids.push(selection[i].id)
                  }
                  const params = {
                    idList: ids
                  }
                  this.BusinessService.deleteBusinessReceivedOrSaved(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('删除成功！')
                      setTimeout(() => {
                        this.$refs.erpTable.refreshCurrentPage()
                      }, 2000)
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `删除失败：${msg}` : `删除失败`)
                    }
                  })
                })
              } else {
                this.$message.error('请至少选择一项项目')
              }
            }
          },
          //新增，修改上方保存按钮
          save: {
            text: '保存',
            onClick: () => {
              if (this.action === 'add') {
                const table = this.$refs.erpTableAdd
                let _vailResult = table.validateEditingItems()
                if (!_vailResult) return
                const params = {}
                const list = table.$refs.tableRef.tableData.data
                list.map((item) => {
                  const tempObj = {
                    // const params = {
                    businessDate: formatDate(item.businessDate), //销售日期
                    cusOrgCode: item.cusOrgCode, //客户代码
                    cusOrgId: item.cusOrgId, //客户ID
                    cusOrgName: item.cusOrgName, //客户名称
                    cashierEmpName: item.cashierEmpName, //收银员员工姓名
                    cashierEmpNo: item.cashierEmpNo, //收银员员工工号
                    cashierUserCode: item.cashierUserCode, //收银员帐号
                    cashierUserName: item.cashierUserName, // 收银员名称
                    recAmt: formatMoneyToNumber(item.recAmt), //实收金额
                    // 可选参数
                    realTicketAmt: formatMoneyToNumber(item.realTicketAmt), //实收礼券
                    limitTicketAmt: formatMoneyToNumber(item.limitTicketAmt), //限用礼券
                    largessTickAmt: formatMoneyToNumber(item.largessTickAmt), //赠送礼券
                    monAmt: formatMoneyToNumber(item.monAmt), //月结外单款
                    recMonAmt: formatMoneyToNumber(item.recMonAmt), //收回月结外单款
                    remark: item.remark //备注
                  }
                  Object.assign(params, tempObj)
                })
                this.BusinessService.addBusinessReceived(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('保存成功!')
                    this.handleRefresh()
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `保存失败：${msg}` : `保存失败`)
                  }
                })
              } else if (this.action === 'edit') {
                const table = this.$refs.erpTableEdit
                let _vailResult = table.validateEditingItems()
                if (!_vailResult) return
                const list = table.$refs.tableRef.tableData.data
                let params = {}
                let editList = []
                const tempArr = []
                list.map((item) => {
                  tempArr.push({
                    businessDate: formatDate(item.businessDate), //销售日期
                    cusOrgId: item.cusOrgId, //客户ID
                    cashierEmpName: item.cashierEmpName, //收银员员工姓名
                    cashierEmpNo: item.cashierEmpNo, //收银员员工工号
                    cashierUserCode: item.cashierUserCode, //收银员帐号
                    cashierUserName: item.cashierUserName, // 收银员名称
                    recAmt: formatMoneyToNumber(item.recAmt), //实收金额
                    id: item.id, //id
                    // 可选参数
                    payInImage: item.payInImage, //实收缴款单图片
                    realTicketAmt: formatMoneyToNumber(item.realTicketAmt), //实收礼券
                    limitTicketAmt: formatMoneyToNumber(item.limitTicketAmt), //限用礼券
                    largessTickAmt: formatMoneyToNumber(item.largessTickAmt), //赠送礼券
                    monAmt: formatMoneyToNumber(item.monAmt), //月结外单款
                    recMonAmt: formatMoneyToNumber(item.recMonAmt), //收回月结外单款
                    remark: item.remark, //备注
                    appRemark: item.appRemark, // 财务注明
                  })
                  Object.assign(editList, tempArr)
                  params = {
                    editList
                  }
                })
                this.BusinessService.editBusinessReceived(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('保存成功!')
                    this.handleRefresh()
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `保存失败：${msg}` : `保存失败`)
                  }
                })
              }
            }
          },
          //新增,修改上方提交按钮
          btnSubmit: {
            text: '提交',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              let _sLength = selection.length
              const editList = []
              if (_sLength > 0) {
                for (let i = 0; i < _sLength; i++) {
                  if (selection[i].type != 10) {
                    this.$message.error('您没有提交类型不是实收的权限')
                    return
                  }
                  if (selection[i].status != 10) {
                    this.$message.error('您没有提交状态不是未提交的权限')
                    return
                  }
                  editList.push({
                    id: selection[i].id,
                    newStatus: 20
                  })
                  const params = {
                    editList
                  }
                  this.BusinessService.setBusinessStatus(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('提交成功！')
                      setTimeout(() => {
                        this.$refs.erpTable.refreshCurrentPage()
                      }, 2000)
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `提交失败：${msg}` : `提交失败`)
                    }
                  })
                }
              } else {
                this.$message.error('请选择一项');
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
        },
        query: true,
        summaryMethod: {}
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
            } else if (this.action === 'edit') {
              this.$refs.erpTableEdit.pageTotal()
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
      submit() {
        if (this.query) {
          this.query = false
          this.$refs.erpTable.refreshCurrentPage()
        }
        // table筛选
        let reqData = {
          cusOrgCode: this.formData.cusOrgCode,
          bankAccName: this.formData.bankAccName,
          businessDateStrat: this.formData.date ? formatDate(this.formData.date[0], 'startTime') : '',
          businessDateEnd: this.formData.date ? formatDate(this.formData.date[1], 'endTime') : '',
          existPicture: this.formData.existPicture,
          status: this.formData.status
        }
        this.filterForm = Object.assign({}, reqData)
      },
      handleRefresh() {
        this.action = 'default'
        // 重新刷新表格
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
      btnVisibles() {
        let btnsObj = {
          'add': ['cancel', 'save',],
          'edit': ['cancel', 'save'],
          'default': ['add', 'edit', 'delete', 'btnSubmit']
        }
        return btnsObj[this.action]
      }
    }
  }
</script>
<style lang="stylus">
  .business-received-default {
    .rec-amt, .real-ticket-amt, .limit-ticket-amt, .largess-tick-amt, .mon-amt, .rec-mon-amt, .sav-amt {
      text-align right
    }
  }
</style>
