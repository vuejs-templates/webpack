<template>
<div class="payee_add">
	<pagoda-row-btns class="mb-10" :btns="rowBtns" :visibles="btnVisibles">
	</pagoda-row-btns>
	<pagoda-edit-form-table ref="editFormTable" :form-options="tableData" :editable="editable" :config="config">
    <template slot="cusOrgCode" slot-scope="scope">
      <span style="float: left; font-size: 13px; margin-right: 15px;">{{ scope.code }}</span>
      <span style="float: right; color: #8492a6;">{{ scope.name }}</span>
    </template>
	</pagoda-edit-form-table>
</div>
</template>

<script>
import publicChoice from '@/views/expenses/publicChoice'
import {
  remarkMaxlength,
} from '@/utils/default-setting'

export default {
	name: 'payee_add',
	data() {
		return {
      remarkMaxlength,
			loading: true,
			rowBtns: {
				cancel: {
					text: '取消',
					onClick: this.handleCancel,
					confirm: '当前界面操作数据不保留，是否取消，确认后返回列表！'
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
			cusOrg: {} // 存储选中的客户信息
		}
	},
	mounted() {
		// 初始化
		this.setTableData()
	},
	methods: {
		setTableData() {
			this.loading = false
			// 第一行
			let cusOrgCode = {
				title: '客户代码',
				value: '',
				type: 'bdc-select',
				key: 'cusOrgCode',
				required: true,
				rules: {
					required: true,
					msg: '请输入客户代码'
				},
				props: {
					url: `${this.AjaxService.devUrl2}/BasStoreAccountService/selectCusOrg`,
					labelKey: 'code',
					valueKey: 'code',
					clearable: true,
					remote: 'cusOrgCode'
				},
				on: {
					input: (name, selectData) => {
						if (name && name !== '') {
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
			let cusOrgName = {
				title: '客户名称',
				value: '选择客户代码自动带出',
				type: 'text',
				key: 'cusOrgName'
			}
			let bankName = {
				title: '存款银行',
				value: '',
				type: 'bdc-select',
				key: 'bankName',
				required: true,
				rules: {
					required: true,
					msg: '请选择存款银行'
				},
				props: {
					url: `${this.AjaxService.devUrl2}/BasStoreAccountService/findBankName`,
					labelKey: 'name',
					valueKey: 'name',
					clearable: true
				}
			}
			// 第二行
			let registerBank = {
				title: '存款银行支行',
				value: '',
				type: 'remark',
				key: 'registerBank',
				required: true,
				rules: {
					required: true,
					msg: '请输入款银行支行'
				},
        props: {
          text: '修改银行支行',
          editable: true,
          maxlength: remarkMaxlength
        }
			}
			let bankAccName = {
				title: '存款银行账户名称',
				value: '',
				type: 'input',
				key: 'bankAccName',
				required: true,
				rules: {
					required: true,
					msg: '请选择存款银行账户名称'
				}
			}
			let bankAccNo = {
				title: '存款银行帐号',
				value: '',
				type: 'input',
				key: 'bankAccNo',
				required: true,
				rules: {
					required: true,
					msg: '请输入存款银行帐号'
				}
			}
			// 第三行
			let isEnabled = {
				title: '状态',
				value: '',
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
			// 第四行
			let remark = {
				title: '摘要',
				value: '',
				type: 'remark',
				key: 'remark',
        props: {
          text: '修改摘要',
          editable: true,
          maxlength: remarkMaxlength
        }
			}

			let tableData
			tableData = [cusOrgCode, cusOrgName, bankName, registerBank, bankAccName, bankAccNo, isEnabled, remark]
			this.tableData = tableData
			this.$refs.editFormTable.init() // 延迟加载必须调用init方法
			this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
		},
		handleCancel() {
			this.$router.push({
				name: 'businessBankAccount'
			})
		},
		handleSave() {
			this.$refs.editFormTable.validateForm().then(() => { // 方式二： 通过Promise形式处理结果
				this.$refs.editFormTable.initResetValueData() // 记录重置默认值，this.$refs.editFormTable.reset()会重置为此刻的值
				const params = this.$refs.editFormTable.resetValueData
				// code自动生成,可以移出
				delete params.code
				params.cusOrgCode = this.cusOrg.cusOrgCode //客户代码
				params.cusOrgName = this.cusOrg.cusOrgName //客户名称
				params.cusOrgId = this.cusOrg.cusOrgId //客户ID
				// 发送新增请求
				this.BusinessService.addAccount(params, true).then((res) => {
					if (res.resultCode === 0) {
						this.$message.success('新增成功')
						setTimeout(() => {
							this.$router.push({
								name: 'businessBankAccount'
							})
						}, 2000)
					} else {
						const msg = res.errorMsg
						this.$message.error(msg ? `新增失败：${msg}` : `新增失败`)
					}
				})
			}, (error) => {
				let msgs = error.msgs.map((msg, i) => {
					return error.items[i].title + msg
				})
				this.$message.error('校验不通过，' + msgs.join('、'))
			})
		}
	},
	created() {},
	computed: {
		btnVisibles() {
			return ['cancel', 'save']
		}
	}
}
</script>
