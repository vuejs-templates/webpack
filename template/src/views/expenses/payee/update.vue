<template>
<div class="payee_update">
	<pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles">
	</pagoda-row-btns>
	<pagoda-edit-form-table ref="editFormTable" :form-options="tableData" :editable="editable" :config="config">
	</pagoda-edit-form-table>
</div>
</template>

<script>
import {
  remarkMaxlength,
} from '@/utils/default-setting'
import publicChoice from '@/views/expenses/publicChoice'
export default {
	name: 'payee_update',
	data() {
		return {
      remarkMaxlength,
			loading: true,
			rowBtns: {
				cancel: {
					text: '取消',
					onClick: this.handleCancel,
					confirm: '当前界面操作数据不保留，是否取消，确认后返回详情！'
				},
				save: {
					text: '保存',
					onClick: this.handleSave
				}
			},
			tableData: [], // createTable详情单table专用
			config: {
				column: 3 // 一行放3列（label+value）
			},
			editable: true,
			tableObjData: null,
			id: null,
			cusOrg: {},
			version: 0
		}
	},
	mounted() {
		if (this.$route.params.id) {
			this.setTableData(this.$route.params.id)
		}
	},
	methods: {
		setTableData(id) {
			this.PayeeService.checkPayeeById({id: id}, true).then((res) => {
				this.loading = false
				if (res.resultCode === 0) {
					const data = res.data
					this.cusOrg = {
						cusOrgId: data.cusOrgId,
						cusOrgCode: data.cusOrgCode,
						cusOrgName: data.cusOrgName
					}
					this.id = data.id
					this.version = data.version
					// 第一行
					let code = {
						title: '收款人代码',
						value: data.code,
						type: 'text',
						key: 'code'
					}
					let payeeName = {
						title: '收款人',
						value: data.payeeName,
						type: 'input',
						key: 'payeeName',
						required: true,
						rules: {
							required: true,
							msg: '请输入收款人'
						}
					}
					let bankName = {
						title: '开户银行',
						value: data.bankName,
						type: 'bdc-select',
						key: 'bankName',
						required: true,
						rules: {
							required: true,
							msg: '请选择开户银行'
						},
						props: {
							url: `${this.AjaxService.devUrl1}/GeneralService/selectLookupValueByTypeCode?code=BAS_BANK_LIST`,
							labelKey: 'value',
							valueKey: 'value',
							clearable: true
						}
					}
					// 第二行
					let registerBank = {
						title: '银行支行',
						value: data.registerBank,
						type: 'remark',
						key: 'registerBank',
						required: true,
						rules: {
							required: true,
							msg: '请输入银行支行'
						},
						props: {
							text: '修改银行支行',
							editable: true,
							maxlength: 150
						}
					}
					let province = {
						title: '所在省份',
						value: data.province,
						type: 'bdc-select',
						key: 'province',
						required: true,
						rules: {
							required: true,
							msg: '请选择所在省份'
						},
						props: {
							url: `${this.AjaxService.devUrl1}/GeneralService/selectDistrictLikeName?pCode=0&levelType=10`,
							labelKey: 'name',
							valueKey: 'name',
							clearable: true,
							remote: 'name'
						},
						'on': {
							input: (name, selectData) => {
								if (city) {
									city.value = ''
									if (selectData) {
										this.$nextTick(() => {
											city.props.params.pCode = selectData.code
											city.props.disabled = false
										})
									} else {
										city.props.params.pCode = '0'
										city.props.disabled = true
									}
								}
							}
						}
					}
					let city = {
						title: '城市',
						value: data.city,
						type: 'bdc-select',
						key: 'city',
						required: true,
						rules: {
							required: true,
							msg: '请选择城市'
						},
						props: {
							url: `${this.AjaxService.devUrl1}/GeneralService/selectDistrictLikeName?levelType=20`,
							params: {
								pCode: '0'
							},
							labelKey: 'name',
							valueKey: 'name',
							clearable: true,
							remote: 'name',
							disabled: data.city !== '' ? false : true
						}
					}
					// 第三行
					let bankAccountNo = {
						title: '银行账号',
						value: data.bankAccountNo,
						type: 'input',
						key: 'bankAccountNo',
						required: true,
						rules: {
							required: true,
							msg: '请输入银行账号'
						}
					}
					let cusOrgName = {
						title: '所属客户',
						value: data.cusOrgName,
						type: 'bdc-select',
						key: 'cusOrgName',
						required: true,
						rules: {
							required: true,
							msg: '请选择所属客户'
						},
						props: {
							url: `${this.AjaxService.devUrl1}/GeneralService/selectOrgCusVenInfoByAuthority?type=35`,
							labelKey: 'name',
							valueKey: 'name',
							clearable: true,
							remote: 'cusOrgName'
						},
						on: {
							input: (name, selectData) => {
								if (name && name !== '') {
									this.cusOrg = {
										cusOrgId: selectData.id,
										cusOrgCode: selectData.code,
										cusOrgName: selectData.name
									}
								} else {
									this.cusOrg = {}
								}
							}
						}
					}
					// 第四行
					let addr = {
						title: '地址',
						value: data.addr,
						type: 'remark',
						key: 'addr',
						required: true,
						rules: {
							required: true,
							msg: '请输入地址'
						},
						props: {
							text: '修改地址',
							editable: true,
							maxlength: remarkMaxlength
						}
					}
					let creatorName = {
						title: '录入人',
						value: data.creatorName,
						type: 'text',
						key: 'creatorName'
					}
					let createdAt = {
						title: '录入时间',
						value: data.createdAt,
						type: 'text',
						key: 'createdAt'
					}
					// 第五行
					let isEnabled = {
						title: '状态',
						value: data.isEnabled,
						type: 'select',
						key: 'isEnabled',
						required: true,
						rules: {
							required: true,
							msg: '请选择状态'
						},
						options: publicChoice.stateOptions,
						props: {
							clearable: true
						}
					}
					let tableData
					tableData = [code, payeeName, bankName, registerBank, province, city, bankAccountNo, cusOrgName, addr, creatorName, createdAt, isEnabled]
					this.tableData = tableData
					this.$refs.editFormTable.init() // 延迟加载必须调用init方法
					this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
				}
			})
		},
		handleSave() {
			this.$refs.editFormTable.validateForm().then(() => { // 方式二： 通过Promise形式处理结果
				this.$refs.editFormTable.initResetValueData() // 记录重置默认值，this.$refs.editFormTable.reset()会重置为此刻的值
				const params = this.$refs.editFormTable.resetValueData
				// 移除干扰参数
				delete params.creatorName
				delete params.createdAt
				// 添加ID
				params.id = this.id
				// 格式化客户信息
				params.cusOrgId = this.cusOrg.cusOrgId
				params.cusOrgCode = this.cusOrg.cusOrgCode
				params.cusOrgName = this.cusOrg.cusOrgName
				params.version = this.version
				// 发送修改请求
				console.log(params)
				this.PayeeService.editPayee(params, true).then((res) => {
					if (res.resultCode === 0) {
						this.$message.success('修改成功')
						setTimeout(() => {
							this.$router.push({
								name: 'payeeDetail'
							})
						}, 2000)
					} else {
						const msg = res.errorMsg
						this.$message.error(msg ? `修改失败：${msg}` : `修改失败`)
					}
				})
			}, (error) => {
				let msgs = error.msgs.map((msg, i) => {
					return error.items[i].title + msg
				})
				this.$message.error('校验不通过，' + msgs.join('、'))
			})
		},
		handleCancel() {
			this.$router.push({
				name: 'payeeDetail'
			})
		}
	},
	computed: {
		btnVisibles() {
			return ['cancel', 'save']
		}
	}
}
</script>
