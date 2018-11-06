<template>
<pagoda-erp-form-table v-model="formData" :form-options="formOptions" :label-width="formLabelWidth" ref="erpFormTabel" @submit="submit">
	<template slot="table-btns">
      <pagoda-row-btns :btns="rowBtns" :visibles="getBtnVisibles()"></pagoda-row-btns>
    </template>
	<template slot="table" slot-scope="scope">
      <pagoda-erp-table-v2
        project-name="ERP2_New"
        view="store_business_account"
        :config="$viewConfig['store_business_account']"
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
          <pagoda-remark-cell :maxlength="150" :editable="false" v-model="scope.row['registerBank']"></pagoda-remark-cell>
        </template>
	</pagoda-erp-table-v2>
	</template>
</pagoda-erp-form-table>
</template>

<script>
import {
	mapState
} from 'vuex'
import searchCommon from '@/mixins/formSearchCommon'
import publicChoice from '@/views/expenses/publicChoice'
import {
	formLabelWidth
} from '@/utils/default-setting'
import {
	formatDate
} from '@/utils/utils'

export default {
	name: 'bankAccount',
	mixins: [searchCommon],
	components: {},
	data() {
		return {
			tableRequestUrl: `${this.AjaxService.devUrl2}/BasStoreAccountService/findByPreParam`,
			formLabelWidth,
			formData: {},
			formOptions: [{
					label: '客户代码',
					type: 'bdc-select',
					key: 'cusOrgCode',
					props: {
						url: `${this.AjaxService.devUrl2}/BasStoreAccountService/selectCusOrg`,
						labelKey: 'code',
						valueKey: 'code',
						clearable: true,
						remote: 'cusOrgCode'
					}
        },
				{
					label: '存款银行',
					type: 'bdc-select',
					key: 'bankName',
					props: {
						url: `${this.AjaxService.devUrl2}/BasStoreAccountService/findBankName`,
						labelKey: 'name',
						valueKey: 'name',
						clearable: true,
						remote: 'bankName'
					}
          },
				{
					label: '存款银行账号',
					type: 'input',
					key: 'bankAccNo'
          },
				{
					label: '录入人',
					type: 'input',
					key: 'creatorName'
          },
				{
					label: '录入日期',
					type: 'date-picker',
					key: 'createDateTime'
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
						this.$router.push({
							name: 'bankAccountAdd'
						})
					}
				},
				enable: {
					text: '启用',
					onClick: () => {
						const table = this.$refs.erpTable.$refs.tableRef
						const selection = table.selection
						const params = []
						if (selection.length > 0) {
							for (let i = 0; i < selection.length; i++) {
								params.push({
									id: selection[i].id,
									bankAccNo: selection[i].bankAccNo,
									cusOrgCode: selection[i].cusOrgCode,
									isEnabled: 1
								})
							}
							this.BusinessService.accountServiceStart(params, true).then((res) => {
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
						const params = []
						if (selection.length > 0) {
							for (let i = 0; i < selection.length; i++) {
								params.push({
									id: selection[i].id,
									isEnabled: 0
								})
							}
							this.BusinessService.accountServiceStop(params, true).then((res) => {
								if (res.resultCode === 0) {
									this.$message.success('批量关闭成功!')
								} else {
									const msg = res.errorMsg
									this.$message.error(msg ? `批量关闭失败：${msg}` : `批量关闭失败`)
								}
								// 重新刷新表格
								this.$refs.erpTable.refreshCurrentPage()
							})
						} else {
							this.$message.error('请选择')
						}
					}
				}
			},
			gridBtns: [],
      query: true
		}
	},
	mounted() {
		this.doLayout()
	},
	methods: {
		doLayout() {
			this.$refs.erpFormTabel.doLayout()
		},
		submit() {
      if (this.query) {
        this.query = false
        this.$refs.erpTable.refreshCurrentPage()
      }
			// table筛选
			let reqData = {
				cusOrgCode: this.formData.cusOrgCode, //客户代码
				bankName: this.formData.bankName, //存款银行
				bankAccNo: this.formData.bankAccNo, //存款银行帐号
				creatorName: this.formData.creatorName, //录入人
				createdAt: formatDate(this.formData.createdAt, 'date'), //录入日期
				isEnabled: this.formData.isEnabled //状态
			}
			this.filterForm = Object.assign({}, reqData)
		},
		setBtnGroup(row) {
			let editBtn = {
				text: '修改',
				type: 'text',
				props: {
					disabled: row.data.isEnabled === 1 ? true : false
				},
				onClick: (e, btnSelf, currentRowBtns) => {
					this.$router.push({
						name: 'bankAccountUpdate',
						params: {
							id: row.data.id
						}
					})
				}
			}
			let checkBtn = {
				text: '详情',
				type: 'text',
				onClick: (e, btnSelf, currentRowBtns) => {
					this.$router.push({
						name: 'bankAccountDetail',
						params: {
							id: row.data.id
						}
					})
				}
			}
			return [checkBtn, editBtn]
		},
		getBtnVisibles() {
			return ['add', 'enable', 'disable']
		}
	},
	computed: {
		...mapState(['role'])
	}
}
</script>
<style lang="stylus">
</style>
