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
        dev
        project-name="ERP2_New"
        view="payee_cost_requisition"
        :config="$viewConfig['payee_cost_requisition']"
        :request-url="tableRequestUrl"
        :empty="query"
        :edit-column-config="editColumnConfig"
        :table-filter-data="filterForm"
        :summaryMethod="summaryMethod"
        :head-selection="false"
        :pageSize="10"
        ref="erpTable"
        :height="scope.height"
        size="mini"
        class="cost_requisition-list"
      >
        <template slot="registerBank" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false"
                              v-model="scope.row['registerBank']"></pagoda-remark-cell>
        </template>
        <template slot="addr" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['addr']"></pagoda-remark-cell>
        </template>
        <template slot="sum" slot-scope="scope">
          {{ formatMoney(scope.row['sum'], 4) }}
        </template>
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
        <template slot="rejectReason" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false"
                              v-model="scope.row['rejectReason']"></pagoda-remark-cell>
        </template>
        <template slot="rejectPayReason" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false"
                              v-model="scope.row['rejectPayReason']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <el-dialog class="dialog-view" title="拒绝原因" :visible.sync="rejectReason.show" width="300px">
        <el-form ref="form">
          <el-form-item style="width: 100%">
            <el-input type="textarea" v-model="rejectReason.reason"></el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button type="primary" @click="submitRejectReason">确定</el-button>
            <el-button @click="cancelRejectReason">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog class="dialog-view" title="拒绝付款原因" :visible.sync="rejectPayReason.show" width="300px">
        <el-form ref="form">
          <el-form-item>
            <el-input type="textarea" v-model="rejectPayReason.reason"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRejectPayReason">确定</el-button>
            <el-button @click="cancelRejectPayReason">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </pagoda-erp-form-table>
</template>

