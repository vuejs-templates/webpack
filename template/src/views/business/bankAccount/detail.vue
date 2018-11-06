<template>
<div class="payee_detail">
	<pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles">
	</pagoda-row-btns>
	<pagoda-edit-form-table ref="editFormTable" :form-options="tableData" :editable="editable" :config="config">
	</pagoda-edit-form-table>
</div>
</template>

<script>
export default {
	name: 'payee_detail',
	data() {
		return {
			loading: true,
			rowBtns: {
				update: {
					text: '修改',
					onClick: this.handleEdit
				},
				cancel: {
					text: '取消',
					onClick: this.handleCancel
				}
			},
			tableData: [], // createTable详情单table专用
			config: {
				column: 3 // 一行放3列（label+value）
			},
			editable: true,
			tableObjData: null
		}
	},
	mounted() {
		if (this.$route.params.id) {
			this.setTableData(this.$route.params.id)
		}
	},
	methods: {
		setTableData(id) {
			this.BusinessService.checkAccountById({
				id: id
			}, true).then((res) => {
				this.loading = false
				if (res.resultCode === 0) {
					const data = res.data
					// 第一行
					let cusOrgCode = {
						title: '客户代码',
						value: data.cusOrgCode,
						type: 'text',
						key: '客户代码'
					}
					let cusOrgName = {
						title: '客户名称',
						value: data.cusOrgName,
						type: 'text',
						key: '客户名称'
					}
					let bankName = {
						title: '存款银行',
						value: data.bankName,
						type: 'text',
						key: '存款银行'
					}
					// 第二行
					let registerBank = {
						title: '存款银行支行',
						value: data.registerBank,
						type: 'remark',
						key: '存款银行支行'
					}
					let bankAccName = {
						title: '存款银行账户名称',
						value: data.bankAccName,
						type: 'text',
						key: '存款银行账户名称'
					}
					let bankAccNo = {
						title: '存款银行帐号',
						value: data.bankAccNo,
						type: 'text',
						key: '存款银行帐号'
					}
					// 第三行
					this.isEnabled = data.isEnabled === 1 ? true : false
					let isEnabled = {
						title: '状态',
						value: data.isEnabled === 1 ? '启用' : '关闭',
						type: 'text',
						key: '状态'
					}
					let remark = {
						title: '摘要',
						value: data.remark,
						type: 'remark',
						key: '摘要'
					}
					let creatorName = {
						title: '录入人',
						value: data.creatorName,
						type: 'text',
						key: '录入人'
					}
					// 第四行
					let createdAt = {
						title: '录入日期',
						value: data.createdAt,
						type: 'remark',
						key: '录入日期'
					}
					let tableData
					tableData = [cusOrgCode, cusOrgName, bankName, registerBank, bankAccName, bankAccNo, isEnabled, remark, creatorName, createdAt]
					this.tableData = tableData
					this.$refs.editFormTable.init() // 延迟加载必须调用init方法
					this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
				}
			})
		},
		handleCancel() {
			this.$router.push({
				name: 'businessBankAccount'
			})
		},
		handleEdit() {
			// 判断该项目是否被引用
			if (this.isEnabled) {
				this.$message({
					message: `该项目已启用,无法修改!`,
					type: 'warning'
				})
			} else {
				this.$router.push({
					name: 'bankAccountUpdate',
					params: {
						id: this.$route.params.id
					}
				})
			}
		}
	},
	computed: {
		btnVisibles() {
			return ['cancel', 'update']
		}
	}
}
</script>
