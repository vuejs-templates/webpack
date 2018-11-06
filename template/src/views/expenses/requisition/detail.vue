<template>
  <div class="requisition_detail">
    <pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles">
    </pagoda-row-btns>
    <pagoda-edit-form-table ref="editFormTable" :form-options="tableData" :editable="editable" :config="config">
    </pagoda-edit-form-table>
    <el-tabs type="card">
      <el-tab-pane label="费用明细">
        <pagoda-erp-table-v2
          project-name="ERP2_New"
          view="payee_cost_requisition_subitem"
          :config="$viewConfig['payee_cost_classes_subitem']"
          :defaultData="classesTableData"
          ref="erpTable"
          :summaryMethod="summaryMethod"
          class="cost_requisition_subitem_list"
        >
          <template slot="amount" slot-scope="scope">
            {{ formatMoney(scope.row['amount'], 4) }}
          </template>
          <template slot="remark" slot-scope="scope">
            <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['remark']"></pagoda-remark-cell>
          </template>
        </pagoda-erp-table-v2>
      </el-tab-pane>
    </el-tabs>
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
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {remarkMaxlength,} from '@/utils/default-setting'
  import publicChoice from '@/views/expenses/publicChoice'
  import { formatMoney, formatMoneyToNumber } from '@/utils/utils'

  export default {
    name: 'requisition_detail',
    data() {
      return {
        remarkMaxlength,
        formatMoney,
        loading: true,
        gridBtns: [],
        rowBtns: {
          update: {
            text: '修改',
            onClick: this.handleEdit
          },
          cancel: {text: '取消', onClick: this.handleCancel},
          submit: {
            text: '提交',
            onClick: this.handleSubmit
          },
          resolve: {
            text: '同意',
            onClick: this.handleResolve
          },
          reject: {
            text: '拒绝',
            onClick: this.handleReject
          },
          pay: {
            text: '付款',
            onClick: this.handlePay
          },
          dishonour: {
            text: '拒绝付款',
            onClick: this.handleDishonour
          },
          cancelAudit: {
            text: '取消审核',
            onClick: this.handleCancelAudit
          }
        },
        tableData: [], // createTable详情单table专用
        config: {
          column: 3 // 一行放3列（label+value）
        },
        summaryMethod: {
          amount: function (tableData) {
            let sum = 0
            tableData.forEach(item => {
              sum += formatMoneyToNumber(item.amount)
            })
            return formatMoney(sum, 4)
          }
        },
        editable: false,
        tableObjData: null,
        costApplyNo: '',
        status: 0,
        classesTableData: [],
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
    mounted() {
      if (this.$route.params.id) {
        this.setTableData(this.$route.params.id)
      }
    },
    methods: {
      setTableData(id) {
        this.PayeeService.checkRequisitionById({id: id}, true).then((res) => {
          this.loading = false
          if (res.resultCode === 0) {
            const data = res.data
            // 第一行
            let costApplyNo = {title: '申请单号', value: data.costApplyNo, type: 'text', key: '申请单号'}
            this.costApplyNo = data.costApplyNo
            let cusOrgCode = {title: '客户代码', value: data.cusOrgCode, type: 'text', key: '客户代码'}
            let cusOrgName = {title: '客户名称', value: data.cusOrgName, type: 'text', key: '客户名称'}
            // 第二行
            let costTypeName = {title: '费用类型', value: data.costTypeName, type: 'text', key: '费用类型'}
            let payeeName = {title: '收款人', value: data.payeeName, type: 'text', key: '收款人'}
            let bankName = {title: '开户银行', value: data.bankName, type: 'text', key: '开户银行'}
            // 第三行
            let registerBank = {title: '银行支行', value: data.registerBank, type: 'remark', key: '银行支行'}
            let bankAccountNo = {title: '银行账号', value: data.bankAccountNo, type: 'text', key: '银行账号'}
            let province = {title: '省份', value: data.province, type: 'text', key: '省份'}
            // 第四行
            let city = {title: '城市', value: data.city, type: 'text', key: '城市'}
            let addr = {title: '地址', value: data.addr, type: 'remark', key: '地址'}
            let status = {title: '单证状态', value: this.getStatusLabel(data.status), type: 'text', key: '单证状态'}
            this.status = data.status
            // 第五行
            let image = {title: '图片上传', value: data.image, type: 'text', key: '图片上传'}
            let remark = {title: '备注', value: data.remark, type: 'remark', key: '备注'}

            let tableData
            tableData = [costApplyNo, cusOrgCode, cusOrgName, costTypeName, payeeName, bankName, registerBank, bankAccountNo, province, city, addr, status, image, remark]
            this.tableData = tableData
            this.$refs.editFormTable.init() // 延迟加载必须调用init方法
            this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
            // 格式化
            if (data.detailList.length > 0) {
              data.detailList.forEach(item => {
                item.amount = parseFloat(item.amount).toFixed(2)
              })
            }
            // 提取费用类型，存入erp-table-v2
            this.classesTableData = data.detailList
            // 刷新表格
            this.$refs.erpTable.refreshCurrentPage()
          }
        })
      },
      handleCancel() {
        this.$router.push({name: 'expensesRequisition'})
      },
      handleEdit() {
        this.$router.push({name: 'requisitionUpdate', params: {id: this.$route.params.id}})
      },
      handleSubmit() {
        const params = {
          headList: [{
            id: this.$route.params.id,
            costApplyNo: this.costApplyNo,
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
          // 重新刷新
          this.setTableData(this.$route.params.id)
          // 刷新表格
          this.$refs.erpTable.refreshCurrentPage()
        })
      },
      handleResolve() {
        const params = {
          headList: [{
            id: this.$route.params.id,
            costApplyNo: this.costApplyNo,
            rejectPayReason: '',
            rejectReason: ''
          }],
          newStatus: 30
        }
        this.PayeeService.setRequisitionStatus(params, true).then((res) => {
          console.log(res.resultCode)
          if (res.resultCode === 0) {
            this.$message.success('同意成功!')
          } else {
            const msg = res.errorMsg
            this.$message.error(msg ? `同意失败：${msg}` : `同意失败`)
          }
          // 重新刷新
          this.setTableData(this.$route.params.id)
          // 刷新表格
          this.$refs.erpTable.refreshCurrentPage()
        })
      },
      handleReject() {
        // 打开原因显示
        this.rejectReason = {
          selection: [{
            id: this.$route.params.id,
            costApplyNo: this.costApplyNo
          }],
          reason: '',
          show: true
        }
      },
      handleCancelAudit() {
        const params = {
          headList: [{
            id: this.$route.params.id,
            costApplyNo: this.costApplyNo,
            rejectPayReason: '',
            rejectReason: ''
          }],
          newStatus: 20
        }
        this.PayeeService.setRequisitionStatus(params, true).then((res) => {
          console.log(res.resultCode)
          if (res.resultCode === 0) {
            this.$message.success('取消审核成功!')
          } else {
            const msg = res.errorMsg
            this.$message.error(msg ? `取消审核失败：${msg}` : `取消审核失败`)
          }
          // 重新刷新
          this.setTableData(this.$route.params.id)
          // 刷新表格
          this.$refs.erpTable.refreshCurrentPage()
        })
      },
      handlePay() {
        const params = {
          headList: [{
            id: this.$route.params.id,
            costApplyNo: this.costApplyNo,
            rejectPayReason: '',
            rejectReason: ''
          }],
          newStatus: 40
        }
        this.PayeeService.setRequisitionStatus(params, true).then((res) => {
          console.log(res.resultCode)
          if (res.resultCode === 0) {
            this.$message.success('付款成功!')
          } else {
            const msg = res.errorMsg
            this.$message.error(msg ? `付款失败：${msg}` : `付款失败`)
          }
          // 重新刷新
          this.setTableData(this.$route.params.id)
          // 刷新表格
          this.$refs.erpTable.refreshCurrentPage()
        })
      },
      handleDishonour() {
        // 打开原因显示
        this.rejectPayReason = {
          selection: [{
            id: this.$route.params.id,
            costApplyNo: this.costApplyNo
          }],
          reason: '',
          show: true
        }
      },
      getStatusLabel(value) {
        return publicChoice.documentStatusOptions.filter(item => item.value === value)[0].label
      },
      submitRejectReason() {
        const headList = []
        for (let i = 0; i < this.rejectReason.selection.length; i++) {
          headList.push({
            id: this.rejectReason.selection[i].id,
            costApplyNo: this.rejectReason.selection[i].costApplyNo,
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
            costApplyNo: this.rejectPayReason.selection[i].costApplyNo,
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
      btnVisibles() {
        let btnsObj = {
          '店长': this.status === 10 ? ['cancel', 'update', 'submit'] : ['cancel'],
          '会计': this.status === 20 ? ['cancel', 'resolve', 'reject', 'cancelAudit'] : ['cancel'],
          '出纳': this.status === 30 ? ['pay', 'dishonour'] : ['cancel']
        }
        if (btnsObj[this.role.name]) {
          return btnsObj[this.role.name]
        } else {
          return []
        }
      },
    }
  }
</script>

<style lang="css">
  .dialog-view .el-form .el-form-item__content {
    width: 100%;
    text-align: center;
  }
  .cost_requisition_subitem_list .amount {
    text-align: right;
  }
</style>

