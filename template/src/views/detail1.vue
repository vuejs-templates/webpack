<template>
  <pagoda-detail-layout-v1 content-title="这里是页面标题" @back="handleBack">
    <template slot="content-btn">
      <el-button v-show="!editable" @click="handleEdit">编辑</el-button>
      <div class="pagoda-button-group" v-show="editable">
        <el-button @click="handleCancel">取消</el-button>
        <el-button @click="handleSave">保存</el-button>
      </div>
    </template>
    <template slot="content-form">
      <el-form inline class="el-form-reset">
        <el-form-item label="输入框">
          <el-input v-model="form.value1" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value1}}</div>
        </el-form-item>
        <el-form-item label="整数">
          <el-input v-model="form.value2" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value2}}</div>
        </el-form-item>
        <el-form-item label="数字">
          <el-input v-model="form.value3" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value3}}</div>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.value4" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value4}}</div>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.value5" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value5}}</div>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.value6" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value6}}</div>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="form.value7" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value7}}</div>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.value8" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value8}}</div>
        </el-form-item>
        <el-form-item label="评分">
          <el-input v-model="form.value9" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value9}}</div>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form.value0" v-show="editable"></el-input>
          <div v-show="!editable">\{{form.value0}}</div>
        </el-form-item>
      </el-form>
    </template>
    <template slot="content">
      <div class="detail-v1-detail__flex">
        <pagoda-sub-title>这里是栏目标题</pagoda-sub-title>
        <pagoda-form-table-layout class="detail-layout-v1-content__form-table-layout" ref="formTableLayout">
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
              :page-sizes="[10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="40"
              background
            >
            </el-pagination>
          </template>
        </pagoda-form-table-layout>
      </div>
    </template>
  </pagoda-detail-layout-v1>
</template>

<script>
export default {
  data () {
    return {
      editable: false,
      form: {
        value1: '输入框输入的文字输入框输入的文字输入框输入的文字输入框输入的文字输入框输入的文字',
        value2: '1234567890',
        value3: '0987654321',
        value4: 'pagoda@pagoda.com',
        value5: '123456789011',
        value6: '4001811212',
        value7: 'www.pagoda.com.cn',
        value8: '百果园',
        value9: '5',
        value0: '100元'
      },
      editForm: {},
      tableData: Array.from({length: 10}, () => ({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }))
    }
  },
  methods: {
    handleEdit () {
      this.editable = true
      this.editForm = Object.assign({}, this.form)
      this.$refs.formTableLayout.doLayout()
    },
    handleCancel () {
      this.form = Object.assign({}, this.editForm)
      this.editable = false
    },
    handleSave () {
      this.editable = false
      this.$refs.formTableLayout.doLayout()
    },
    handleBack () {
      this.$router.push('/main')
    }
  }
}
</script>
