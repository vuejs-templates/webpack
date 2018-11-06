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
        view="payee_info_maintenance"
        :config="$viewConfig['payee_info_maintenance']"
        :request-url="tableRequestUrl"
        :empty="query"
        :edit-column-config="editColumnConfig"
        :table-filter-data="filterForm"
        :head-selection="false"
        :pageSize="10"
        ref="erpTable"
        :height="scope.height"
        size="mini"
        class="base-list"
      >
        <template slot="registerBank" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['registerBank']"></pagoda-remark-cell>
        </template>
        <template slot="addr" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['addr']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
    </template>
  </pagoda-erp-form-table>
</template>

<script>
import {mapState} from 'vuex'
import searchCommon from '@/mixins/formSearchCommon'
import publicChoice from '@/views/expenses/publicChoice'
import { formLabelWidth, remarkMaxlength } from '@/utils/default-setting'
import { formatDate } from '@/utils/utils'

export default {
  name: 'payee',
  mixins: [searchCommon],
  components: {
  },
  data () {
    return {
      tableRequestUrl: `${this.AjaxService.devUrl1}/BasPayeeDefService/viewList`,
      formLabelWidth,
      remarkMaxlength,
      formData: {},
      formOptions: [
        {
          label: '收款人',
          type: 'input',
          key: 'payeeName'
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
          label: '省份',
          type: 'bdc-select',
          key: 'province',
          props: {
            url: `${this.AjaxService.devUrl1}/GeneralService/selectDistrictLikeName?pCode=0&levelType=10`,
            labelKey: 'name',
            valueKey: 'name',
            clearable: true,
            remote: 'name'
          },
          'on': {
            input: (name, selectData) => {
              this.formData.city = ''
              if (selectData) {
                this.$nextTick(() => {
                  this.formOptions[3].props.params.pCode = selectData.code
                  this.formOptions[3].props.disabled = false
                })
              } else {
                this.$nextTick(() => {
                  this.formOptions[3].props.params.pCode = '0'
                  this.formOptions[3].props.disabled = true
                })
              }
            }
          }
        },
        {
          label: '城市',
          type: 'bdc-select',
          key: 'city',
          props: {
            url: `${this.AjaxService.devUrl1}/GeneralService/selectDistrictLikeName?levelType=20`,
            params: {
              pCode: '0'
            },
            labelKey: 'name',
            valueKey: 'name',
            clearable: true,
            remote: 'name',
            disabled: true
          }
        },
        {
          label: '银行账号',
          type: 'bdc-select',
          key: 'bankAccountNo',
          props: {
            url: `${this.AjaxService.devUrl1}/BasPayeeDefService/findBankAccountNoByFuzzy`,
            labelKey: 'bankAccountNo',
            valueKey: 'bankAccountNo',
            clearable: true,
            remote: 'bankAccountNo'
          }
        },
        {
          label: '录入人',
          type: 'input',
          key: 'creatorName'
        },
        {
          label: '录入日期',
          type: 'date-picker',
          key: 'createdAt'
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
          label: '状态',
          type: 'select',
          key: 'isEnabled',
          options: publicChoice.stateOptions,
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
        setBtnGroup: this.setBtnGroup
      },
      rowBtns: {
        // 表格上方操作按钮
        add: {
          text: '新增',
          onClick: () => {
            this.$router.push({name: 'payeeAdd'})
          }
        },
        enable: {
          text: '启用',
          onClick: () => {
            const table = this.$refs.erpTable.$refs.tableRef
            const selection = table.selection
            const ids = []
            if (selection.length > 0) {
              for (let i = 0; i < selection.length; i++) {
                ids.push({
                  id: selection[i].id,
                  code: selection[i].code,
                  version: selection[i].version
                })
              }
              const params = {
                idList: ids,
                status: 1
              }
              this.PayeeService.payeeEnabled(params, true).then((res) => {
                if (res.resultCode === 0) {
                  this.$message.success('批量启用成功!')
                } else {
                  const msg = res.errorMsg
                  this.$message.error(msg ? `批量启用失败：${msg}` : `批量启用失败`)
                }
                // 重新刷新表格
                this.$refs.erpTable.refreshCurrentPage()
              })
            } else {
              this.$message.error('请选择项目')
            }
          }
        },
        disable: {
          text: '禁用',
          onClick: () => {
            const table = this.$refs.erpTable.$refs.tableRef
            const selection = table.selection
            const ids = []
            if (selection.length > 0) {
              for (let i = 0; i < selection.length; i++) {
                ids.push({
                  id: selection[i].id,
                  code: selection[i].code,
                  version: selection[i].version
                })
              }
              const params = {
                idList: ids,
                status: 0
              }
              this.PayeeService.payeeEnabled(params, true).then((res) => {
                if (res.resultCode === 0) {
                  this.$message.success('批量禁用成功!')
                } else {
                  const msg = res.errorMsg
                  this.$message.error(msg ? `批量禁用失败：${msg}` : `批量禁用失败`)
                }
                // 重新刷新表格
                this.$refs.erpTable.refreshCurrentPage()
              })
            } else {
              this.$message.error('请选择项目')
            }
          }
        }
      },
      gridBtns: [],
      query: true
    }
  },
  mounted () {
    this.doLayout()
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
        payeeName: this.formData.payeeName,
        bankName: this.formData.bankName,
        province: this.formData.province,
        city: this.formData.city,
        bankAccountNo: this.formData.bankAccountNo,
        creatorName: this.formData.creatorName,
        createdAt: this.formData.createdAt === '' ? formatDate(this.formData.createdAt) : undefined,
        cusOrgName: this.formData.cusOrgName,
        isEnabled: this.formData.isEnabled
      }
      this.filterForm = Object.assign({}, reqData)
    },
    setBtnGroup (row) {
      let editBtn = {
        text: '修改',
        type: 'text',
        props: {
          disabled: row.data.isEnabled === 1 ? true : false
        },
        onClick: (e, btnSelf, currentRowBtns) => {
          this.$router.push({name: 'payeeUpdate', params: {id: row.data.id}})
        }
      }
      let checkBtn = {
        text: '详情',
        type: 'text',
        onClick: (e, btnSelf, currentRowBtns) => {
          this.$router.push({ name: 'payeeDetail', params: {id: row.data.id} })
        }
      }
      return [checkBtn, editBtn]
    }
  },
  computed: {
    ...mapState(['role']),
    btnVisibles () {
      return ['add', 'enable', 'disable']
    }
  }
}
</script>
<style lang="stylus">
</style>
