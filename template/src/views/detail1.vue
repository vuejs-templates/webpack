<template>
  <pagoda-detail-layout-v1 class="requisition_detail" content-title="这里是页面标题" @back="handleBack">
    <div slot="content-btn">
      <pagoda-row-btns :btns="editBtns" :visibles="editBtnVisibles"></pagoda-row-btns>
    </div>
    <div class="clearfix" slot="content-form">
      <el-form inline class="el-form-reset">
        <el-form-item label="标签文本1">
          <el-input v-model="form.value1" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value1}}</p>
        </el-form-item>
        <el-form-item label="标签文本2">
          <el-input v-model="form.value2" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value2}}</p>
        </el-form-item>
        <el-form-item label="标签文本3">
          <el-input v-model="form.value3" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value3}}</p>
        </el-form-item>
        <el-form-item label="标签文本4">
          <el-input v-model="form.value4" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value4}}</p>
        </el-form-item>
        <el-form-item label="标签文本5">
          <el-input v-model="form.value5" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value5}}</p>
        </el-form-item>
        <el-form-item label="标签文本6">
          <el-input v-model="form.value6" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value6}}</p>
        </el-form-item>
        <el-form-item label="标签文本7">
          <el-input v-model="form.value7" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value7}}</p>
        </el-form-item>
        <el-form-item label="标签文本8">
          <el-input v-model="form.value8" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value8}}</p>
        </el-form-item>
        <el-form-item label="标签文本9">
          <el-input v-model="form.value9" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value9}}</p>
        </el-form-item>
        <el-form-item label="标签文本0">
          <el-input v-model="form.value0" v-show="editable"></el-input>
          <p v-show="!editable">\{{form.value0}}</p>
        </el-form-item>
      </el-form>
    </div>
    <template slot="content">
      <pagoda-sub-title>这里是栏目标题</pagoda-sub-title>
      <pagoda-table
        :head="head"
        :request="paginationRequest"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[15, 30]"
        :page-size="15"
      ></pagoda-table>
    </template>
  </pagoda-detail-layout-v1>
</template>

<script>
export default {
  data () {
    return {
      head: [{
        label: 'id',
        prop: 'id'
      }, {
        label: '姓名',
        prop: 'name'
      }, {
        label: 'rr',
        prop: 'tt'
      }, {
        label: '性别',
        prop: 'sex'
      }, {
        label: '婚否',
        prop: 'married',
        fixed: true
      }, {
        label: '年龄',
        prop: 'age'
      }],
      editBtns: {
        edit: {
          text: '编辑',
          onClick: () => {
            this.editable = !this.editable
            this.editBtnVisibles = ['cancel', 'save']
          }
        },
        cancel: {
          text: '取消',
          onClick: () => {
            this.editBtnVisibles = ['edit']
            this.editable = !this.editable
          }
        },
        save: {
          type: 'primary',
          text: '保存',
          onClick: () => {},
          props: {
            plain: false
          }
        }
      },
      editBtnVisibles: ['edit'],
      editable: false,
      form: {
        value1: 'XXXXXXXXXX',
        value2: 'XXXXXXXXXX',
        value3: 'XXXXXXXXXX',
        value4: 'XXXXXXXXXX',
        value5: 'XXXXXXXXXX',
        value6: 'XXXXXXXXXX',
        value7: 'XXXXXXXXXX',
        value8: 'XXXXXXXXXX',
        value9: 'XXXXXXXXXX',
        value0: 'XXXXXXXXXX'
      }
    }
  },
  methods: {
    paginationRequest (_, currentPage, pageSize, sortable) {
      const mokeData = Array.from({
        length: pageSize
      }, item => (item = {
        id: 1232,
        name: 'adads',
        tt: 'nbpszx',
        sex: 'asdasd',
        married: '是',
        age: 23
      }))

      return new Promise(resolve => {
        // 模拟请求接口
        setTimeout(() => {
          resolve({
            data: mokeData,
            totalDataNum: 30
          })
        }, 30)
      })
    },
    handleBack () {
      this.$router.replace('/main')
    }
  }
}
</script>
