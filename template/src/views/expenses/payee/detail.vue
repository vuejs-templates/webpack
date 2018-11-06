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
        isEnabled: true,
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
        this.PayeeService.checkPayeeById({id: id}, true).then((res) => {
          this.loading = false
          if (res.resultCode === 0) {
            const data = res.data
            // 第一行
            let code = {
              title: '收款人代码',
              value: data.code,
              type: 'text',
              key: '收款人代码'
            }
            let payeeName = {
              title: '收款人',
              value: data.payeeName,
              type: 'text',
              key: '收款人'
            }
            let bankName = {
              title: '开户银行',
              value: data.bankName,
              type: 'text',
              key: '开户银行'
            }
            // 第二行
            let registerBank = {
              title: '银行支行',
              value: data.registerBank,
              type: 'remark',
              key: '银行支行'
            }
            let province = {
              title: '所在省份',
              value: data.province,
              type: 'text',
              key: '所在省份'
            }
            let city = {
              title: '城市',
              value: data.city,
              type: 'text',
              key: '城市'
            }
            // 第三行
            let bankAccountNo = {
              title: '银行账号',
              value: data.bankAccountNo,
              type: 'text',
              key: '银行账号'
            }
            let cusOrgName = {
              title: '所属客户',
              value: data.cusOrgName,
              type: 'text',
              key: '所属客户'
            }
            let cusOrgCode = {
              title: '客户代码',
              value: data.cusOrgCode,
              type: 'text',
              key: '客户代码'
            }
            // 第四行
            let addr = {
              title: '地址',
              value: data.addr,
              type: 'remark',
              key: '地址'
            }
            let creatorName = {
              title: '录入人',
              value: data.creatorName,
              type: 'text',
              key: '录入人'
            }
            let createdAt = {
              title: '录入时间',
              value: data.createdAt,
              type: 'text',
              key: '录入时间'
            }
            // 第五行
            this.isEnabled = data.isEnabled === 1 ? true : false
            let isEnabled = {
              title: '状态',
              value: data.isEnabled === 1 ? '启用' : '关闭',
              type: 'text',
              key: '状态'
            }

            let tableData
            tableData = [code, payeeName, bankName, registerBank, province, city, bankAccountNo, cusOrgName, cusOrgCode, addr, creatorName, createdAt, isEnabled]
            this.tableData = tableData
            this.$refs.editFormTable.init() // 延迟加载必须调用init方法
            this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
          }
        })
      },
      handleCancel() {
        this.$router.push({
          name: 'expensesPayee'
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
            name: 'payeeUpdate',
            params: {
              id: this.$route.params.id
            }
          })
        }
      }
    },
    computed: {
      btnVisibles() {
        return this.isEnabled ? ['cancel'] : ['cancel', 'update']
      }
    }
  }
</script>