<script>
  import { formLabelWidth, remarkMaxlength } from '@/utils/default-setting'
  import searchCommon from '@/mixins/formSearchCommon'
  import publicChoice from '@/views/expenses/publicChoice'
  import {mapState} from 'vuex'
  import { formatMoney, formatMoneyToNumber } from '@/utils/utils'

  export default {
    name: 'requisition',
    mixins: [searchCommon],
    components: {},
    data() {
      return {
        tableRequestUrl: `${this.AjaxService.devUrl1}/StoreCostAppHeadService/viewList`,
        formLabelWidth,
        remarkMaxlength,
        formatMoney,
        formData: {},
        formOptions: [
          {
            label: '申请单号',
            type: 'input',
            key: 'costApplyNo'
          },
          {
            label: '客户名称',
            type: 'bdc-select',
            key: 'cusOrgName',
            props: {
              url: `${this.AjaxService.devUrl1}/GeneralService/selectOrgCusVenInfoByAuthority?type=35`,
              labelKey: 'name',
              valueKey: 'name',
              clearable: true,
              remote: 'cusOrgName'
            }
          },
          {
            label: '录入人',
            type: 'input',
            key: 'creatorName'
          },
          {
            label: '费用类型',
            type: 'select',
            key: 'costType',
            options: publicChoice.classesTypeOptions,
            props: {
              clearable: true
            }
          },
          {
            label: '开户银行',
            type: 'bdc-select',
            key: 'bankName',
            props: {
              url: `${this.AjaxService.devUrl1}/GeneralService/selectLookupValueByTypeCode?code=BAS_BANK_LIST`,
              labelKey: 'value',
              valueKey: 'value',
              clearable: true
            }
          },
          {
            label: '录入日期',
            type: 'date-picker',
            key: 'date',
            props: {
              type: 'daterange'
            }
          },
          {
            label: '单据状态',
            type: 'select',
            key: 'status',
            options: publicChoice.documentStatusOptions,
            props: {
              clearable: true
            }
          }
        ],
        filterForm: {},
        editColumnConfig: {
          label: '操作',
          width: '150',
          fixed: 'right',
          collapse: true,
          setBtnGroup: this.setBtnGroup
        },
        rowBtns: {
          // 表格上方操作按钮
          add: {
            text: '新增',
            onClick: () => {
              this.$router.push({name: 'requisitionAdd'})
            }
          },
          submit: {
            text: '提交',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                const headList = []
                for (let i = 0; i < selection.length; i++) {
                  headList.push({
                    id: selection[i].id,
                    costApplyNo: selection[i].costApplyNo,
                    rejectPayReason: '',
                    rejectReason: ''
                  })
                }
                const params = {
                  headList: headList,
                  newStatus: 20
                }
                this.PayeeService.setRequisitionStatus(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('批量提交成功!')
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
                  }
                  // 重新刷新表格
                  this.$refs.erpTable.refreshCurrentPage()
                })
              }
            }
          },
          resolve: {
            text: '同意',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                const headList = []
                for (let i = 0; i < selection.length; i++) {
                  headList.push({
                    id: selection[i].id,
                    costApplyNo: selection[i].costApplyNo,
                    rejectPayReason: '',
                    rejectReason: ''
                  })
                }
                const params = {
                  headList: headList,
                  newStatus: 30
                }
                this.PayeeService.setRequisitionStatus(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('批量提交成功!')
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
                  }
                  // 重新刷新表格
                  this.$refs.erpTable.refreshCurrentPage()
                })
              }
            }
          },
          reject: {
            text: '拒绝',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                // 打开原因显示
                this.rejectReason = {
                  selection: selection,
                  reason: '',
                  show: true
                }
              }
            }
          },
          pay: {
            text: '付款',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                const headList = []
                for (let i = 0; i < selection.length; i++) {
                  headList.push({
                    id: selection[i].id,
                    costApplyNo: selection[i].costApplyNo,
                    rejectPayReason: '',
                    rejectReason: ''
                  })
                }
                const params = {
                  headList: headList,
                  newStatus: 40
                }
                this.PayeeService.setRequisitionStatus(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('批量提交成功!')
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
                  }
                  // 重新刷新表格
                  this.$refs.erpTable.refreshCurrentPage()
                })
              }
            }
          },
          dishonour: {
            text: '拒绝付款',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                // 打开原因显示
                this.rejectPayReason = {
                  selection: selection,
                  reason: '',
                  show: true
                }
              }
            }
          },
          cancelAudit: {
            text: '取消审核',
            onClick: () => {
              const table = this.$refs.erpTable.$refs.tableRef
              const selection = table.selection
              if (!selection || selection.length === 0) {
                this.$message.error('请选择项目')
              } else {
                const headList = []
                for (let i = 0; i < selection.length; i++) {
                  headList.push({
                    id: selection[i].id,
                    costApplyNo: selection[i].costApplyNo,
                    rejectPayReason: '',
                    rejectReason: ''
                  })
                }
                const params = {
                  headList: headList,
                  newStatus: 20
                }
                this.PayeeService.setRequisitionStatus(params, true).then((res) => {
                  if (res.resultCode === 0) {
                    this.$message.success('批量提交成功!')
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
                  }
                  // 重新刷新表格
                  this.$refs.erpTable.refreshCurrentPage()
                })
              }
            }
          }
        },
        summaryMethod: {
          sum: function (tableData) {
            let sum = 0
            tableData.forEach(item => {
              sum += formatMoneyToNumber(item.sum)
            })
            return formatMoney(sum, 4)
          }
        },
        query: true,
        dialogVisible: false,
        rejectReason: {
          selection: [],
          reason: '',
          show: false
        },
        rejectPayReason: {
          selection: [],
          reason: '',
          show: false
        }
      }
    },
    mounted () {
      this.doLayout()
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
          costApplyNo: this.formData.costApplyNo,
          cusOrgName: this.formData.cusOrgName,
          creatorName: this.formData.creatorName,
          costType: this.formData.costType,
          bankName: this.formData.bankName,
          startDate: this.formData.date ? this.formData.date[0] : '',
          endDate: this.formData.date ? this.formData.date[1] : '',
          status: this.formData.status
        }
        this.filterForm = Object.assign({}, reqData)
      },
      setBtnGroup(row) {
        let editBtn = {
          text: '修改',
          props: {
            disabled: row.data.status !== 10
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            if (this.role.name !== '店长') {
              this.$message({
                message: `您的角色权限有限，无法进行修改操作!`,
                type: 'warning'
              })
            } else {
              this.$router.push({name: 'requisitionUpdate', params: {id: row.data.id}})
            }
          }
        }
        let checkBtn = {
          text: '详情',
          onClick: (e, btnSelf, currentRowBtns) => {
            this.$router.push({name: 'requisitionDetail', params: {id: row.data.id}})
          }
        }
        let submitBtn = {
          text: '提交',
          props: {
            disabled: row.data.status !== 10
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            const params = {
              headList: [{
                id: row.data.id,
                costApplyNo: row.data.costApplyNo,
                rejectPayReason: '',
                rejectReason: ''
              }],
              newStatus: 20
            }
            this.PayeeService.setRequisitionStatus(params, true).then((res) => {
              console.log(res.resultCode)
              if (res.resultCode === 0) {
                this.$message.success('提交成功!')
              } else {
                const msg = res.errorMsg
                this.$message.error(msg ? `提交失败：${msg}` : `提交失败`)
              }
              // 重新刷新表格
              this.$refs.erpTable.refreshCurrentPage()
            })
          },
        }
        let resolveBtn = {
          text: '同意',
          props: {
            disabled: row.data.status !== 20
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            const params = {
              headList: [{
                id: row.data.id,
                costApplyNo: row.data.costApplyNo,
                rejectPayReason: '',
                rejectReason: ''
              }],
              newStatus: 30
            }
            this.PayeeService.setRequisitionStatus(params, true).then((res) => {
              if (res.resultCode === 0) {
                this.$message.success('批量提交成功!')
              } else {
                const msg = res.errorMsg
                this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
              }
              // 重新刷新表格
              this.$refs.erpTable.refreshCurrentPage()
            })
          }
        }

        let rejectBtn = {
          text: '拒绝',
          props: {
            disabled: row.data.status !== 20
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            // 打开原因显示
            this.rejectReason = {
              selection: [row.data],
              reason: '',
              show: true
            }
          }
        }

        let payBtn = {
          text: '付款',
          props: {
            disabled: row.data.status !== 30
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            const params = {
              headList: [{
                id: row.data.id,
                costApplyNo: row.data.costApplyNo,
                rejectPayReason: '',
                rejectReason: ''
              }],
              newStatus: 40
            }
            this.PayeeService.setRequisitionStatus(params, true).then((res) => {
              if (res.resultCode === 0) {
                this.$message.success('批量提交成功!')
              } else {
                const msg = res.errorMsg
                this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
              }
              // 重新刷新表格
              this.$refs.erpTable.refreshCurrentPage()
            })
          }
        }

        let dishonourBtn = {
          text: '拒绝付款',
          props: {
            disabled: row.data.status !== 30
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            // 打开原因显示
            this.rejectPayReason = {
              selection: [row.data],
              reason: '',
              show: true
            }
          }
        }

        let cancelAuditBtn = {
          text: '取消审核',
          props: {
            disabled: row.data.status !== 20 && row.data.status !== 30
          },
          onClick: (e, btnSelf, currentRowBtns) => {
            const params = {
              headList: [{
                id: row.data.id,
                costApplyNo: row.data.costApplyNo,
                rejectPayReason: '',
                rejectReason: ''
              }],
              newStatus: 20
            }
            this.PayeeService.setRequisitionStatus(params, true).then((res) => {
              if (res.resultCode === 0) {
                this.$message.success('批量提交成功!')
              } else {
                const msg = res.errorMsg
                this.$message.error(msg ? `批量提交失败：${msg}` : `批量提交失败`)
              }
              // 重新刷新表格
              this.$refs.erpTable.refreshCurrentPage()
            })
          }
        }

        let btnsObj = {
          '店长': [editBtn, checkBtn, submitBtn],
          '会计': [checkBtn, resolveBtn, rejectBtn, cancelAuditBtn],
          // '出纳': [checkBtn, payBtn, dishonourBtn, cancelAuditBtn]
          '出纳': [checkBtn, payBtn, dishonourBtn]
        }
        if (btnsObj[this.role.name]) {
          return btnsObj[this.role.name]
        } else {
          return [checkBtn]
        }
      },
      submitRejectReason() {
        const headList = []
        for (let i = 0; i < this.rejectReason.selection.length; i++) {
          headList.push({
            id: this.rejectReason.selection[i].id,
            costApplyNo: this.rejectReason.costApplyNo,
            rejectPayReason: '',
            rejectReason: this.rejectReason.reason
          })
        }
        const params = {
          headList: headList,
          newStatus: 50
        }
        this.PayeeService.setRequisitionStatus(params, true).then((res) => {
          this.cancelRejectReason()
          if (res.resultCode === 0) {
            this.$message.success('批量拒绝成功!')
          } else {
            const msg = res.errorMsg
            this.$message.error(msg ? `批量拒绝失败：${msg}` : `批量拒绝失败`)
          }
          // 重新刷新表格
          this.$refs.erpTable.refreshCurrentPage()
        })
      },
      cancelRejectReason() {
        this.rejectReason = {
          selection: [],
          reason: '',
          show: false
        }
      },
      submitRejectPayReason() {
        const headList = []
        for (let i = 0; i < this.rejectPayReason.selection.length; i++) {
          headList.push({
            id: this.rejectPayReason.selection[i].id,
            costApplyNo: this.rejectPayReason.costApplyNo,
            rejectPayReason: this.rejectPayReason.reason,
            rejectReason: ''
          })
        }
        const params = {
          headList: headList,
          newStatus: 50
        }
        this.PayeeService.setRequisitionStatus(params, true).then((res) => {
          this.cancelRejectPayReason()
          if (res.resultCode === 0) {
            this.$message.success('批量拒绝付款成功!')
          } else {
            const msg = res.errorMsg
            this.$message.error(msg ? `批量拒绝付款失败：${msg}` : `批量拒绝付款失败`)
          }
          // 重新刷新表格
          this.$refs.erpTable.refreshCurrentPage()
        })
      },
      cancelRejectPayReason() {
        this.rejectPayReason = {
          selection: [],
          reason: '',
          show: false
        }
      }
    },
    computed: {
      ...mapState(['role']),
      btnVisibles() { // 设置操作按钮数组
        let btnsObj = {
          '店长': ['add', 'submit'],
          '会计': ['resolve', 'reject', 'cancelAudit'],
          '出纳': ['pay', 'dishonour']
        }
        if (btnsObj[this.role.name]) {
          return btnsObj[this.role.name]
        } else {
          return []
        }
      }
    }
  }
</script>
<style lang="css">
  .dialog-view .el-form .el-form-item__content {
    width: 100%;
    text-align: center;
  }
  .cost_requisition-list .sum{
    text-align: right;
  }
</style>
