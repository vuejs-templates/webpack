<template>
  <div class="advanced-search-groups">
    <el-card v-if="isEdit">
      <div>
        分组内容：
        <el-input
          style="width: 400px;"
          class="vertical-middle"
          type="textarea"
          :rows="4"
          resize="none"
          v-model="editGroup.value">
        </el-input>
      </div>
      <div class="mt-10">
        分组名称：
        <el-input
          style="width: auto;"
          v-model="editGroup.title">
        </el-input>
        <pagoda-row-btns class="row-btns_pl mt-10" :btns="editGroupBtns" :visibles="['save']" :scope="editGroup"></pagoda-row-btns>
        <div class="fz12 text-gray">使用英文标点 ; 分割，如(11;22;33)【仅保存在浏览器缓存中，更换浏览器需重新导入或新增】</div>
      </div>
    </el-card>
    <h3 style="margin-bottom: 0;">分组快速筛选
      <div class="inline-block ml-20">
        <el-upload
          class="upload-demo inline-block"
          ref="upload"
          action="none"
          :file-list="fileList"
          :on-change="uploadChange"
          :show-file-list="false"
          :auto-upload="false">
          <el-button slot="trigger" size="small">导入</el-button>
        </el-upload>
        <pagoda-row-btns class="inline-block ml-10" :btns="importBtns" :visibles="['export']"></pagoda-row-btns>
      </div>
    </h3>
    <pagoda-table
      class="mt-10"
      :request="request"
      selection-column="single"
      @selection-change="handleSelectChange"
      ref="selectTable"
      max-height="300"
    >
      <template slot-scope="scope" slot="value">
        <el-tooltip popper-class="table-tooltip-box" :content="scope.row.value" placement="top" effect="light">
          <div class="text-overflow fz12">{{scope.row.value}}</div>
        </el-tooltip>
      </template>
      <template slot-scope="scope" slot="operate">
        <pagoda-row-btns class="text-center" :btns="groupBtns" :visibles="['edit', 'del']" :scope="scope"></pagoda-row-btns>
      </template>
    </pagoda-table>
    <pagoda-row-btns class="text-center mt-20" :btns="rowBtnsTmpl" :visibles="btnVisibles"></pagoda-row-btns>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import { formatDate } from '@/utils/utils'
