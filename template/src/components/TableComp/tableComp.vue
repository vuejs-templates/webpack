<template>
<div class="tabArea">
  <el-table border :data="newtabData" :header-cell-style="newTableConfig.headerCellStyle ? newTableConfig.headerCellStyle : {}" :stripe="Boolean(newTableConfig.stripe)" @selection-change="tabSelectionChange()">
    <el-table-column type="selection" v-if="newTableConfig.isSelection" :selectable="checkInit"></el-table-column>
    <template v-for="(item, index) in newTableConfig.columnObj">
      <el-table-column :label="item.label" :prop="item.props" :key="index" :fixed='item.fixed ? item.fixed : false' :width="item.width ? item.width : 'inherit'" v-if="!item.slot" />
      <el-table-column :label="item.label" :prop="item.props" :key="index" :fixed='item.fixed ? item.fixed : false' :width="item.width ? item.width : 'inherit'" v-else>
        <template slot-scope="scope">
          <slot :rowData = 'scope.row' :name='item.slot'/>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <div class="pagin" v-if="page && page.totalRecords > 0">
    <div class="leftShowInfo" v-if="page.showPageInfo">
      共 {{page.totalRecords}} 条记录 第 {{page.pageNum}} / {{page.totalPages}} 页
    </div>
    <div class="rightPaging">
    <el-pagination
      background
      layout="prev, pager, next, sizes, jumper" :current-page.sync="page.pageNum"
      :total="page.totalRecords"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      :page-sizes="[8,10,12,15]"
      @size-change="handleSizeChange">
    </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'tableComponents',
  props: {
    tabDataList: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableConfig: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    newtabData () {
      return [].concat(this.tabDataList)
    },
    newTableConfig () {
      return Object.assign({}, this.tableConfig)
    },
    page () {
      return this.tableConfig.page ? Object.assign({}, this.tableConfig.page) : false
    }
  },
  methods: {
    handleClick (index, row, id) {
    },
    handleSizeChange (val) {
      this.$emit('tableChange', {
        fnType: 'handleSizeChange',
        data: val
      })
    },
    handleCurrentChange (val) {
      this.$emit('tableChange', {
        fnType: 'handleCurrentChange',
        data: val
      })
    },
    tabSelectionChange (selection) {
      this.$emit('tableChange', {
        fnType: 'selectionChange',
        data: selection
      })
    },
    // 初始化复选框
    checkInit (row) {
      // var status = ''
      // let disableProps = this.newTableConfig.selectionDisableProps || ''
      // if (!disableProps) return true
      //
      // status = this.newTableConfig.selectionDisableInit.filter(item => item === row[disableProps])
      //
      // if (status.length > 0) {
      //   return 1
      // } else {
      //   return 0
      // }
    }
  }

}
</script>

<style lang="scss" scoped>
.tabArea {
  .pagin {
    padding: 20px 0;
    overflow:hidden;
    .leftShowInfo {
      float: left;
      font-size:14px;
      color: #666;
    }
    .rightPaging {
      float: right;
    }
  }
}
</style>
