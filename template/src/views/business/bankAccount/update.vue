<template>
  <div class="payee_update">
    <pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles">
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
        this.BusinessService.checkAccountById({
          id: id
        }, true).then((res) => {
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
                editable: true,
                clearable: true
              }
            }
            //2
            let registerBank = {
              title: '存款银行支行',
              value: data.registerBank,
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
              value: data.bankAccName,
              type: 'input',
              key: 'bankAccName',
              required: true,
              rules: {
                required: true,
                msg: '请选择存款银行账户名称'
              },
              props: {
                clearable: true
              }
            }
            let bankAccNo = {
              title: '存款银行帐号',
              value: data.bankAccNo,
              type: 'input',
              key: 'bankAccNo',
              required: true,
              rules: {
                required: true,
                msg: '请输入存款银行帐号'
              },
              props: {
                clearable: true
              }
            }
            //3
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
            let remark = {
              title: '摘要',
              value: data.remark,
              type: 'remark',
              key: '摘要',
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
          params.cusOrgId = this.cusOrg.cusOrgId //客户id
          params.version = this.version //版本
          params.cusOrgCode = this.cusOrg.cusOrgCode //客户代码
          // 发送修改请求
          this.BusinessService.editAccount(params, true).then((res) => {
            if (res.resultCode === 0) {
              this.$message.success('修改成功')
              setTimeout(() => {
                this.$router.push({
                  name: 'businessBankAccount'
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
          name: 'businessBankAccount'
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
