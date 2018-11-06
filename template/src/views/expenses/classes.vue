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
        v-show="action === 'add'"
        project-name="ERP2_New"
        view="payee_classes_maintenance"
        :config="$viewConfig['payee_classes_maintenance']"
        :default-data="[]"
        :default-editing="true"
        :edit-column-config="editColumnConfig"
        :edit-item-input="editItemInput"
        :head-selection="false"
        :pagination="false"
        ref="erpTableAdd"
        :column-filter="false"
        :height="scope.height"
        size="mini"
        class="base-list"
      >
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <pagoda-erp-table-v2
        v-show="action === 'edit'"
        project-name="ERP2_New"
        view="payee_classes_maintenance"
        :config="$viewConfig['payee_classes_maintenance']"
        empty
        :edit-item-input="editItemInput"
        :head-selection="false"
        :pagination="false"
        ref="erpTableEdit"
        :height="scope.height"
        size="mini"
        class="base-list"
        :column-filter="false"
      >
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="true" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <pagoda-erp-table-v2
        v-show="action === 'default'"
        project-name="ERP2_New"
        view="payee_classes_maintenance"
        :config="$viewConfig['payee_classes_maintenance']"
        :request-url="tableRequestUrl"
        :empty="query"
        :table-filter-data="filterForm"
        :edit-item-input="editItemInput"
        :head-selection="false"
        :pageSize="10"
        ref="erpTable"
        :height="scope.height"
        size="mini"
        class="base-list"
      >
        <template slot="remark" slot-scope="scope">
          <pagoda-remark-cell :maxlength="remarkMaxlength" :editable="false" v-model="scope.row['remark']"></pagoda-remark-cell>
        </template>
      </pagoda-erp-table-v2>
      <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="600px">
        <h4 v-if="dialog.note !== ''">{{dialog.note}}</h4>
        <el-table :data="dialog.data"  border>
          <el-table-column property="name" label="费用类型" width="150"></el-table-column>
          <el-table-column property="result" label="失败原因"></el-table-column>
        </el-table>
      </el-dialog>
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
  name: 'classes',
  mixins: [searchCommon],
  components: {
  },
  data () {
    return {
      tableRequestUrl: `${this.AjaxService.devUrl2}/BasCostCatService/findByPreParam`,
      formLabelWidth,
      remarkMaxlength,
      formData: {},
      formOptions: [
        {
          label: '类别代码',
          type: 'input',
          key: 'code'
        },
        {
          label: '费用类别',
          type: 'input',
          key: 'name'
        },
        {
          label: '费用类型',
          type: 'select',
          key: 'costType',
          options: publicChoice.classesTypeOptions,
          props: {
            clearable: true
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
        },
        {
          label: '录入日期',
          type: 'date-picker',
          key: 'date',
          props: {
            type: 'daterange'
          }
        }
      ],
      filterForm: {},
      editColumnConfig: {
        label: '操作',
        width: '150',
        fixed: 'right'
      },
      editItemInput: {
        costTypeName: function (value, rowData) {
          rowData.costType = publicChoice.classesTypeOptions.filter(item => item.label === value)[0].value
        }
      },
      rowBtns: {
        // 表格上方操作按钮
        add: {
          text: '新增',
          onClick: () => {
            // 切换按钮状态
            this.action = 'add'
            this.$refs.erpTableAdd.refresh()
            this.$nextTick(() => {
              this.editColumnConfig.setBtnGroup = (row) => {
                return [{
                  type: 'text',
                  text: '删除',
                  onClick: () => {
                    this.$refs.erpTableAdd.delRows(row.$index)
                  }
                }]
              }
              this.$refs.erpTableAdd.newRows([{}])
            })
          }
        },
        save: {
          text: '保存',
          onClick: () => {
            const params = []
            if (this.action === 'add') {
              const table = this.$refs.erpTableAdd
              // 校验是否为空
              if (table.validateEditingItems()) {
                // 构造请求参数
                const list = table.$refs.tableRef.tableData.data
                list.map((item) => {
                  const obj = {
                    code: item.code,
                    costType: item.costType,
                    createdAt: formatDate(new Date()),
                    isEnabled: item.isEnabled,
                    name: item.name,
                    remark: item.remark,
                    lastModifiedAt: formatDate(new Date()),
                    costTypeName: item.costTypeName
                  }
                  params.push(obj)
                })
                this.PayeeService.addClass(params, true).then((res) => {
                  console.log(res.resultCode)
                  if (res.resultCode === 0) {
                    this.$message.success('添加成功!')
                    // 重新刷新表格
                    this.handleRefresh()
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `添加失败：${msg}` : `添加失败`)
                  }
                })
              } else {
                this.$message.error('请填写完整必填信息!')
              }
            } else if (this.action === 'edit') {
              const table = this.$refs.erpTableEdit
              // 校验是否为空
              if (table.validateEditingItems()) {
                const list = table.$refs.tableRef.tableData.data
                list.forEach(item => {
                  // 排除所有引用项目
                  if (item.isEnabled !== 1) {
                    // 构造请求参数
                    const obj = {
                      id: item.id,
                      code: item.code,
                      costType: item.costType,
                      createdAt: item.createdAt,
                      isEnabled: item.isEnabled,
                      name: item.name,
                      version: item.version,
                      remark: item.remark,
                      lastModifiedAt: formatDate(new Date()),
                      costTypeName: item.costTypeName
                    }
                    params.push(obj)
                  }
                })
                this.PayeeService.editClass(params, true).then((res) => {
                  console.log(res.resultCode)
                  if (res.resultCode === 0) {
                    this.$message.success('修改成功!')
                    // 重新刷新表格
                    this.handleRefresh()
                  } else {
                    const msg = res.errorMsg
                    this.$message.error(msg ? `修改失败：${msg}` : `修改失败`)
                  }
                })
              } else {
                this.$message.error('请填写完整必填信息!')
              }
            }
          }
        },
        cancel: {
          text: '取消',
          confirm: '当前界面操作数据不保留，是否取消，确认后返回列表！',
          onClick: () => {
            this.handleRefresh()
          }
        },
        addCol: {
          text: '新增行',
          onClick: () => {
            // 添加一行可编辑行
            const table = this.$refs.erpTableAdd.$refs.tableRef
            this.$nextTick(() => {
              table.newRows([{code: '', name: '', costTypeName: '', isEnabled: '', remark: ''}])
            })
          }
        },
        delCol: {
          text: '删除行',
          onClick: () => {
            const table = this.$refs.erpTableAdd.$refs.tableRef
            const selection = table.selection
            if (!selection || selection.length === 0) {
              this.$message.error('请选择项目')
            } else {
              const indexs = []
              for (let i = 0; i < selection.length; i++) {
                indexs.push(selection[i].$index)
              }
              table.delRows(indexs)
            }
          }
        },
        edit: {
          text: '修改',
          onClick: () => {
            const table = this.$refs.erpTable.$refs.tableRef
            const selection = table.selection
            if (selection.length > 0) {
              // 判断是否存在启用
              let data = []
              selection.forEach((item) => {
                if (item.isEnabled === 1) {
                  data.push({
                    name: item.name,
                    result: '该项目在其他环境已被启用，无法进行操作！'
                  })
                }
              })
              if (data.length !== 0) {
                this.dialog = {
                  title: '失败结果',
                  show: true,
                  note: '以下项目操作失败：',
                  data: data
                }
              } else {
                // 切换按钮状态
                this.action = 'edit'
                // 打开选中行可编辑行
                this.$refs.erpTableEdit.refresh()
                this.$nextTick(() => {
                  this.$refs.erpTableEdit.newRows(selection)
                })
              }
            } else {
              this.$message.error('请选择项目')
            }
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
                  version: selection[i].version,
                  isEnabled: 1
                })
              }
              this.PayeeService.classesServiceStart(params, true).then((res) => {
                console.log(res.resultCode)
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
                  version: selection[i].version,
                  isEnabled: 0
                })
              }
              this.PayeeService.classesServiceStop(params, true).then((res) => {
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
      action: 'default',
      query: true,
      tableData: {},
      // 失败提示弹窗
      dialog: {
        title: '',
        show: false,
        note: '',
        data: []
      }
    }
  },
  created () {
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
        code: this.formData.code,
        name: this.formData.name,
        costType: this.formData.costType,
        isEnabled: this.formData.isEnabled,
        reqDate1: this.formData.date ? formatDate(this.formData.date[0], 'startTime') : '',
        reqDate2: this.formData.date ? formatDate(this.formData.date[1], 'endTime') : ''
      }
      this.filterForm = Object.assign({}, reqData)
      console.log(this.formData)
    },
    handleRefresh () {
      // 切换按钮状态
      this.action = 'default'
      // 重新刷新表格
      this.editColumnConfig.setBtnGroup = (row) => {
        return []
      }
      this.$nextTick(() => {
        this.$refs.erpTable.refreshCurrentPage()
      })
    }
  },
  computed: {
    ...mapState(['role']),
    btnVisibles () {
      let btnsObj = {
        'add': ['cancel', 'save', 'addCol', 'delCol'],
        'edit': ['cancel', 'save'],
        'default': ['add', 'edit', 'enable', 'disable']
      }
      return btnsObj[this.action]
    }
  }
}
</script>
<style lang="stylus">
</style>
