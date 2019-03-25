<template>
  <pagoda-left-right-layout title="左右详情页布局" subTitle="基本信息" style="height: 100%">
    <template slot="operation">
      <!-- 操作按钮栏插槽 -->
      <pagoda-row-btns
        :btns="rowBtns"
        :visibles="btnVisibles"
        multi-switch
      >
      </pagoda-row-btns>
    </template>
    <template slot="tabs">
      <!-- 顶部tab栏插槽 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="tab标签一" name="first"></el-tab-pane>
        <el-tab-pane label="tab标签二" name="second"></el-tab-pane>
        <el-tab-pane label="tab标签三" name="third"></el-tab-pane>
        <el-tab-pane label="tab标签四" name="fourth"></el-tab-pane>
        <el-tab-pane label="tab标签五" name="five"></el-tab-pane>
      </el-tabs>
    </template>
    <template slot="content">
      <!-- 主内容区插槽 -->
      <div>
        主要内容区
      </div>
    </template>
    <template>
      <template slot="edit">
        <!-- 编辑按钮插槽 -->
        <div @click="handleEdit" v-if="!showBtns">
          <i class="iconfont icon-edit"></i>
        </div>
        <pagoda-row-btns v-if="showBtns" :btns="editBtns" :visibles="editBtnVisibles" :scope="{index: 0}"></pagoda-row-btns>
      </template>
      <div slot="content-form">
        <!-- 表单插槽 -->
        <pagoda-edit-form ref="editFormTable" :form-options="tableData" :editable="editable" :config="config" :form-props="{labelPosition:'left',labelWidth: '114px'}"></pagoda-edit-form>
      </div>
    </template>
  </pagoda-left-right-layout>
</template>

<script>
export default {
  name: 'detail2',
  data () {
    return {
      // layoutV2导航的数据格式
      topMenu: [{
        icon: 'iconfont icon-erp-jichudingyi',
        label: 'demo1',
        subMenu: {
          data: [{
            icon: 'iconfont icon-erp-xiaoshoumubiao',
            label: 'layout1',
            url: '/demo1/layout1'
          }, {
            icon: 'iconfont icon-erp-peisongfeiyongguanli',
            label: 'layout2',
            url: '/demo2'
          }]
        }
      }, {
        icon: 'iconfont icon-erp-yingyejilu',
        label: 'demo2',
        subMenu: {
          data: [{
            label: 'layout3'
          }, {
            label: 'layout4'
          }]
        }
      }, {
        icon: 'iconfont icon-erp-yunyingxianjia',
        label: 'demo3'
      }],
      bottomMenu: [{
        icon: 'iconfont icon-erp-kufangguanli',
        label: 'layout5'
      }, {
        icon: 'iconfont icon-erp-kuneiguanli',
        label: 'layout6'
      }],
      activeName: 'first',
      btnVisibles: ['save', 'cancel', 'submit', 'import', 'calculate', 'add'],
      rowBtns: {
        save: {
          type: 'primary',
          text: '保存按钮',
          onClick: this.handleSave,
          props: {
            size: 'small',
            plain: false
          }
        },
        cancel: {
          text: '取消',
          onClick: this.handleCancel,
          confirm: '确认取消吗'
        },
        import: {
          slot: 'import'
        },
        submit: {
          type: 'primary',
          text: '提交按钮',
          onClick: this.handleSubmit,
          props: {
            size: 'small',
            plain: false
          }
        },
        calculate: {
          type: 'primary',
          text: '计算',
          onClick: this.handleCalculate,
          tooltip: '结合计算方式和采购系数自动计算请购数量'
        },
        add: {
          type: 'primary',
          text: '确认',
          onClick: this.handleSubmit
        }
      },
      fileList: [],
      tableData: [], // createTable详情单table专用
      editable: false,
      config: {
        column: 1 // 一行放1列（label+value）
      },
      editBtns: {
        cancel: {
          text: '取消',
          onClick: () => {
            this.showBtns = false
            this.editable = !this.editable
          }
        },
        save: {
          type: 'primary',
          text: '保存',
          onClick: () => {},
          props: {
            size: 'small',
            plain: false
          }
        }
      },
      editBtnVisibles: ['cancel', 'save'],
      showBtns: false
    }
  },
  mounted () {
    // 初始化数据
    this.setTableData()
  },
  methods: {
    // 切换tab栏触发事件
    handleClick (tab, event) {
      console.log(tab, event)
    },
    setTableData (id) {
      const data = {
        addr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
        bankAccountNo: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
        bankName: 'XXXXXXXXXX',
        city: 'XXXXXXXXXX',
        costApplyNo: 'XXXXXXXXXX',
        costType: 1,
        costTypeName: 'XXXXXXXXXX',
        createdAt: '2018-11-05',
        creatorName: 'XXXXXXXXXX',
        cusOrgCode: 'testCode2',
        cusOrgId: 46,
        cusOrgName: 'XXXXXXXXXX',
        detailList: Array.from({length: 20}, () => ({
          amount: 1,
          costCatId: 518,
          costCatName: '其他费用',
          id: 307,
          periorBegin: '2018-11-05',
          periorEnd: '2018-11-05',
          remark: ''
        })),
        id: 104,
        imageUrl: '',
        payeeId: 2,
        payeeName: 'XXXX',
        province: 'XXXX',
        registerBank: 'XXXXXXXXXX',
        remark: '',
        status: 10,
        sum: 1
      }
      let dataInit = [
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.costApplyNo,
          label: '名称字段1',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.costApplyNo,
          label: '名称字段2',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.cusOrgName,
          label: '名称字段3',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.costTypeName,
          label: '名称字段4',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.payeeName,
          label: '名称字段5',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.bankName,
          label: '名称字段6',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.registerBank,
          label: '名称字段7',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.bankAccountNo,
          label: '名称字段8',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.province,
          label: '名称字段9',
          type: 'input',
          key: 'input'
        }, // 第四行
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.city,
          label: '名称字段10',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          // required: true,
          value: data.city,
          label: '名称字段11',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: 'XXXXXXXXXX',
          label: '名称字段12',
          type: 'input',
          key: 'input'
        }, // 第五行
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.image,
          label: '名称字段13',
          type: 'input',
          key: 'input'
        },
        {
          props: {
            disabled: false,
            clearable: true
          },
          value: data.remark,
          label: '名称字段14',
          type: 'input',
          key: 'input'
        }
      ]
      // // 第一行
      this.costApplyNo = data.costApplyNo
      this.status = data.status
      // // 第五行
      // 记录version
      this.version = data.version

      let tableData
      tableData = dataInit
      this.tableData = tableData
      this.$refs.editFormTable.init() // 延迟加载必须调用init方法
      this.tableObjData = this.$refs.editFormTable.getObjData(tableData) // 因为直接获取有延迟，所以传入数组能实时拿到最新数组
    },
    // 取消按钮触发事件
    handleCancel (btn, scope, $event) { // 确认后才会触发
      // btn 是 { text: '取消', onClick: this.handleCancel, confirm: '确认取消吗' }
      // scope 是 {index: 0}
      // $event 是 事件对象
    },
    // 保存按钮触发事件
    handleSave () {
      this.$message.success('保存成功')
    },
    // 计算按钮触发事件
    handleCalculate () {
      this.$message.success('1+1=2')
    },
    // 提交按钮触发事件
    handleSubmit () {
      this.$message.success('提交成功')
    },
    /* 导入导出 */
    uploadChange (file, fileList) {
    },
    // 编辑icon触发事件
    handleEdit () {
      this.editable = !this.editable
      this.showBtns = true
    }
  }
}
</script>
