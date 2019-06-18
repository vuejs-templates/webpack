<template>
  <pagoda-form-table-layout>
    <!-- 表单 -->
    <template slot="form" slot-scope="scope">
      <el-form class="el-form-reset" inline>
        <el-form-item label="表单label">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="表单label">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="表单label">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="表单label">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="表单label">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="表单label">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="表单label" class="pagoda-form-table-layout__span2">
          <el-input></el-input>
        </el-form-item>
        <!-- 表单操作按钮 -->
        <div class="pagoda-button-group" v-bind="scope.btnPosition">
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </div>
      </el-form>
    </template>
    <!-- 表格上方操作按钮 -->
    <template slot="table-btns">
      <div class="pagoda-button-group">
        <el-button>操作按钮</el-button>
        <el-button>操作按钮</el-button>
      </div>
    </template>
    <!-- 实现一屏展示时 一定要配置表格高度 -->
    <template slot="table" slot-scope="scope">
      <el-table
        :data="tableData"
        :height="scope.height"
      >
        <el-table-column
          prop="date"
          label="日期"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="日期"
        ></el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template slot="pagination">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        background
      >
      </el-pagination>
    </template>
  </pagoda-form-table-layout>
</template>

<script>
  export default {
    data () {
      return {
        tableData: Array.from({length: 30}, () => ({
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }))
      }
    }
  }
</script>