export default {
  name: 'advanced-search-groups',
  data () {
    return {
      rowBtnsTmpl: {
        confirm: {
          type: 'primary',
          text: '确定',
          onClick: () => {
            this.$emit('confirm', this.cleanValue2Array(this.editGroup.value))
          }
        },
        cancel: {
          text: '取消',
          onClick: () => {
            this.$emit('cancel')
          }
        }
      },
      /* 分组筛选相关 start */
      groups: this.getGroupByStorage(),
      editGroup: {value: ''}, // 新增和编辑时需要的对象
      isEdit: true,
      selectIndex: null,
      groupBtns: {
        edit: {
          type: 'primary',
          text: '编辑',
          props: {
            size: 'mini'
          },
          onClick: this.handleEditRow
        },
        del: {
          text: '删除',
          type: 'danger',
          props: {
            size: 'mini'
          },
          confirm: '确定删除吗？',
          onClick: (btns, scope) => {
            this.$refs.selectTable.delRows([scope.row.$index])
            this.updateGroup()
            this.initSelect()
          }
        }
      },
      editGroupBtns: {
        save: {
          type: 'success',
          text: '保存',
          onClick: (btns, scope) => {
            let editGroup = this.editGroup
            // 分组名称
            if (!editGroup.title) {
              this.$message.error('请填写分组名称')
              return
            }
            if (!editGroup.value) {
              this.$message.error('请填写分组内容')
              return
            }
            let selectGroup = this.groups[editGroup.index] // 原来修改前的数据
            if (this.groups.length === 0 || editGroup.title !== selectGroup.title) {
              this.$refs.selectTable.newRows([editGroup])
              editGroup.index = this.groups.length
              this.setCurrentRow(this.groups.length)
            } else {
              selectGroup.value = this.cleanValue2Array(editGroup.value).join(';')
              selectGroup.title = editGroup.title
            }
            this.updateGroup()
          }
        },
        cancel: {
          text: '取消',
          type: 'text',
          onClick: (btns, scope) => {
          }
        }
      },
      importBtns: {
        // import: {
        //   text: '导入',
        //   tooltip: '仅支持从该处导出的文件',
        //   onClick: (btns, scope) => {
        //     console.log('导入')
        //   }
        // },
        export: {
          text: '导出',
          tooltip: '备份分组数据，用于下次导入',
          onClick: (btns, scope) => {
            console.log('导出')
            if (this.groups.length <= 0) {
              this.$message.warning('暂无数据可导出')
              return
            }
            let blob = new Blob([JSON.stringify(this.groups)], {type: 'text/plain;charset=utf-8'})
            FileSaver.saveAs(blob, `分组数据信息${formatDate()}.txt`)
          }
        }
      },
      /* 导入导出 */
      fileList: []
    }
  },
  props: {
    title: String,
    rowBtns: Object,
    btnVisibles: {
      type: Array,
      default: () => {
        return ['confirm', 'cancel']
      }
    }
  },
  created () {
    if (this.rowBtns) {
      this.rowBtnsTmpl = this.this.rowBtns
    }
  },
  mounted () {
    this.initSelect()
  },
  methods: {
    request (tableFilterData) {
      return new Promise(resolve => {
        resolve({
          head: [
            {label: '分组名称', prop: 'title'},
            {label: '分组内容', prop: 'value'},
            {label: '操作', prop: 'operate'}
          ],
          data: this.groups
        })
      })
    },
    getGroupByStorage () {
      // console.log(JSON.parse(localStorage.getItem('pagoda_group_data') || []) || [])
      return JSON.parse(localStorage.getItem('pagoda_group_data')) || []
    },
    initSelect () {
      if (this.groups.length !== 0) {
        setTimeout(() => {
          this.handleSelectChange([Object.assign(this.groups[0], {$index: 0})])
        }, 0)
      } else {
        this.selectIndex = null
        this.editGroup = {value: ''}
      }
    },
    handleSelectChange (selection) {
      this.handleEditRow({}, {row: selection[0]})
    },
    setCurrentRow (rowIndex) { // 单选时设置某行为选中状态
      this.$refs.selectTable.setCurrentRow(rowIndex)
      this.selectIndex = rowIndex
    },
    handleEditRow (btns, scope) {
      this.editGroup = {
        title: scope.row.title,
        value: scope.row.value,
        index: scope.row.$index,
        action: 'edit'
      }
      this.setCurrentRow(scope.row.$index)
    },
    updateGroup () { // 外部数组和表格数组实时同步
      this.groups = this.$refs.selectTable.getTableData()
      localStorage.setItem('pagoda_group_data', JSON.stringify(this.groups))
    },
    /* 导入导出 */
    uploadChange (file, fileList) {
      console.log(file, fileList)
      let reader = new FileReader()
      // 将文件以文本形式读入页面
      reader.readAsText(file.raw, 'gb2312')
      reader.onload = (e) => {
        let fileText = e.target.result
        let fileGroup = JSON.parse(fileText)
        this.$refs.upload.clearFiles()
        // 以分组名称title为唯一标识，只追加新的title
        let titleArr = this.groups.map(group => group.title)
        let appendArr = fileGroup.filter(group => titleArr.indexOf(group.title) === -1)
        this.$refs.selectTable.newRows(appendArr)
        this.updateGroup()
        if (appendArr.length === this.groups.length) { // 如果原来没数据直接导入就默认选中第一个
          this.initSelect()
        }
      }
    },
    /* 工具类方法 */
    cleanValue2Array (value) {
      return value.split(';').map(el => el.trim()).filter(el => !!el)
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.advanced-search-groups
  .row-btns_pl
    padding-left: 73px
</style>
