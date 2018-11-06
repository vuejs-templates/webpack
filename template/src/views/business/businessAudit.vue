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
        view="store_business_audit"
        :config="$viewConfig['store_business_audit']"
        :request-url="tableRequestUrl"
        :empty="query"
        :table-filter-data="filterForm"
        :summaryMethod="summaryMethod"
        :head-selection="false"
        :pageSize="10"
        ref="erpTable"
        :height="scope.height"
        size="mini"
        class="base-list"
      >
        <template slot="savAmt" slot-scope="scope">
          {{ formatMoney(scope.row['savAmt'], 4) }}
        </template>
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
        <template slot="appRemark" slot-scope="scope">
          <pagoda-remark-cell text="编辑财务注明" :maxlength="remarkMaxlength" :editable="scope.row['status'] === 20 ? true : false" v-model="scope.row['appRemark']"></pagoda-remark-cell>
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
    name: 'business-audit',
    mixins: [searchCommon],
    components: {
    },
    data () {
      return {
        tableRequestUrl: `${this.AjaxService.devUrl1}/StoreBusinessMoneyService/viewRecAuditList`,
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
          },
          {
            label: '差额',
            type: 'input-range',
            key: 'difference',
            props: {
              clearable: true
            }
          },
        ],
        filterForm: {},
        rowBtns: {
          audit: {
            text: '审核',
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
                      appRemark: item.appRemark,
                      newStatus: 30
                    })
                  })
                  const params = {
                    editList: editList
                  }
                  this.BusinessService.setBusinessStatus(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('批量审核操作成功!')
                      // 重新刷新表格
                      this.$refs.erpTable.refreshCurrentPage()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `批量审核操作失败：${msg}` : `批量审核操作失败`)
                    }
                  })
                } else {
                  this.$message.error('只能选择一种状态：已完成')
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
                if (selection.filter(item => item.status === 30).length === selection.length) {
                  const editList = []
                  selection.forEach(item => {
                    editList.push({
                      id: item.id,
                      appRemark: '',
                      newStatus: 20
                    })
                  })
                  const params = {
                    editList: editList
                  }
                  this.BusinessService.setBusinessStatus(params, true).then((res) => {
                    if (res.resultCode === 0) {
                      this.$message.success('批量取消审核操作成功!')
                      // 重新刷新表格
                      this.$refs.erpTable.refreshCurrentPage()
                    } else {
                      const msg = res.errorMsg
                      this.$message.error(msg ? `批量取消审核操作失败：${msg}` : `批量取消审核操作失败`)
                    }
                  })
                } else {
                  this.$message.error('只能选择一种状态：实收审核')
                }
              }
            }
          },
          GSsrjhsk: {
            text: 'GS收入及好食卡',
            onClick: () => {
              this.$message.success(`GS收入及好食卡!`)
            }
          },
          GSzbjmdck: {
            text: 'GS总部及门店存款',
            onClick: () => {
              this.$message.success(`GS总部及门店存款!`)
            }
          },
          GScssr: {
            text: 'GS重算收入',
            onClick: () => {
              this.$message.success(`GS重算收入!`)
            }
          }
        },
        tableData: {},
        summaryMethod: {},
        query: true
      }
    },
    created () {
    },
    mounted () {
      this.doLayout()
      const props = ['savAmt']
      const summaryMethod = {}
      props.forEach(item => {
        // 添加列表小计方法
        summaryMethod[item] = (tableData) => {
          return this.summaryFunction(tableData, item)
        }
      })
      this.summaryMethod = summaryMethod
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
          existPicture: this.formData.existPicture,
          difference: this.formData.difference
        }
        this.filterForm = Object.assign({}, reqData)
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
        return ['audit', 'cancelAudit', 'GSsrjhsk', 'GSzbjmdck', 'GScssr']
      }
    }
  }
</script>
<style lang="stylus">
</style>
