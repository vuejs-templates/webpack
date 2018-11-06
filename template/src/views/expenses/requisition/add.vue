<template>
  <div class="requisition_detail">
    <pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles">
    </pagoda-row-btns>
    <pagoda-edit-form-table ref="editFormTable" :form-options="tableData" :editable="editable" :config="config">
      <template slot="cusOrgCode" slot-scope="scope">
        <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.code }}</span>
        <span style="float: right; color: #8492a6;">{{ scope.name }}</span>
      </template>
    </pagoda-edit-form-table>
    <el-tabs type="card">
      <el-tab-pane label="费用明细">
        <pagoda-erp-table-v2
          project-name="ERP2_New"
          view="payee_cost_classes_subitem"
          :config="$viewConfig['payee_cost_classes_subitem']"
          :defaultData="classesTableData"
          ref="erpTable"
          :summaryMethod="summaryMethod"
          v-loading="tableLoading"
          :on="onMethod"
        >
          <template slot="remark" slot-scope="scope">
            <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
          </template>
        </pagoda-erp-table-v2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { formatDate, formatMoney, formatMoneyToNumber, isEmpty } from '@/utils/utils'
import { remarkMaxlength } from '@/utils/default-setting'
import publicChoice from '@/views/expenses/publicChoice'

export default {
  name: 'requisition_detail',
  data () {
    return {
      remarkMaxlength,
      loading: true,
      rowBtns: {
        save: { text: '保存', onClick: this.handleSave},
        cancel: { text: '取消', onClick: this.handleCancel, confirm: '当前界面操作数据不保留，是否取消，确认后返回列表！' }
      },
      tableData: [], // createTable详情单table专用
      config: {
        column: 3 // 一行放3列（label+value）
      },
      editable: true,
      tableObjData: null,
      cusOrg: {},
      costType: {},
      payee: {},
      classesTableData: [],
      summaryMethod: {
        amount: function (tableData) {
          let sum = 0
          tableData.forEach(item => {
            sum += formatMoneyToNumber(item.amount)
          })
          return formatMoney(sum, 4)
        }
      },
      tableLoading: false,
      onMethod: {
        amount: {
          blur: (event) => {
            let value = event.target.value
            // 格式化输入的值
            value = parseFloat(formatMoneyToNumber(value), 10)
            event.target.value = formatMoney(value, 4)
            // 重新计算合计
            this.$refs.erpTable.pageTotal()
          }
        }
      }
    }
  },
  mounted () {
    this.setTableData()
  },
  methods: {
    setTableData (id) {
      // 第一行
      let costApplyNo = { title: '申请单号', value: '自动生成', type: 'text', key: 'costApplyNo' }
      let cusOrgCode = {
        title: '客户代码',
        value: '',
        type: 'bdc-select',
        key: 'cusOrgCode',
        required: true,
        rules: {
          required: true,
          msg: '请选择客户代码'
        },
        props: {
          url: `${this.AjaxService.devUrl1}/GeneralService/selectOrgCusVenInfoByAuthority?type=35`,
          labelKey: 'code',
          valueKey: 'code',
          clearable: true,
          remote: 'cusOrgName'
        },
        on: {
          input: (value, selectData) => {
            if (value && value !== '') {
              this.cusOrg = {
                cusOrgId: selectData.id,
                cusOrgCode: selectData.code,
                cusOrgName: selectData.name
              }
              if (cusOrgName) {
                cusOrgName.value = selectData.name
              }
            } else {
              this.cusOrg = {}
              cusOrgName.value = '选择客户代码自动带出'
            }
          }
        }
      }
      let cusOrgName = { title: '客户名称', value: '选择客户代码自动带出', type: 'text', key: 'cusOrgName' }
      // 第二行
      let costTypeName = {
        title: '费用类型',
        value: '',
        type: 'select',
        required: true,
        rules: {
          required: true,
          msg: '请选择状态'
        },
        options: publicChoice.classesTypeOptions,
        key: 'costTypeName',
        on: {
          change: (value) => {
            if (value && value !== '') {
              this.costType = {
                name: publicChoice.classesTypeOptions.filter(item => item.value === value)[0].label,
                value: value
              }
            } else {
              this.costType = {}
            }
          }
        }
      }
      let payeeName = {
        title: '收款人',
        value: '',
        type: 'text',
        key: '收款人',
        type: 'bdc-select',
        key: 'payeeName',
        required: true,
        rules: {
          required: true,
          msg: '请选择收款人'
        },
        props: {
          url: `${this.AjaxService.devUrl1}/BasPayeeDefService/findByPayeeName`,
          labelKey: 'payeeName',
          valueKey: 'payeeName',
          clearable: true,
          remote: 'payeeName'
        },
        on: {
          input: (value, selectData) => {
            if (value && value !== '') {
              this.payee = {
                id: selectData.id,
                payeeName: selectData.payeeName,
                bankName: selectData.bankName,
                registerBank: selectData.registerBank,
                bankAccountNo: selectData.bankAccountNo,
                province: selectData.province,
                city: selectData.city,
                addr: selectData.addr
              }
              if (bankName) {
                bankName.value = selectData.bankName
              }
              if (registerBank) {
                registerBank.value = selectData.registerBank
              }
              if (bankAccountNo) {
                bankAccountNo.value = selectData.bankAccountNo
              }
              if (province) {
                province.value = selectData.province
              }
              if (city) {
                city.value = selectData.city
              }
              if (addr) {
                addr.value = selectData.addr
              }
            } else {
              this.payee = {}
              bankName.value = '根据收款人自动带出'
              registerBank.value = '根据收款人自动带出'
              bankAccountNo.value = '根据收款人自动带出'
              province.value = '根据收款人自动带出'
              city.value = '根据收款人自动带出'
              addr.value = '根据收款人自动带出'
            }
          }
        }
      }
      let bankName = { title: '开户银行', value: '根据收款人自动带出', type: 'text', key: 'bankName' }
      // 第三行
      let registerBank = { title: '银行支行', value: '根据收款人自动带出', type: 'remark', key: 'registerBank' }
      let bankAccountNo = { title: '银行账号', value: '根据收款人自动带出', type: 'text', key: 'bankAccountNo' }
      let province = { title: '省份', value: '根据收款人自动带出', type: 'text', key: 'province' }
      // 第四行
      let city = { title: '城市', value: '根据收款人自动带出', type: 'text', key: 'city' }
      let addr = { title: '地址', value: '根据收款人自动带出', type: 'remark', key: 'addr' }
      let status = { title: '单证状态', value: '未提交', type: 'text', key: 'status' }
      // 第五行
      let image = { title: '图片上传', value: '', type: 'text', key: 'image' }
      let remark = {
        title: '备注',
        value: '',
        type: 'remark',
        key: 'remark',
        props: {
          text: '修改备注',
          editable: true,
          maxlength: remarkMaxlength
        }
      }

      let tableData
      tableData = [costApplyNo, cusOrgCode, cusOrgName, costTypeName, payeeName, bankName, registerBank, bankAccountNo, province, city, addr, status, image, remark]
      this.tableData = tableData
      this.$refs.editFormTable.init() // 延迟加载必须调用init方法
      this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
      // 默认选择门店
      this.$nextTick(() => {
        costTypeName.value = 1
        this.costType = {
          name: '门店费用',
          value: 1
        }
      })
    },
    handleCancel () {
      this.$router.push({name: 'expensesRequisition'})
    },
    handleSave () {
      this.$refs.editFormTable.validateForm().then(() => { // 方式二： 通过Promise形式处理结果
        this.$refs.editFormTable.initResetValueData() // 记录重置默认值，this.$refs.editFormTable.reset()会重置为此刻的值
        const formData = this.$refs.editFormTable.resetValueData
        // 判断以下关键字段是否为空
        if (isEmpty(this.cusOrg)) {
          this.$message.error('请重新选择客户代码!')
          return
        }
        if (isEmpty(this.costType)) {
          this.$message.error('请重新选择费用类型!')
          return
        }
        if (isEmpty(this.payee)) {
          this.$message.error('请重新选择收款人!')
          return
        }
        const table = this.$refs.erpTable
        if (table.validateEditingItems()) {
          // 构造请求参数
          const detailList = []
          const list = table.$refs.tableRef.tableData.data
          list.forEach(item => {
            detailList.push({
              amount: formatMoneyToNumber(item.amount),
              costCatId: item.costCatId,
              costCatName: item.costCatName,
              periorBegin: `${ item.periorBegin } 00:00:00`,
              periorEnd: `${ item.periorEnd } 23:59:59`,
              remark: item.remark
            })
          })
          const params = {
            addr: this.payee.addr,
            bankAccountNo: this.payee.bankAccountNo,
            bankName: this.payee.bankName,
            city: this.payee.city,
            costType: this.costType.value,
            costTypeName: this.costType.name,
            cusOrgCode: this.cusOrg.cusOrgCode,
            cusOrgId: this.cusOrg.cusOrgId,
            cusOrgName: this.cusOrg.cusOrgName,
            detailList: detailList,
            imageUrl: formData.image,
            payeeId: this.payee.id,
            payeeName: this.payee.payeeName,
            province: this.payee.province,
            registerBank: this.payee.registerBank,
            remark: formData.remark,
          }
          this.PayeeService.addRequisition(params, true).then((res) => {
            if (res.resultCode === 0) {
              this.$message.success('新增成功')
              setTimeout(() => {
                this.$router.push({
                  name: 'expensesRequisition'
                })
              }, 2000)
            } else {
              const msg = res.errorMsg
              this.$message.error(msg ? `新增失败：${msg}` : `新增失败`)
            }
          })
        } else {
          this.$message.error('请填写完整必填信息!')
        }
      }, (error) => {
        let msgs = error.msgs.map((msg, i) => {
          return error.items[i].title + msg
        })
        this.$message.error('校验不通过，' + msgs.join('、'))
      })
    },
    getClassesTableData(value) {
      this.tableLoading = true
      this.PayeeService.checkRequisitionByType({ costType: value }).then((res) => {
        this.tableLoading = false
        if (res.resultCode === 0) {
          const data = res.data
          data.content.forEach(item => {
            // 列表添加
            const table = this.$refs.erpTable
            this.$nextTick(() => {
              table.newRows([{
                costCatId: item.id,
                costCatName: item.name,
                amount: '0.0000',
                periorBegin: formatDate(new Date(), 'date'),
                periorEnd: formatDate(new Date(), 'date'),
                remark: ''
              }])
            })
          })
        }
      })
    }
  },
  computed: {
    btnVisibles () {
      return ['cancel', 'save']
    }
  },
  watch: {
    costType: {
      handler(newName, oldName) {
        // 清空表格
        this.$refs.erpTable.$refs.tableRef.tableData.data = []
        if (newName.value) {
          // 根据费用类型显示不同的费用明细
          this.getClassesTableData(newName.value)
        }
      },
      deep: true
    }
  }
}
</script>
